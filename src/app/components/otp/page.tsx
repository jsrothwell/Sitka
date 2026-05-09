import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { PropsTable } from "@/components/docs/PropsTable";
import { OTPDemo } from "./OTPDemo";

export const metadata: Metadata = { title: "OTP / PIN Input" };

const PROPS = [
  { name: "length", type: "number", default: "6", description: "Number of input boxes." },
  { name: "onComplete", type: "(value: string) => void", description: "Called when all digits are filled." },
  { name: "type", type: '"numeric" | "alphanumeric"', default: '"numeric"', description: "Input mode and validation." },
  { name: "mask", type: "boolean", default: "false", description: "If true, shows bullets instead of digits." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables all inputs." },
  { name: "error", type: "string", description: "Error message shown below input." },
  { name: "autoFocus", type: "boolean", default: "false", description: "Focus first input on mount." },
];

export default function OTPInputPage() {
  return (
    <div>
      <PageHeader
        title="OTP / PIN Input"
        description="Six-digit one-time passcode entry with auto-focus, auto-advance, backspace navigation, and paste support. For PINs, enable masking to show bullets."
      />

      <OTPDemo />

      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Behavior notes</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Auto-advances focus to next box after digit entry.",
            "Backspace moves focus to previous box if current is empty.",
            "Paste support: pasting '123456' fills all boxes automatically.",
            "autoComplete='one-time-code' triggers SMS autofill on iOS/Android.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
