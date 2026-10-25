import type { Service } from "@/lib/api";

export function formatVnd(value: number) {
    return new Intl.NumberFormat("vi-VN").format(value);
}

export function formatServicePrice(service: Service) {
    const min = service.price_min ?? service.price;
    const max = service.price_max ?? min;

    if (max > min) {
        return `${formatVnd(min)}–${formatVnd(max)} đ`;
    }

    return `${formatVnd(min)} đ`;
}

export function localizeBranchName(name: string) {
    const baseName = name.replace(/^Serpente Nail Room\s*-\s*/i, "").trim() || name.trim();
    const shortName = baseName
        .replace(/^Tiệm Nail\s*/i, "")
        .replace(/^Chi nhánh\s*/i, "")
        .trim();

    return shortName ? `Chi nhánh ${shortName}` : "Chi nhánh";
}

export function shortBranchName(name: string) {
    return localizeBranchName(name).replace(/^Chi nhánh\s*/i, "").trim();
}

export function localizeAddress(address: string) {
    return address;
}

export function getInstagramUrl(handle: string | null | undefined) {
    return handle ? `https://www.instagram.com/${handle.replace(/^@/, "")}/` : null;
}

export function getMapsSearchUrl(location: string | null | undefined) {
    return location
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
        : null;
}

export function getMapsUrl(
    directUrl: string | null | undefined,
    location: string | null | undefined
) {
    const normalizedDirectUrl = directUrl?.trim();

    return normalizedDirectUrl || getMapsSearchUrl(location);
}
