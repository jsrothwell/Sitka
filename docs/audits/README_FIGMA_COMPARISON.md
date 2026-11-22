# Figma Design System Token Comparison

## Quick Start

This directory contains tools and reports for comparing Figma design tokens with local code tokens.

## Files Overview

### Reports (Read These First)

1. **`FIGMA_TOKEN_COMPARISON_SUMMARY.md`** - Main summary report (START HERE)
   - Complete analysis of local tokens
   - Comparison methodology
   - Action items and recommendations

2. **`Figma_Token_Comparison_Report.md`** - Detailed token comparison
   - Token-by-token breakdown
   - Authentication requirements
   - Expected vs. actual tokens

### Comparison Tools

3. **`compare_tokens.js`** - Automated comparison script
   ```bash
   # Usage with token
   node compare_tokens.js --token YOUR_FIGMA_TOKEN
   
   # Or set environment variable
   export FIGMA_TOKEN=your_token
   node compare_tokens.js
   ```

4. **`figma-token-comparison-report.json`** - Machine-readable results
   - JSON format for automation
   - Timestamp and findings

### Figma Plugin Scripts

5. **`get_vars.js`** - Extract all Figma variables
6. **`find_token_nodes.js`** - Locate token-related nodes
7. **`get_all_variables.js`** - Get variable collections
8. **`full_audit.js`** - Complete design system audit

## Current Status

🔴 **Authentication Required**

The comparison could not be completed due to expired Figma credentials.

### What We Know

✅ **Local tokens (`src/tokens/tokens.json`)**
- 79 tokens across 9 categories
- Complete color system (brand, neutral, semantic)
- Typography scale (9 sizes, 4 weights)
- Spacing system (4px base)
- Border radius tokens

❌ **Figma tokens**
- Cannot verify without authentication
- File exists: https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System

## To Complete the Comparison

### Step 1: Get Figma Token

1. Go to https://www.figma.com/settings
2. Navigate to Security → Personal access tokens
3. Generate new token with "file_content:read" scope

### Step 2: Run Comparison

```bash
# Option A: Use token flag
node compare_tokens.js --token YOUR_TOKEN

# Option B: Use environment variable
export FIGMA_TOKEN=YOUR_TOKEN
node compare_tokens.js
```

### Step 3: Review Results

- Check console output for discrepancies
- Review `figma-token-comparison-report.json`
- Update tokens as needed

## Expected Token Categories

Based on local tokens, Figma should contain:

| Category | Count | Purpose |
|----------|-------|---------|
| Colors | 28 | Brand, neutral, semantic colors |
| Font Sizes | 9 | Typography scale |
| Font Weights | 4 | Text weights |
| Line Heights | 4 | Line spacing |
| Letter Spacing | 5 | Character spacing |
| Spacing | 13 | Layout spacing |
| Border Radius | 6 | Corner radius |

## Troubleshooting

### "Invalid token" error
- Token may be expired
- Generate new token from Figma settings
- Ensure token has correct permissions

### "File not found" error
- Verify file key in URL
- Check file permissions
- Ensure you have access to the file

### No variables found
- Variables may not be defined in Figma
- Check if using correct file (published library)
- Verify Figma file structure

## Architecture

### Project Structure

```
sitka-app/
├── src/
│   └── tokens/
│       └── tokens.json          # Local design tokens
├── compare_tokens.js             # Comparison script
├── figma-token-comparison-report.json  # Latest results
├── Figma_Token_Comparison_Report.md    # Detailed analysis
├── FIGMA_TOKEN_COMPARISON_SUMMARY.md   # Executive summary
└── README_FIGMA_COMPARISON.md          # This file
```

### Configuration

- **MCP Server**: https://mcp.figma.com/mcp (configured in `kilo.json`)
- **Token Storage**: `~/.gemini/mcp-oauth-tokens.json` (expired)
- **File Key**: `kMO3RdXXNoZrpHh24hQTl1`

## Next Steps

1. **Immediate**: Generate Figma token and run comparison
2. **Short-term**: Resolve any token discrepancies
3. **Long-term**: Set up automated sync/validation

## Support

For Figma authentication help:
- [Personal Access Tokens](https://www.figma.com/settings)
- [REST API Docs](https://developers.figma.com/docs/rest-api/)
- [MCP Server Docs](https://developers.figma.com/docs/figma-mcp-server/)

## Maintenance

### Regular Checks
- Run comparison monthly
- Review token drift
- Update Figma/local tokens as needed

### Version Control
- Keep token files in git
- Document changes
- Use PR reviews for token updates

---

**Last Updated**: 2026-05-01  
**Status**: 🔴 Authentication Required  
**Priority**: High (blocks design system validation)
