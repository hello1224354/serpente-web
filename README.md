# Serpente Nail Room · Frontend-only

Standalone Next.js website exported from the **uploaded** `nail_salon_api-main.zip`
(commit `565343293ebec5cc170d219a0587ebaf6ed983cd`).
The original website layout/components were retained wherever practical.

## What is included

- Landing page, offers, Hot Trend carousel, reviews, salon details and contacts.
- Public price catalogue, grouped by service category.
- All public content is local in `src/data/catalog.ts`.
- Public imagery is stored in `public/` and is served without the former API.
- Every visible **Đặt lịch** link navigates directly to
  `https://booksalon.kiotviet.vn/serpentenailroom`.
- Old incoming `/book` URLs redirect to KiotViet.
- **No booking backend, OTP, login, registration, staff system, admin system,
  database, Railway, API rewrites, or traffic tracker.**

## Important: original image files not included in GitHub source ZIP

The original Hot Trend and offer images were stored as MySQL-backed media in
production, **not in the uploaded source ZIP**. Consequently `public/content`
currently contains **temporary presentation images copied from the original
frontend's two bundled images** (`public/nails/nail-02.png` and `nail-04.png`).
These are visually valid but **not the original Hot Trend / offer pictures**.

On a computer with internet access, run this **once while the previous public
API is still online** to fetch the original photos and replace the temporary ones:

```powershell
py -3.13 scripts/restore-original-media.py
```

Only **four distinct public images** are needed because the offer image is also
a Hot Trend image. This script downloads five local placements and then updates
the static image paths in `src/data/catalog.ts`. It does not write to the former
backend or database. If production API is unavailable, use your own original
images under `public/content/` and preserve/update the paths in `catalog.ts`.

## Running locally

```powershell
npm ci
npm run lint
npm run build
npm run dev
```

Site: `http://localhost:3001`.

### Content updates

Change `src/data/catalog.ts` and/or `public/content` and redeploy. Data was
snapshotted on **2026-10-22**: 1 branch, 31 business services, 1 offer, 4
trends, and 5 reviews. Two public `QA-E2E-` records were explicitly omitted.
**No automatic synchronization.** Offers are filtered by their validity dates
at build time; redeploy to refresh that status.

### GitHub and Vercel

1. Create a **new empty** repo, for example `hello1224354/serpente-web`.
2. Push **this folder's contents** to the new repo; do **not** replace or overwrite
   `nail_salon_api`.
3. Create a **new Vercel project** pointing to that repo, Root Directory: `.`.
4. Verify both pages, navigation, media, and external booking destination on
   Vercel's preview domain before moving `serpentenailroom.site`.

If GitHub CLI is installed and authenticated, from this new folder:

```powershell
git init
git add .
git commit -m "Create frontend-only Serpente web with KiotViet booking"
git branch -M main
git remote add origin https://github.com/hello1224354/serpente-web.git
git push -u origin main
```

**Production was not modified** by this export. Do not change the existing
Vercel domain, Railway or MySQL until a separate release decision.
