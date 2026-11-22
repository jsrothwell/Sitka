// Figma: Components › Select (65:109). Focus is an interaction state, so only Error maps to a prop.
import figma from "@figma/code-connect";
import { Select } from "../../src/components/ui/Select";

figma.connect(Select, "https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=65-109", {
  props: {
    size: figma.enum("Size", { sm: "sm", md: "md", lg: "lg" }),
    error: figma.enum("State", { Error: "Required field" }),
    label: figma.textContent("Label"),
    placeholder: figma.textContent("Choose option"),
  },
  example: ({ size, error, label, placeholder }) => (
    <Select size={size} error={error} label={label} placeholder={placeholder}>
      <option value="a">Option A</option>
      <option value="b">Option B</option>
    </Select>
  ),
});
