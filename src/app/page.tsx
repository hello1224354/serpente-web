import type { Metadata } from "next";
import { HomeSections } from "@/components/home/HomeSections";
import { offers } from "@/data/catalog";
import type { Offer as OfferCard } from "@/components/home/CurrentOffers";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Serpente Nail Room",
    alternates: { canonical: "/" },
    description: "Bảng giá, ưu đãi và mẫu móng tại Serpente Nail Room, Quận 8.",
};

function localDate(value: string) {
    const [year, month, day] = value.split("-");
    return day && month && year ? `${day}/${month}/${year}` : value;
}

export default function HomePage() {
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    const currentOffers: OfferCard[] = offers.filter(o => o.start_date <= today && o.end_date >= today).map(o => ({
        name: o.name,
        details: o.details,
        validDates: `Từ ${localDate(o.start_date)} đến ${localDate(o.end_date)}`,
        image: o.image,
        instagramPostUrl: o.instagram_post_url ?? null,
        branchId: o.branch_id ?? null,
    }));
    return <HomeSections offers={currentOffers} />;
}
