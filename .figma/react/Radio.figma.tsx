// Figma: Components › Radio (63:119). Radios are used inside a RadioGroup in product code.
import figma from "@figma/code-connect";
import { Radio } from "../../src/components/ui/Radio";

figma.connect(Radio, "https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=63-119", {
  props: {
    size: figma.enum("Size", { sm: "sm", md: "md", lg: "lg" }),
    checked: figma.enum("State", { Selected: true }),
    label: figma.textContent("Option"),
  },
  example: ({ size, checked, label }) => (
    <Radio name="choice" value="option" size={size} checked={checked} label={label} onChange={() => {}} />
  ),
});
