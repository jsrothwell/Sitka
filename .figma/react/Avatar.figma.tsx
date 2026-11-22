// Figma: Components V2 › Avatar (37:1223).
import figma from "@figma/code-connect";
import { Avatar } from "../../src/components/ui/Avatar";

figma.connect(Avatar, "https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=37-1223", {
  props: {
    size: figma.enum("Property 1", { xs: "xs", sm: "sm", md: "md", lg: "lg", xl: "xl" }),
    initials: figma.textContent("JR"),
  },
  example: ({ size, initials }) => <Avatar size={size} initials={initials} status="online" />,
});
