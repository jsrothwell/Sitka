# Code Connect

Links components in the Sitka Figma file (`kMO3RdXXNoZrpHh24hQTl1`) to code, so Dev Mode
and agents using the Figma MCP server show real Sitka code instead of generated CSS.

| Folder | Label | What it shows |
|---|---|---|
| `react/` | React | `import { … } from 'sitka-ui'` with props mapped from Figma variants |
| `swiftui/` | SwiftUI | Native SwiftUI styled with the `SitkaTokens` Swift package |
| `unverified/` | — | Older mappings whose node IDs or property names don't match the file. Not published. |

Mapped (the 11 most-imported components): Button, Input, Badge, Checkbox, Radio, Select,
Avatar, CodeBlock, Card, Tabs, Switch. Node IDs and property names were checked against the
live file on 2026-11-21.

## Commands

```bash
npm run figma:parse      # validate locally, no token needed
FIGMA_ACCESS_TOKEN=… npm run figma:publish   # needs a Dev Mode or Full seat with Code Connect access
```

## Known gaps in the Figma file

- Card, Tabs and Switch are sticker sheets without component properties, so their mappings
  show one fixed example. Give them real variant properties (Variant, Size, On) to map props.
- Button, Badge, Input and Avatar use generic names ("Property 1/2/3"). Renaming them to
  Variant/Size/Theme in Figma means updating the strings in both folders.
- To move a component from `unverified/` to `react/`, check its node and properties with
  the Figma MCP `get_context_for_code_connect` tool first.
