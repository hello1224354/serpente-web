import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: { remotePatterns: [{ protocol: "https", hostname: "drive.google.com", pathname: "/thumbnail" }] },
    async redirects() {
        return [{ source: "/book", destination: "https://booksalon.kiotviet.vn/serpentenailroom", permanent: false }];
    },
    async headers() {
        return [{ source: "/:path*", headers: [
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "X-Frame-Options", value: "DENY" },
            { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
            { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
            { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ] }];
    },
};
export default nextConfig;
