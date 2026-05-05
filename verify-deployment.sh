#!/bin/bash

echo "=== Sitka Design System - Deployment Verification ==="
echo ""

# Check next.config.ts
echo "1. Checking next.config.ts..."
if grep -q 'output: "export"' next.config.ts; then
  echo "   ✅ output: 'export' is set"
else
  echo "   ❌ output: 'export' is NOT set"
fi

if grep -q 'basePath: "/Sitka"' next.config.ts; then
  echo "   ✅ basePath: '/Sitka' is set"
else
  echo "   ❌ basePath is NOT correctly set"
fi

if grep -q 'assetPrefix: "/Sitka"' next.config.ts; then
  echo "   ✅ assetPrefix: '/Sitka' is set"
else
  echo "   ❌ assetPrefix is NOT correctly set"
fi

if grep -q 'unoptimized: true' next.config.ts; then
  echo "   ✅ images.unoptimized: true is set"
else
  echo "   ❌ images.unoptimized is NOT set"
fi

if grep -q 'trailingSlash: true' next.config.ts; then
  echo "   ✅ trailingSlash: true is set"
else
  echo "   ❌ trailingSlash is NOT set"
fi
echo ""

# Check GitHub Actions workflow
echo "2. Checking GitHub Actions workflow..."
if [ -f ".github/workflows/deploy.yml" ]; then
  echo "   ✅ deploy.yml exists"
  if grep -q 'gh-pages' .github/workflows/deploy.yml; then
    echo "   ✅ Workflow deploys to gh-pages branch"
  else
    echo "   ❌ Workflow does NOT reference gh-pages"
  fi
  if grep -q '.nojekyll' .github/workflows/deploy.yml; then
    echo "   ✅ Workflow creates .nojekyll file"
  else
    echo "   ❌ Workflow does NOT create .nojekyll"
  fi
else
  echo "   ❌ deploy.yml does NOT exist"
fi
echo ""

# Check .nojekyll file
echo "3. Checking .nojekyll file..."
if [ -f "public/.nojekyll" ]; then
  echo "   ✅ public/.nojekyll exists"
else
  echo "   ❌ public/.nojekyll does NOT exist"
fi
echo ""

# Check new documentation pages
echo "4. Checking new documentation pages..."
PAGES=(
  "src/app/components/slider/page.tsx"
  "src/app/components/date-time-pickers/page.tsx"
  "src/app/components/carousel/page.tsx"
  "src/app/components/snackbar/page.tsx"
  "src/app/patterns/collaboration/page.tsx"
  "src/app/patterns/drag-drop/page.tsx"
  "src/app/patterns/data-entry/page.tsx"
)

for page in "${PAGES[@]}"; do
  if [ -f "$page" ]; then
    echo "   ✅ $page exists"
  else
    echo "   ❌ $page is missing"
  fi
done
echo ""

# Check for next/image usage
echo "5. Checking for Next.js Image component usage..."
NEXT_IMAGE_FILES=$(grep -r "from \"next/image\"" src/app src/components --include="*.tsx" --include="*.jsx" 2>/dev/null | grep -v node_modules | wc -l)
if [ "$NEXT_IMAGE_FILES" -eq 0 ]; then
  echo "   ✅ No Next.js Image imports found"
else
  echo "   ⚠️  Found $NEXT_IMAGE_FILES files with next/image imports"
  grep -r "from \"next/image\"" src/app src/components --include="*.tsx" --include="*.jsx" 2>/dev/null | grep -v node_modules
fi
echo ""

# Check documentation files
echo "6. Checking deployment documentation..."
DOCS=(
  "DEPLOYMENT.md"
  "DEPLOYMENT-VERIFICATION.md"
  "DEPLOYMENT-SUMMARY.md"
  "DEPLOYMENT-COMPLETE.md"
)

for doc in "${DOCS[@]}"; do
  if [ -f "$doc" ]; then
    echo "   ✅ $doc exists"
  else
    echo "   ❌ $doc is missing"
  fi
done
echo ""

echo "=== Verification Complete ==="
