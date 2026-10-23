import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site-url";
export default function robots(): MetadataRoute.Robots {
    return { rules: { userAgent: "*", allow: ["/", "/services"], disallow: ["/book"] },
        sitemap: new URL("/sitemap.xml", SITE_ORIGIN).toString() };
}
