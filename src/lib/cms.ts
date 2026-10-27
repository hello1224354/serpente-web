import type { Branch, Offer, SalonContent, Service, InstagramTrendItem, CustomerReview } from "@/lib/api";
import { branches as defaultBranches, offers as defaultOffers, salonContents as defaultContent, services as defaultServices } from "@/data/catalog";

type Item = Record<string, unknown>;
export type CmsCatalog = { branches: Branch[]; services: Service[]; offers: Offer[]; salonContents: Record<number, SalonContent>; serviceCategoryOrder: string[] };

const QUERY = `{
  "settings": *[_type == "salonSettings" && _id == "salonSettings"][0],
  "services": *[_type == "salonService" && !(_id in path("drafts.**"))],
  "offers": *[_type == "salonOffer" && !(_id in path("drafts.**"))] | order(sortOrder asc, _id asc){..., "imageUrl": image.asset->url},
  "trends": *[_type == "salonTrend" && !(_id in path("drafts.**"))] | order(sortOrder asc, _id asc){..., "imageUrl": image.asset->url},
  "reviews": *[_type == "salonReview" && !(_id in path("drafts.**"))] | order(sortOrder asc, _id asc)
}`;

const stringValue = (v: unknown, fallback = "") => typeof v === "string" ? v : fallback;
const nullableString = (v: unknown, fallback: string | null) => v === null ? null : typeof v === "string" ? v : fallback;
const numberValue = (v: unknown, fallback: number) => typeof v === "number" && Number.isSafeInteger(v) ? v : fallback;
const boolValue = (v: unknown, fallback: boolean) => typeof v === "boolean" ? v : fallback;
const isItem = (v: unknown): v is Item => v !== null && typeof v === "object" && !Array.isArray(v);
const imageUrl = (v: unknown, fallback: string) => {
    if (typeof v !== "string") return fallback;
    if (v.startsWith("/content/")) return v;
    try {
        const url = new URL(v);
        return url.protocol === "https:" && url.hostname === "cdn.sanity.io" && url.pathname.startsWith("/images/") ? url.toString() : fallback;
    } catch {
        return fallback;
    }
};

const fallback: CmsCatalog = { branches: defaultBranches, services: defaultServices, offers: defaultOffers, salonContents: defaultContent, serviceCategoryOrder: [] };

export async function getCatalog(): Promise<CmsCatalog> {
    const projectId = process.env.SANITY_PROJECT_ID?.trim() ?? "";
    const dataset = process.env.SANITY_DATASET?.trim() || "production";
    if (!/^[a-z0-9-]{3,32}$/.test(projectId) || !/^[a-zA-Z0-9_-]{1,64}$/.test(dataset)) return fallback;
    try {
        const url = `https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}?query=${encodeURIComponent(QUERY)}`;
        const response = await fetch(url, { next: { revalidate: 60 } });
        if (!response.ok) throw new Error(`Sanity API HTTP ${response.status}`);
        const body: unknown = await response.json();
        if (!isItem(body) || !isItem(body.result)) throw new Error("Malformed Sanity response");
        return adapt(body.result);
    } catch (e) {
        console.error("Sanity request failed; using local snapshot:", e);
        return fallback;
    }
}

