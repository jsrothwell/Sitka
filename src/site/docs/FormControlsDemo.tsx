"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Radio, RadioGroup } from "@/components/ui/Radio";
import { Switch } from "@/components/ui/Switch";
import { Select } from "@/components/ui/Select";

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  const [partial, setPartial] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <Checkbox label="Unselected" />
      <Checkbox label="Selected" checked onChange={() => {}} />
      <Checkbox label="Indeterminate" indeterminate checked={false} onChange={() => {}} />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled checked onChange={() => {}} />
    </div>
  );
}

export function CheckboxGroupDemo() {
  const [values, setValues] = useState({ analytics: true, notifications: false, marketing: false });

  const toggle = (key: keyof typeof values) =>
    setValues((v) => ({ ...v, [key]: !v[key] }));

  const allChecked = Object.values(values).every(Boolean);
  const someChecked = Object.values(values).some(Boolean) && !allChecked;

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="Select all"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={() => setValues({ analytics: !allChecked, notifications: !allChecked, marketing: !allChecked })}
      />
      <div className="pl-5 flex flex-col gap-3 border-l border-[rgb(var(--border))]">
        <Checkbox label="Analytics" checked={values.analytics} onChange={() => toggle("analytics")} />
        <Checkbox label="Notifications" checked={values.notifications} onChange={() => toggle("notifications")} />
        <Checkbox label="Marketing emails" checked={values.marketing} onChange={() => toggle("marketing")}
          helperText="Receive product updates and promotions" />
      </div>
    </div>
  );
}

export function RadioDemo() {
  const [plan, setPlan] = useState("pro");

  return (
    <RadioGroup name="plan" value={plan} onChange={setPlan} label="Billing plan">
      <Radio value="starter" label="Starter" helperText="Up to 3 projects, 1 GB storage" />
      <Radio value="pro" label="Pro" helperText="Unlimited projects, 50 GB storage" />
      <Radio value="enterprise" label="Enterprise" helperText="Custom limits, SSO, dedicated support" />
    </RadioGroup>
  );
}

export function SwitchDemo() {
  const [states, setStates] = useState({
    notifications: true,
    marketing: false,
    twoFactor: false,
  });

  const toggle = (key: keyof typeof states) =>
    setStates((v) => ({ ...v, [key]: !v[key] }));

  return (
    <div className="flex flex-col gap-4">
      <Switch
        label="Push notifications"
        checked={states.notifications}
        onChange={() => toggle("notifications")}
      />
      <Switch
        label="Marketing emails"
        checked={states.marketing}
        onChange={() => toggle("marketing")}
      />
      <Switch
        label="Two-factor authentication"
        checked={states.twoFactor}
        onChange={() => toggle("twoFactor")}
      />
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled checked onChange={() => {}} />
    </div>
  );
}

export function SelectDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <Select label="Framework" placeholder="Choose a framework">
        <option value="next">Next.js</option>
        <option value="remix">Remix</option>
        <option value="astro">Astro</option>
        <option value="sveltekit">SvelteKit</option>
      </Select>
      <Select label="Region" defaultValue="us-east">
        <option value="us-east">US East (N. Virginia)</option>
        <option value="us-west">US West (Oregon)</option>
        <option value="eu-west">EU West (Ireland)</option>
        <option value="ap-south">AP South (Mumbai)</option>
      </Select>
      <Select label="Error state" error="Please select a valid option" placeholder="Choose…" />
    </div>
  );
}
