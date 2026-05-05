# GitHub Pages Deployment Guide

This guide explains how to deploy the Sitka Design System documentation to GitHub Pages.

## Prerequisites

- A GitHub repository (either a user/organization site or a project site)
- Node.js 24+ (for local development/testing)

## Configuration

### 1. Set Repository Name in `next.config.ts`

If deploying to a **project site** (e.g., `https://username.github.io/sitka-design-system/`), update `basePath` in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/sitka-design-system", // Your repository name
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

For **user/organization sites** (e.g., `https://username.github.io/`), leave `basePath` empty:

```typescript
basePath: "",
```

### 2. Enable GitHub Pages

1. Go to your repository **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source**: GitHub Actions
   - The workflow will automatically deploy when you push to `main`/`master`

OR (manual deployment):
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` /root (or `docs` folder if using that)

### 3. Verify Deployment

After the GitHub Actions workflow runs, your site will be available at:

- **Project site**: `https://<username>.github.io/<repository-name>/`
- **User site**: `https://<username>.github.io/`

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Build Locally

```bash
# Generate static export
npm run build

# Output will be in the `out/` directory
```

## Manual Deployment (Alternative)

If you prefer not to use GitHub Actions:

1. Build locally:
   ```bash
   npm run build
   ```

2. Push the `out` directory to the `gh-pages` branch:
   ```bash
   npx gh-pages -d out -b gh-pages
   ```

Or manually copy the contents of `out/` to the `gh-pages` branch.

## Troubleshooting

### 404 Errors on Page Refresh

- Ensure `trailingSlash: true` is set in `next.config.ts`
- This ensures proper file resolution (e.g., `/page/index.html` instead of `/page.html`)

### Images Not Loading

- Use relative paths for all images
- Next.js Image component is disabled; use standard `<img>` tags
- Place images in the `public/` directory

### Links Breaking on Subpath

- All internal links should use `next/link` with relative paths
- The `basePath` setting automatically prefixes all routes

### Mixed Content Warnings

- Ensure all resources (images, fonts) are served via HTTPS
- Use protocol-relative URLs or relative paths

## CI/CD with GitHub Actions

The included workflow (`.github/workflows/deploy.yml`) will:

1. Trigger on pushes to `main`/`master` or manual dispatch
2. Install dependencies
3. Build the Next.js application
4. Deploy the `out/` directory to GitHub Pages
5. Invalidate any caches automatically

## Environment Variables

For a static export, environment variables must be:

- Set at build time (in GitHub Actions secrets)
- Inlined into the static HTML during the build process
- Cannot reference runtime-only values

Add secrets in Repository Settings → Secrets and variables → Actions

Example usage in GitHub Actions:
```yaml
- name: Build
  run: npm run build
  env:
    NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
```

## Notes

- The static export (`output: "export"`) does not support:
  - API routes (serverless functions)
  - Server-side rendering (SSR)
  - Dynamic routes without `getStaticPaths`
  - `getServerSideProps`

- All pages must be pre-renderable at build time
- For dynamic content, consider using:
  - Client-side data fetching
  - Static Site Generation (SSG) with revalidation
  - A separate backend API

## Performance Optimization

The static export provides:
- Instant page loads
- No server costs
- Global CDN distribution via GitHub Pages
- Better SEO
- Improved security (no server-side code execution)

## Further Reading

- [Next.js Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
