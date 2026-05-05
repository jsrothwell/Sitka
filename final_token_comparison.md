# Figma Token Comparison Report

## Executive Summary

**Status:** ⚠ Unable to Complete Direct Comparison

**Reason:** Figma authentication token is expired or invalid (HTTP 403)

**File:** `src/tokens/tokens.json`  
**Figma Design System:** https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System

---

## Local Tokens Analysis

### Summary Statistics

| Token Category | Count | Coverage |
|---------------|-------|----------|
| Color (Brand) | 12 | ✓ Complete |
| Color (Neutral) | 12 | ✓ Complete |
| Color (Semantic) | 4 | ✓ Complete |
| Font Sizes | 9 | ✓ Complete |
| Font Weights | 4 | ✓ Complete |
| Line Heights | 4 | ✓ Complete |
| Letter Spacing | 5 | ✓ Complete |
| Spacing | 13 | ✓ Complete |
| Border Radius | 6 | ✓ Complete |
| **TOTAL** | **79** | **Complete System** |

### Token Structure

#### 1. Color System

**Brand Colors:**
- Primary cyan: `#00C0E8`
- Green scale (11 variants from 50-950)

**Neutral/Grayscale:**
- Full spectrum from white (#ffffff) to black (#000000)
- 12-step scale with logical progression

**Semantic Colors:**
- Success: `#22c55e` (green)
- Warning: `#f59e0b` (amber)
- Error: `#ef4444` (red)
- Info: `#3b82f6` (blue)

#### 2. Typography System

**Font Families:**
- Sans-serif: Inter (system fonts as fallback)
- Monospace: JetBrains Mono

**Type Scale:**
- xs: 11px → 5xl: 48px
- 9 distinct sizes with 4px base progression

**Font Weights:**
- 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

#### 3. Spacing System

- 4px base unit
- Scale from 0px to 96px
- Consistent increments (4px → 8px → 12px → 16px → 20px...)

#### 4. Border Radius

- 6 scale from small (6px) to full circle (9999px)

---

## Comparison with Figma Design System

### Token Categories Expected in Figma

Based on the local tokens structure, the following SHOULD exist in Figma:

| Category | Expected Variables | Local Tokens |
|----------|-------------------|--------------|
| Colors | 28 | 28 |
| Font Sizes | 9 | 9 |
| Font Weights | 4 | 4 |
| Line Heights | 4 | 4 |
| Letter Spacing | 5 | 5 |
| Spacing | 13 | 13 |
| Border Radius | 6 | 6 |

### Potential Discrepancies to Verify

1. **Naming Conventions**
   - Figma might use different naming (e.g., "primary/500" vs "brand/500")
   - Token reference format may differ (`{colors.brand.cyan}` vs `{colors.brand.cyan.$value}`)

2. **Value Differences**
   - Color hex values might have slight variations
   - Spacing values might use different units (px vs rem)

3. **Missing Tokens**
   - Figma may have additional tokens not in local system
   - Local system may have tokens not yet defined in Figma

4. **Variable Collections**
   - Figma may organize tokens into collections (Light/Dark modes)
   - Mode-specific variants might exist

---

## Authentication Requirements

To complete this comparison, one of the following is needed:

### Option 1: Personal Access Token
```bash
# Generate at: https://www.figma.com/settings
export FIGMA_TOKEN="your_new_token_here"
node compare_tokens.js
```

### Option 2: Figma MCP Server (Recommended)
In VS Code or Cursor with Figma extension:
```typescript
get_variable_defs(fileKey="kMO3RdXXNoZrpHh24hQTl1")
get_design_context(fileKey="kMO3RdXXNoZrpHh24hQTl1", nodeId="1-2")
```

### Option 3: OAuth App
- Register OAuth app at figma.com/developers
- Use OAuth 2.0 flow for secure token access

---

## Current Project Setup

### Configuration Files

1. **`.gemini/settings.json`**
   - MCP server configured for Figma
   - URL: https://mcp.figma.com/mcp

2. **`kilo.json`**
   - Remote MCP server enabled
   - Type: HTTP streamable

3. **`~/.gemini/mcp-oauth-tokens.json`**
   - Existing OAuth tokens (expired)
   - Needs refresh via Figma re-authentication

### Figma-Related Scripts

The project includes these Figma integration scripts:
- `get_vars.js` - Extract all variables from Figma
- `get_all_variables.js` - Get variable collections
- `find_token_nodes.js` - Locate token-related nodes
- `full_audit.js` - Complete design system audit

---

## Recommendations

### Immediate Actions

1. **Re-authenticate Figma**
   ```bash
   # Option A: Generate new PAT
   # Visit https://www.figma.com/settings
   # Create token with "file_content:read" scope
   
   # Option B: Use MCP server
   gemini mcp auth figma
   ```

2. **Run Comparison**
   ```bash
   node compare_tokens.js --token NEW_TOKEN
   ```

3. **Review Discrepancies**
   - Check generated report: `figma-token-comparison-report.json`
   - Align tokens between Figma and code
   - Document any intentional differences

### Long-term Setup

1. **CI/CD Integration**
   - Add token validation to build process
   - Fail builds if tokens drift
   - Automated weekly sync checks

2. **Source of Truth**
   - Decide: Figma or code is canonical?
   - Set up sync process (Figma → code or code → Figma)
   - Document override policies

3. **Developer Experience**
   - Pre-commit hook to check token consistency
   - VS Code extension for real-time sync
   - Documentation for token updates

---

## Conclusion

The local token system (`src/tokens/tokens.json`) is:
- ✅ Comprehensive (79 tokens across 9 categories)
- ✅ Well-structured (logical naming, clear hierarchy)
- ✅ Production-ready (complete color, typography, spacing systems)

**Next Step:** Authenticate with Figma to verify alignment with design system and resolve any discrepancies.

---

*Report Generated: 2026-05-01*  
*Tools: Figma MCP Server, REST API Comparison Script*  
*Status: ⚠ Pending Authentication*
