This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on GitHub Pages

This project is configured for deployment to GitHub Pages.

### Configuration

The project uses `output: "export"` to generate static HTML files. Configuration can be found in `next.config.ts`:

- `basePath: "/Sitka"` - Set to your repository name for project sites
- `assetPrefix: "/Sitka"` - Ensures assets load from correct path
- `trailingSlash: true` - Required for static file resolution
- `images.unoptimized: true` - Standard `<img>` tags used instead of Next.js Image

### Deployment

The project includes an automated GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. Builds the Next.js application
2. Generates static HTML in the `out/` directory
3. Deploys to the root of the `gh-pages` branch
4. Includes `.nojekyll` file to prevent Jekyll processing

### Manual Deployment

To deploy manually:

```bash
# Build the project
npm run build

# Deploy to gh-pages branch
npx gh-pages -d out -b gh-pages
```

### Access URLs

After deployment, the site will be available at:

- **Project site**: `https://<username>.github.io/Sitka/`
- **User site**: `https://<username>.github.io/` (requires `basePath: ""`)

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (static export)
- `npm run export` - Generate static export (same as build)
- `npm run start` - Start production server
- `npm run serve` - Serve static files locally (for testing)
- `npm run lint` - Run ESLint

## Learn More

To learn more about Sitka Design System, visit the [documentation](https://github.com/username/Sitka/wiki).

## License

Sitka Design System is licensed under the MIT License.
