# Figma Design System Token Comparison Report

## Overview
This report compares the design tokens defined in the Sitka Design System Figma file with the local tokens in `src/tokens/tokens.json`.

## Files Compared
- **Figma Design System**: https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System
- **Local Tokens**: `src/tokens/tokens.json`

## Authentication Status
❌ **Unable to complete comparison** - Figma authentication token is expired or invalid
- Status: 403 - Invalid token
- Token type: Personal Access Token (OAuth)
- MCP Server: https://mcp.figma.com/mcp (accessible but requires valid auth)

## Local Tokens Summary

### Color Tokens (28 total)
#### Brand Colors (12)
- `cyan`: #00C0E8
- Green scale: 50 (#f0faf4) → 950 (#071f12)

#### Neutral/Grayscale (12)
- 0: #ffffff (white)
- 50: #fafafa
- 100: #f5f5f5
- 200: #e5e5e5
- 300: #d4d4d4
- 400: #a7a7ac
- 500: #747474
- 600: #525252
- 700: #404040
- 800: #282828
- 900: #171717
- 950: #0a0a0a
- 1000: #000000 (black)

#### Semantic Colors (4)
- `success`: #22c55e (green)
- `warning`: #f59e0b (amber)
- `error`: #ef4444 (red)
- `info`: #3b82f6 (blue)

### Typography Tokens (22 total)

#### Font Families (2)
- `sans`: 'Inter', system-ui, sans-serif
- `mono`: 'JetBrains Mono', monospace

#### Font Sizes (9)
- `xs`: 11px
- `sm`: 13px
- `base`: 15px
- `lg`: 17px
- `xl`: 20px
- `2xl`: 24px
- `3xl`: 30px
- `4xl`: 36px
- `5xl`: 48px

#### Font Weights (4)
- `regular`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700

#### Line Heights (4)
- `tight`: 1.25
- `snug`: 1.375
- `normal`: 1.5
- `relaxed`: 1.625

#### Letter Spacing (5)
- `tight`: -0.02em
- `normal`: 0em
- `wide`: 0.04em
- `wider`: 0.08em
- `overline`: 1px

### Spacing Tokens (13)
- 0: 0px
- 1: 4px
- 2: 8px
- 3: 12px
- 4: 16px
- 5: 20px
- 6: 24px
- 8: 32px
- 10: 40px
- 12: 48px
- 16: 64px
- 20: 80px
- 24: 96px

### Border Radius Tokens (6)
- `sm`: 6px
- `md`: 10px
- `lg`: 14px
- `xl`: 20px
- `2xl`: 28px
- `full`: 9999px

## Expected Figma Variables
Based on the Sitka Design System structure, the Figma file should contain:

### Color Variables
- Primary/Brand color (cyan)
- Semantic colors (success, warning, error, info)
- Neutral/background colors (grayscale scale)
- Possibly mode-specific variants (light/dark)

### Typography Variables
- Font families (Inter, JetBrains Mono)
- Type scales (heading, body, caption)
- Text styles with combinations of font size, weight, line height

### Effect Variables
- Shadows (likely matching shadow tokens)
- Blurs

### Grid Variables
- Column grids
- Spacing grids

## Discrepancies to Check
When authentication is restored, verify:

1. **Color Values**
   - Are all brand colors present?
   - Do semantic colors match (#22c55e, #f59e0b, #ef4444, #3b82f6)?
   - Is the grayscale scale complete and consistent?

2. **Typography**
   - Are all font sizes present (11px to 48px)?
   - Do font weights match (400, 500, 600, 700)?
   - Are Inter and JetBrains Mono properly referenced?

3. **Spacing**
   - Does the 4px base scale system exist in Figma?
   - Are all spacing tokens (0-24) defined?

4. **Border Radius**
   - Do corner radius tokens match?
   - Is the naming convention consistent?

5. **Missing Tokens**
   - Are there Figma variables not in local tokens?
   - Are there local tokens not in Figma?

## How to Complete the Comparison

### Method 1: Figma REST API
```bash
# Get file variables
curl -H "X-Figma-Token: YOUR_TOKEN" \
  "https://api.figma.com/v1/files/kMO3RdXXNoZrpHh24hQTl1/variables"
```

### Method 2: Figma MCP Server
Using the configured MCP server in VS Code or Cursor:
```typescript
get_variable_defs(fileKey="kMO3RdXXNoZrpHh24hQTl1")
```

### Method 3: Figma Plugin Scripts
Run existing scripts in Figma plugin context:
- `get_vars.js` - Extract all variables
- `get_all_variables.js` - Get variable collections

## Configuration Files

### Figma MCP Configuration
- Location: `.gemini/settings.json` and `kilo.json`
- Server URL: https://mcp.figma.com/mcp
- Type: HTTP Streamable
- Status: Configured but needs valid authentication

### Token Storage
- Location: `~/.gemini/mcp-oauth-tokens.json`
- Contains: OAuth tokens (expired)
- Requires: Refresh with valid client credentials

## Recommendations

1. **Immediate Actions**
   - Generate new Figma personal access token
   - Update MCP server configuration
   - Re-authenticate via gemini CLI: `gemini mcp auth figma`

2. **Verification Process**
   - Extract all Figma variables
   - Compare with local tokens.json
   - Document discrepancies
   - Update either Figma or local tokens to ensure consistency

3. **Automation Setup**
   - Create sync script for regular comparisons
   - Add CI/CD check to ensure token consistency
   - Document drift-detection process

## Conclusion

The local token system in `src/tokens/tokens.json` appears comprehensive with:
- ✓ Complete color system (brand + neutral + semantic)
- ✓ Typography scale with proper font stacks
- ✓ Consistent spacing system (4px base)
- ✓ Border radius tokens

However, without access to the Figma file, we cannot verify:
- Whether these tokens are actually defined in Figma
- If there are additional Figma-specific tokens
- Consistency between design and code tokens

**Status**: Awaiting valid Figma authentication to complete comparison.
