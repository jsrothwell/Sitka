# sitka-ui

React component library for the Sitka Design System.

## Install

```bash
npm install sitka-ui
# or
pnpm add sitka-ui
```

## Usage

```tsx
import { Button, Card, Modal } from "sitka-ui";

export function MyComponent() {
  return (
    <Card>
      <Button variant="primary">Get started</Button>
    </Card>
  );
}
```

## Design Tokens

```ts
import tokens from "sitka-ui/tokens";
// tokens.color.brand, tokens.spacing, etc.
```

## CLI Alternative

If you prefer copying components directly into your project:

```bash
npx @sitka/cli add button
npx @sitka/cli add modal
```

## Documentation

Full component docs and guidelines are in the design system.

## License

MIT
