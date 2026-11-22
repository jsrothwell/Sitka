# @sitka/mcp

An MCP server that gives coding agents what they need to build with Sitka correctly: the component list and props, the design tokens, the docs index and a WCAG contrast check. It has no dependencies.

| Tool | What it returns |
|---|---|
| `list_components` | Every `sitka-ui` React component with its import line |
| `get_component` | One component's props and types, tokens used, docs and Figma links |
| `get_tokens` | Tokens under a path (`color.themes.dark`, `spacing`, `motion.duration`) with references resolved |
| `search_docs` | Matching docs pages from `llms.txt`, with URLs |
| `check_contrast` | Contrast ratio between two colours or theme tokens, with AA/AAA results |

## Use it

Inside this repo, Claude Code picks it up from `.mcp.json`. Elsewhere, point your client at the server:

```json
{
  "mcpServers": {
    "sitka": { "command": "node", "args": ["/path/to/Sitka/packages/mcp/server.mjs"] }
  }
}
```

It reads from the Sitka checkout it lives in. Set `SITKA_ROOT` to use another checkout. Without a checkout it fetches the published files from `SITKA_URL` (default `https://jsrothwell.github.io/Sitka`).
