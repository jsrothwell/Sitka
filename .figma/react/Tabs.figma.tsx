// Figma: Components › Tabs (25:352). Sticker sheet without properties; the example mirrors its tabs.
import figma from "@figma/code-connect";
import { Tabs } from "../../src/components/ui/Tabs";

figma.connect(Tabs, "https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=25-352", {
  example: () => (
    <Tabs
      tabs={[
        { id: "overview", label: "Overview" },
        { id: "usage", label: "Usage" },
        { id: "api", label: "API", badge: "New" },
        { id: "changelog", label: "Changelog" },
      ]}
    >
      {(activeId) => <div>{activeId}</div>}
    </Tabs>
  ),
});
