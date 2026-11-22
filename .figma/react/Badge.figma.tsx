// Figma: Components V2 › badges (37:912). "Property 2" mixes size and the dot style, so it feeds two props.
import figma from "@figma/code-connect";
import { Badge } from "../../src/components/ui/Badge";

figma.connect(Badge, "https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=37-912", {
  props: {
    variant: figma.enum("Property 1", {
      default: "default",
      primary: "primary",
      success: "success",
      warning: "warning",
      danger: "danger",
      ghost: "ghost",
    }),
    size: figma.enum("Property 2", { sm: "sm", md: "md", lg: "lg", dot: "md" }),
    dot: figma.enum("Property 2", { dot: true }),
  },
  example: ({ variant, size, dot }) => (
    <Badge variant={variant} size={size} dot={dot}>
      Label
    </Badge>
  ),
});
