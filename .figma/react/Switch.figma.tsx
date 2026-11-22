// Figma: Components › Switch (25:246). Sticker sheet without properties; add Size and On
// properties in Figma to map them to size and checked.
import figma from "@figma/code-connect";
import { Switch } from "../../src/components/ui/Switch";

figma.connect(Switch, "https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=25-246", {
  example: () => <Switch size="md" label="Notifications" />,
});