function adapt(payload: Item): CmsCatalog {
    const branch = defaultBranches[0];
    if (!branch) return fallback;
    const branchId = branch.id;
    const original = defaultContent[branchId];
    if (!original) return fallback;
    const settings = isItem(payload.settings) ? payload.settings : null;
    const branches: Branch[] = settings ? [{
        ...branch,
        name: stringValue(settings.branchName, branch.name),
        address: stringValue(settings.branchAddress, branch.address),
        phone: nullableString(settings.branchPhone, branch.phone ?? null),
        opening_hours: nullableString(settings.branchHours, branch.opening_hours ?? null),
    }] : defaultBranches;

    const serviceCategoryOrder = settings && Array.isArray(settings.serviceCategoryOrder)
        ? settings.serviceCategoryOrder.filter((value): value is string => typeof value === "string")
        : [];
    const serviceDocs = Array.isArray(payload.services) ? payload.services.filter(isItem) : [];
    const services: Service[] = serviceDocs.length ? serviceDocs.filter(s => typeof s.name === "string" && typeof s.price === "number" && Number.isFinite(s.price)).map(s => ({
        id: stringValue(s.serviceId, stringValue(s._id)),
        branch_id: branchId,
        name: stringValue(s.name),
        category: nullableString(s.category, null),
        description: nullableString(s.description, null),
        price: Math.max(0, numberValue(s.price, 0)),
        price_min: Math.max(0, numberValue(s.priceMin, numberValue(s.price, 0))),
        price_max: Math.max(0, numberValue(s.priceMax, numberValue(s.price, 0))),
        duration_minutes: typeof s.durationMinutes === "number" ? numberValue(s.durationMinutes, 0) : null,
        sort_order: typeof s.sortOrder === "number" ? s.sortOrder : null,
    })) : (settings ? [] : defaultServices);

    const offerDocs = Array.isArray(payload.offers) ? payload.offers.filter(isItem) : [];
    const offers: Offer[] = offerDocs.length ? offerDocs.filter(o => typeof o.name === "string" && /^\d{4}-\d{2}-\d{2}$/.test(stringValue(o.startDate)) && /^\d{4}-\d{2}-\d{2}$/.test(stringValue(o.endDate))).map(o => {
        const id = stringValue(o.offerId, stringValue(o._id));
        return {
            id, name: stringValue(o.name), details: stringValue(o.details),
            start_date: stringValue(o.startDate), end_date: stringValue(o.endDate),
            image: imageUrl(o.imageUrl, defaultOffers.find(x => x.id === id)?.image || "/content/offer-01.webp"),
            instagram_post_url: nullableString(o.instagramPostUrl, null),
            branch_id: null, sort_order: numberValue(o.sortOrder, 0),
        };
    }) : (settings ? [] : defaultOffers);

    const trendDocs = Array.isArray(payload.trends) ? payload.trends.filter(isItem) : [];
    const trends: InstagramTrendItem[] = trendDocs.length ? trendDocs.filter(t => typeof t.instagramUrl === "string").map(t => {
        const id = numberValue(t.trendId, 0);
        return {
            id: id || numberValue(t.sortOrder, 1),
            title: nullableString(t.title, null),
            image_src: imageUrl(t.imageUrl, original.instagram_showcase.find(x => x.id === id)?.image_src || "/content/trend-01.webp"),
            instagram_url: stringValue(t.instagramUrl),
            sort_order: numberValue(t.sortOrder, 0),
        };
    }).sort((a, b) => a.sort_order - b.sort_order) : (settings ? [] : original.instagram_showcase);

    const reviewDocs = Array.isArray(payload.reviews) ? payload.reviews.filter(isItem) : [];
    const reviews: CustomerReview[] = reviewDocs.length ? reviewDocs.filter(r => typeof r.displayName === "string" && typeof r.content === "string").map(r => ({
        id: numberValue(r.reviewId, numberValue(r.sortOrder, 1)),
        branch_id: branchId,
        display_name: stringValue(r.displayName), content: stringValue(r.content),
        source: stringValue(r.source), source_url: stringValue(r.sourceUrl),
        sort_order: numberValue(r.sortOrder, 0),
    })).sort((a, b) => a.sort_order - b.sort_order) : (settings ? [] : original.customer_reviews);

    const salon: SalonContent = {
        ...original,
        name: settings ? stringValue(settings.name, original.name) : original.name,
        display_name: settings ? stringValue(settings.displayName, original.display_name) : original.display_name,
        instagram_handle: settings ? nullableString(settings.instagramHandle, original.instagram_handle) : original.instagram_handle,
        google_maps_location: settings ? nullableString(settings.googleMapsLocation, original.google_maps_location) : original.google_maps_location,
        google_maps_url: settings ? nullableString(settings.googleMapsUrl, original.google_maps_url) : original.google_maps_url,
        hotline: settings ? nullableString(settings.hotline, original.hotline) : original.hotline,
        contact_email: settings ? nullableString(settings.contactEmail, original.contact_email) : original.contact_email,
        facebook_name: settings ? nullableString(settings.facebookName, original.facebook_name) : original.facebook_name,
        tiktok_name: settings ? nullableString(settings.tiktokName, original.tiktok_name) : original.tiktok_name,
        has_refreshments: settings ? boolValue(settings.hasRefreshments, original.has_refreshments) : original.has_refreshments,
        has_warranty: settings ? boolValue(settings.hasWarranty, original.has_warranty) : original.has_warranty,
        warranty_days: settings ? (settings.warrantyDays === null ? null : numberValue(settings.warrantyDays, original.warranty_days ?? 0)) : original.warranty_days,
        brands: settings ? nullableString(settings.brands, original.brands) : original.brands,
        experience_notes: settings ? nullableString(settings.experienceNotes, original.experience_notes) : original.experience_notes,
        instagram_showcase: trends,
        customer_reviews: reviews,
    };
    return { branches, services, offers, salonContents: { [branchId]: salon }, serviceCategoryOrder };
}
