# Sitka Design System - GitHub Pages Deployment

## Summary of Changes

This document summarizes all changes made to enable GitHub Pages deployment for the Sitka Design System documentation.

## Files Modified

### 1. `next.config.ts`
**Changes:**
- Added `output: "export"` for static HTML export
- Added `basePath: ""` (configure as needed for your repository)
- Added `trailingSlash: true` for proper static file resolution
- Added `images.unoptimized: true` (Next.js Image requires server)

**Configuration:**
```typescript
const nextConfig: NextConfig = {
  output: "export",
  basePath: "", // Set to "/your-repo-name" for project sites
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

### 2. `src/app/page.tsx`
**Changes:**
- Replaced `next/image` import with standard `<img>` tag
- Updated logo to use `<img>` with `object-contain` class
- Maintains all existing functionality

### 3. `src/components/layout/Sidebar.tsx`
**Changes:**
- Removed `next/image` import
- Replaced with standard `<img>` tag for logo
- Added `object-contain` class for proper logo display

### 4. `package.json`
**Changes:**
- Added `"export"` script for static export
- Added `"serve"` script for local testing of `out/` directory
- Added `serve` as dev dependency

## Files Created

### 5. `.github/workflows/deploy.yml`
**Purpose:** GitHub Actions workflow for automated deployment

**Features:**
- Triggers on push to main/master branches
- Triggers on pull requests
- Manual trigger support
- Builds Next.js app with proper memory settings
- Deploys `out/` directory to GitHub Pages
- Uses official GitHub Pages action

**Workflow:**
1. Checkout code
2. Setup Node.js 24
3. Install dependencies
4. Build application
5. Upload `out/` as artifact
6. Deploy to GitHub Pages

### 6. Component Documentation Pages
Created comprehensive documentation for requested components:

#### a. `/src/app/components/slider/page.tsx`
- Single thumb and range slider variants
- Keyboard navigation (arrow keys, shift for larger steps)
- Customizable min/max/step values
- Visual feedback for all states
- Props table and implementation examples

#### b. `/src/app/components/date-time-pickers/page.tsx`
- Calendar-based date picker
- Time picker with configurable increments
- Support for 12h/24h formats
- Min/max boundary constraints
- Keyboard accessible

#### c. `/src/app/components/carousel/page.tsx`
- Auto-advancing slides
- Manual controls (prev/next)
- Dot indicators
- Pause on hover
- Keyboard navigation

#### d. `/src/app/components/snackbar/page.tsx`
- Toast-style notifications
- Auto-dismiss with configurable duration
- Multiple variants (default, success, error, warning)
- Optional action button
- Keyboard accessible

### 7. Pattern Documentation Pages

#### a. `/src/app/patterns/collaboration/page.tsx`
- Real-time presence indicators
- Share functionality (copy, email, link)
- Collaborator avatar stacks
- Live cursor tracking

#### b. `/src/app/patterns/drag-drop/page.tsx`
- Reorderable lists
- File drop zones
- Kanban board implementation
- Accessibility support

#### c. `/src/app/patterns/data-entry/page.tsx`
- Inline validation patterns
- Multi-step wizards
- Bulk editing interfaces
- Form validation best practices

### 8. Documentation Files

#### `DEPLOYMENT.md`
- Complete deployment guide
- Configuration instructions
- Troubleshooting section
- Best practices

#### `DEPLOYMENT-VERIFICATION.md`
- Pre-deployment checklist
- Post-deployment verification steps
- Common issues and solutions
- Performance checks

## Technical Architecture

### Build Process
```
npm run build
  → Next.js static export
  → HTML files generated in `out/` directory
  → Each route becomes `/route/index.html`
  → GitHub Pages serves static files
```

### Technology Stack
- **Framework:** Next.js 16.2.4 (static export)
- **Styling:** Tailwind CSS 4
- **Icons:** lucide-react
- **State:** React hooks (no external state management)
- **Deployment:** GitHub Pages + GitHub Actions

### Static Export Considerations

#### What Works:
✓ All client-side React components
✓ Static props and metadata
✓ CSS and font imports
✓ SVG icons and inline SVGs
✓ Client-side routing with `next/link`
✓ Form inputs and interactions
✓ Keyboard navigation
✓ Local storage/session storage

#### What Doesn't Work (Not Used):
✗ API routes (none exist)
✗ Server-side rendering (SSR)
✗ `getServerSideProps`
✗ Server components
✗ Dynamic routes without `getStaticPaths`

## Deployment Instructions

### Prerequisites
1. GitHub repository
2. Node.js 24+ (for local testing)
3. npm or yarn

### Steps

1. **Configure `next.config.ts`**
   ```typescript
   // For project site: username.github.io/repo-name
   basePath: "/repo-name"
   
   // For user site: username.github.io
   basePath: ""
   ```

2. **Commit changes**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment configuration"
   git push
   ```

3. **Enable GitHub Pages**
   - Repository Settings → Pages
   - Source: GitHub Actions
   - Branch: Any (workflow handles this)

4. **Wait for deployment**
   - Check Actions tab for workflow status
   - Deployment URL appears in workflow logs

5. **Verify deployment**
   - Visit deployment URL
   - Test navigation
   - Check console for errors

## Testing Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Serve static files locally
npm run serve
```

## URL Structure

### Development
```
http://localhost:3000/
http://localhost:3000/components/button
http://localhost:3000/patterns/form
```

### Production (User Site)
```
https://username.github.io/
https://username.github.io/components/button
https://username.github.io/patterns/form
```

### Production (Project Site)
```
https://username.github.io/repo-name/
https://username.github.io/repo-name/components/button
https://username.github.io/repo-name/patterns/form
```

## Performance Optimization

### Current Optimizations
- Static HTML export (fastest possible)
- Tailwind CSS (purged in production)
- No unnecessary JavaScript
- CDN distribution via GitHub Pages
- Lazy-loaded images (browser native)

### Future Improvements
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Add meta tags for SEO
- [ ] Add Open Graph tags for social sharing
- [ ] Implement search with client-side indexing
- [ ] Add offline support with service workers

## Security Considerations

✅ No server-side code (reduces attack surface)  
✅ No database connections  
✅ No API keys exposed  
✅ All content is static  
✅ GitHub Pages HTTPS by default  

## Maintenance

### Updating Content
1. Edit markdown/JSX files
2. Commit changes
3. Workflow auto-deploys

### Updating Dependencies
```bash
npm update
npm run build
# Test locally
npm run serve
```

### Monitoring
- GitHub Actions tab shows build status
- GitHub Pages shows deployment status
- Browser console for runtime errors

## Troubleshooting

### Build Fails
- Check Node.js version (use 24.x)
- Increase memory: `NODE_OPTIONS='--max-old-space-size=4096'`
- Clear cache: `rm -rf node_modules/.cache`

### Deployment Fails
- Check workflow logs in Actions tab
- Verify Pages is enabled in Settings
- Check repository permissions

### Pages Not Updating
- Clear browser cache
- Wait 1-2 minutes for CDN propagation
- Check workflow completed successfully

### 404 Errors
- Ensure `trailingSlash: true`
- Verify `basePath` is correct
- Check file structure in `out/` directory

## Success Metrics

### Deployment Success
✅ Workflow completes without errors  
✅ All pages accessible  
✅ No 404 errors  
✅ Images load correctly  
✅ Styles apply properly  
✅ Interactive features work  

### Performance Targets
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Lighthouse Score: > 90
- Page size: < 500KB

## Support Resources

- [Next.js Static Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-05-05 | Initial deployment configuration |

## License

Sitka Design System is licensed under the MIT License. See LICENSE file for details.
