# Deployment Verification Checklist

Before deploying to GitHub Pages, verify the following:

## ✅ Pre-Deployment Checks

### 1. `next.config.ts` Configuration
- [x] `output: "export"` is set
- [x] `basePath` is correctly configured for your repository
  - Empty string `""` for user/organization sites (`username.github.io`)
  - Repository name `"/repo-name"` for project sites (`username.github.io/repo-name`)
- [x] `trailingSlash: true` ensures proper file resolution
- [x] `images.unoptimized: true` since Next.js Image optimization requires a server

### 2. Image and Asset Handling
- [x] All `next/image` imports replaced with standard `<img>` tags
  - Updated `/src/app/page.tsx` (hero logo)
  - Updated `/src/components/layout/Sidebar.tsx` (sidebar logo)
- [x] All images placed in `public/` directory or use absolute URLs
- [x] No dynamic image optimization required

### 3. Links and Navigation
- [x] All internal links use `next/link` with relative paths
- [x] No hardcoded absolute URLs (except external resources)
- [x] All routes are statically pre-renderable

### 4. Server-Side Features
- [x] No API routes exist (`app/api` directory is absent)
- [x] No `getServerSideProps` usage
- [x] All data is either:
  - Hardcoded (components, examples)
  - Loaded client-side via API calls
  - Static props (metadata, navigation)

### 5. Interactive Demos
- [x] All demos are client-side only
- [x] SVG diagrams are inline and static
- [x] No server-side rendering required for demos
- [x] State management is client-side only

## ✅ Build Verification

```bash
# Clean build
npm run build

# Verify out/ directory is created
ls -la out/

# Check for HTML files (all routes should be pre-rendered)
find out -name "*.html" | head -20
```

## ✅ GitHub Actions Workflow

- [x] `.github/workflows/deploy.yml` created
- [x] Correct Node.js version (24)
- [x] Proper caching configured
- [x] Artifact upload configured
- [x] Pages deployment configured
- [x] Permissions correctly set

### Workflow Triggers
- [x] Push to `main`/`master` branches
- [x] Pull requests to `main`/`master`
- [x] Manual trigger (`workflow_dispatch`)

## ✅ Repository Settings

### GitHub Pages Configuration
1. Go to **Settings → Pages**
2. **Source**: Select "GitHub Actions"
3. The workflow will automatically deploy on push

### Branch Protection (Optional)
Consider enabling:
- [ ] Require pull request reviews before merging
- [ ] Require status checks to pass before merging
- [ ] Require branches to be up to date before merging

## ✅ Post-Deployment Verification

After the workflow completes:

1. **Check workflow status**
   - Go to Actions tab
   - Verify "Deploy to GitHub Pages" workflow passes

2. **Verify deployment URL**
   - Click the deployment URL in workflow logs
   - Navigate to key pages:
     - Homepage (`/`)
     - Component pages (e.g., `/components/button`)
     - Pattern pages (e.g., `/patterns/form`)
     - New pages (e.g., `/components/slider`, `/patterns/collaboration`)

3. **Test interactivity**
   - Component demos should work
   - Navigation should function
   - Forms should accept input
   - No JavaScript errors in console

4. **Verify assets**
   - Images load correctly
   - CSS styles apply properly
   - Icons render (lucide-react, SVG)

5. **Mobile responsiveness**
   - Test on different screen sizes
   - Sidebar navigation works on mobile
   - Touch interactions work

## ✅ Rollback Plan

If deployment fails:

1. **Revert to previous working commit**
   ```bash
   git revert HEAD
   git push
   ```

2. **Or disable GitHub Pages**
   - Go to Settings → Pages → Select "Deactivate site"

3. **Fix issues locally**
   ```bash
   # Test build locally first
   npm run build
   npx serve out  # or use any static server
   ```

## ✅ Performance Checks

- [x] Run Lighthouse audit on deployed site
- [x] Verify all pages score > 90 on Performance
- [x] Check for 404 errors in browser console
- [x] Verify all routes return 200 status

## ✅ SEO Verification

- [x] Each page has unique `<title>` (via `metadata`)
- [x] Meta descriptions are set
- [x] Open Graph tags are configured (if needed)
- [x] Sitemap is generated (if needed)

## Common Issues & Solutions

### Issue: 404 on page refresh
**Solution**: Ensure `trailingSlash: true` in `next.config.ts`

### Issue: Images not loading
**Solution**: 
- Use `<img>` instead of Next.js Image
- Place images in `public/` directory
- Use absolute paths (`/image.png`)

### Issue: Styles not applying
**Solution**:
- Verify Tailwind CSS is building correctly
- Check for missing CSS classes in production build
- Ensure `NODE_ENV=production` during build

### Issue: Client-side routing broken
**Solution**:
- All links must use `next/link`
- Avoid `window.location` for internal navigation
- Ensure `basePath` is correct

## Deployment URLs

### Project Site Example
- **Repository**: `username/sitka-design-system`
- **URL**: `https://username.github.io/sitka-design-system/`
- **basePath**: `"/sitka-design-system"`

### User Site Example  
- **Repository**: `username/username.github.io`
- **URL**: `https://username.github.io/`
- **basePath**: `""`

## Support

For issues with:
- **Next.js static export**: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- **GitHub Pages**: https://docs.github.com/en/pages
- **GitHub Actions**: https://docs.github.com/en/actions
