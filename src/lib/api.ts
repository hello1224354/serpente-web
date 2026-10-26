export type Branch = {
    id: number;
    name: string;
    address: string;
    phone?: string | null;
    opening_hours?: string | null;
    created_at?: string;
    updated_at?: string;
};

export type Service = {
    id: string;
    branch_id: number;
    name: string;
    category?: string | null;
    description?: string | null;
    price: number;
    price_min?: number | null;
    price_max?: number | null;
    duration_minutes: number | null;
    sort_order?: number | null;
};

export type Offer = {
    id: string;
    name: string;
    details: string;
    start_date: string;
    end_date: string;
    image: string;
    instagram_post_url?: string | null;
    branch_id: number | null;
    sort_order: number;
};

export type InstagramTrendItem = {
    id: number;
    title: string | null;
    image_src: string;
    instagram_url: string;
    sort_order: number;
};

export type CustomerReview = {
    id: number;
    branch_id: number;
    display_name: string;
    content: string;
    source: string;
    source_url: string;
    sort_order: number;
};

export type SalonContent = {
    id: number;
    name: string;
    display_name: string;
    instagram_handle: string | null;
    google_maps_location: string | null;
    google_maps_url: string | null;
    hotline: string | null;
    contact_email: string | null;
    facebook_name: string | null;
    tiktok_name: string | null;
    has_refreshments: boolean;
    has_warranty: boolean;
    warranty_days: number | null;
    brands: string | null;
    experience_notes: string | null;
    instagram_showcase: InstagramTrendItem[];
    customer_reviews: CustomerReview[];
};
