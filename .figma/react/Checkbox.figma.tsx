// Figma: Components › Checkbox (63:97).
import figma from "@figma/code-connect";
import { Checkbox } from "../../src/components/ui/Checkbox";

figma.connect(Checkbox, "https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=63-97", {
  props: {
    size: figma.enum("Size", { sm: "sm", md: "md", lg: "lg" }),
    checked: figma.enum("State", { Checked: true, Indeterminate: true }),
    indeterminate: figma.enum("State", { Indeterminate: true }),
    label: figma.textContent("Label"),
  },
  example: ({ size, checked, indeterminate, label }) => (
    <Checkbox size={size} checked={checked} indeterminate={indeterminate} label={label} onChange={() => {}} />
  ),
});
