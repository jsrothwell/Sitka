// Figma: Inputs › input (37:1498). "Property 2" (light/dark) is a preview axis and isn't mapped.
import figma from "@figma/code-connect";
import { Input } from "../../src/components/ui/Input";

figma.connect(Input, "https://www.figma.com/design/kMO3RdXXNoZrpHh24hQTl1/Sitka-Design-System?node-id=37-1498", {
  props: {
    type: figma.enum("Property 1", { email: "email", search: "search", password: "password" }),
    label: figma.enum("Property 1", { email: "Email", search: "Search", password: "Password" }),
    placeholder: figma.enum("Property 1", { email: "you@example.com", search: "Search components…" }),
    inputSize: figma.enum("Property 3", { small: "sm", medium: "md", large: "lg" }),
  },
  example: ({ type, label, placeholder, inputSize }) => (
    <Input type={type} label={label} placeholder={placeholder} inputSize={inputSize} />
  ),
});
