// Figma: Components V2 › button (37:668). Property names verified against the file on 2026-11-21.
// "Property 3" (light/dark/both) is a canvas preview axis; Sitka themes via tokens, so it isn't mapped.
import figma from "@figma/code-connect";
import { Button } from "../../src/components/ui/Button";

figma.connect(Button, "https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=37-668", {
  props: {
    size: figma.enum("Property 1", { small: "sm", medium: "md", large: "lg", icon: "icon" }),
    variant: figma.enum("Property 2", {
      primary: "primary",
      secondary: "secondary",
      ghost: "ghost",
      danger: "danger",
      glass: "glass",
    }),
    label: figma.textContent("Button"),
  },
  example: ({ size, variant, label }) => (
    <Button variant={variant} size={size}>
      {label}
    </Button>
  ),
});
