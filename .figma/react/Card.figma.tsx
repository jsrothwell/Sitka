// Figma: Components › Card (25:273). The Figma component is a sticker sheet with no variant
// properties yet, so this shows the default card. Add a "Variant" property in Figma
// (default/elevated/ghost/accent) to map it to the variant prop.
import figma from "@figma/code-connect";
import { Card, CardBody, CardHeader } from "../../src/components/ui/Card";

figma.connect(Card, "https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=25-273", {
  example: () => (
    <Card variant="default">
      <CardHeader>Card title</CardHeader>
      <CardBody>Card body content goes here.</CardBody>
    </Card>
  ),
});
