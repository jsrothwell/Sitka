"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { RadioGroup, Radio } from "@/components/ui/Radio";
import { Button } from "@/components/ui/Button";
import { Check, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";

/* ── Single-page form with sections ────────────────────── */

export function CreateProjectForm() {
  const [name, setName]           = useState("");
  const [nameError, setNameError] = useState("");
  const [desc, setDesc]           = useState("");
  const [visibility, setVisibility] = useState("private");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);

  function validateName(v: string) {
    if (!v.trim()) return "Project name is required.";
    if (v.trim().length < 3) return "Must be at least 3 characters.";
    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validateName(name);
    if (err) { setNameError(err); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
        <div className="w-12 h-12 rounded-full bg-[rgb(var(--accent-subtle))] flex items-center justify-center">
          <Check className="w-6 h-6 text-[rgb(var(--accent))]" />
        </div>
        <div>
          <p className="text-[16px] font-semibold text-[rgb(var(--text-primary))]">Project created!</p>
          <p className="text-[13px] text-[rgb(var(--text-secondary))] mt-1">
            <span className="font-medium text-[rgb(var(--text-primary))]">{name}</span> is ready to go.
          </p>
        </div>
        <button
          onClick={() => { setSuccess(false); setName(""); setDesc(""); }}
          className="text-[12px] text-[rgb(var(--accent))] hover:underline mt-1"
        >
          Create another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Section: Basic info */}
      <fieldset className="space-y-4">
        <legend className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3 block">
          Basic info
        </legend>

        <Input
          label="Project name"
          placeholder="e.g. Design System v2"
          value={name}
          onChange={(e) => { setName(e.target.value); if (nameError) setNameError(""); }}
          onBlur={() => setNameError(validateName(name))}
          error={nameError}
          required
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-[rgb(var(--text-secondary))]">Description</label>
          <textarea
            rows={3}
            placeholder="What is this project for?"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className={cn(
              "w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",
              "px-3 py-2 text-[13px] text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-tertiary))]",
              "outline-none focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20",
              "resize-none transition-colors"
            )}
          />
        </div>
      </fieldset>

      <div className="border-t border-[rgb(var(--border-subtle))]" />

      {/* Section: Visibility */}
      <fieldset className="space-y-3">
        <legend className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3 block">
          Visibility
        </legend>
        <RadioGroup
          value={visibility}
          onChange={(v) => setVisibility(v)}
          name="visibility"
        >
          {[
            { value: "private", label: "Private",  helper: "Only you can see this project" },
            { value: "team",    label: "Team",      helper: "All team members can view and edit" },
            { value: "public",  label: "Public",    helper: "Anyone with the link can view" },
          ].map(({ value, label, helper }) => (
            <Radio key={value} value={value} label={label} helperText={helper} />
          ))}
        </RadioGroup>
      </fieldset>

      <div className="border-t border-[rgb(var(--border-subtle))]" />

      {/* Section: Notifications */}
      <fieldset className="space-y-3">
        <legend className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-3 block">
          Notifications
        </legend>
        <div className="space-y-3">
          <Switch
            label="Email alerts"
            helperText="Get notified about activity in this project"
            checked={emailAlerts}
            onChange={(e) => setEmailAlerts(e.target.checked)}
          />
          <Switch
            label="Weekly digest"
            helperText="A summary of activity every Monday morning"
            checked={weeklyDigest}
            onChange={(e) => setWeeklyDigest(e.target.checked)}
          />
        </div>
      </fieldset>

      {/* Submit */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-[11px] text-[rgb(var(--text-tertiary))]">
          {visibility === "public" && (
            <span className="flex items-center gap-1 text-amber-400">
              <AlertCircle className="w-3 h-3" />
              Public projects are visible to anyone.
            </span>
          )}
        </p>
        <Button type="submit" variant="primary" size="md" loading={loading}>
          {loading ? "Creating…" : "Create project"}
        </Button>
      </div>
    </form>
  );
}

/* ── Multi-step form ────────────────────────────────────── */

const STEPS = ["Account", "Profile", "Review"];

type FormData = {
  email: string;
  password: string;
  name: string;
  role: string;
};

export function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({ email: "", password: "", name: "", role: "designer" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function patch(key: keyof FormData, val: string) {
    setData((d) => ({ ...d, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validateStep(): boolean {
    const errs: Partial<FormData> = {};
    if (step === 0) {
      if (!data.email.includes("@")) errs.email = "Enter a valid email.";
      if (data.password.length < 6) errs.password = "At least 6 characters.";
    }
    if (step === 1) {
      if (!data.name.trim()) errs.name = "Name is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function next() { if (validateStep()) setStep((s) => s + 1); }
  function back() { setStep((s) => s - 1); }

  async function submit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
        <div className="w-12 h-12 rounded-full bg-[rgb(var(--accent-subtle))] flex items-center justify-center">
          <Check className="w-6 h-6 text-[rgb(var(--accent))]" />
        </div>
        <div>
          <p className="text-[16px] font-semibold text-[rgb(var(--text-primary))]">Account created!</p>
          <p className="text-[13px] text-[rgb(var(--text-secondary))] mt-1">Welcome, {data.name}.</p>
        </div>
        <button onClick={() => { setDone(false); setStep(0); setData({ email: "", password: "", name: "", role: "designer" }); }}
          className="text-[12px] text-[rgb(var(--accent))] hover:underline mt-1">
          Start over
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-0">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold transition-colors",
                i < step  ? "bg-[rgb(var(--accent))] text-white" :
                i === step ? "bg-[rgb(var(--accent))] text-white ring-4 ring-[rgb(var(--accent))]/20" :
                             "bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-tertiary))] border border-[rgb(var(--border))]"
              )}>
                {i < step ? <Check className="w-3 h-3" /> : i + 1}
              </div>
              <span className={cn(
                "text-[12px] font-medium hidden sm:block",
                i === step ? "text-[rgb(var(--text-primary))]" : "text-[rgb(var(--text-tertiary))]"
              )}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn("flex-1 h-px mx-3", i < step ? "bg-[rgb(var(--accent))]" : "bg-[rgb(var(--border))]")} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      {step === 0 && (
        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={data.email}
            onChange={(e) => patch("email", e.target.value)}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="At least 6 characters"
            value={data.password}
            onChange={(e) => patch("password", e.target.value)}
            error={errors.password}
          />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <Input
            label="Full name"
            placeholder="Jane Smith"
            value={data.name}
            onChange={(e) => patch("name", e.target.value)}
            error={errors.name}
          />
          <RadioGroup value={data.role} onChange={(v) => patch("role", v)} name="role" label="Role">
            {[
              { value: "designer",  label: "Designer" },
              { value: "engineer",  label: "Engineer" },
              { value: "pm",        label: "Product Manager" },
            ].map(({ value, label }) => (
              <Radio key={value} value={value} label={label} />
            ))}
          </RadioGroup>
        </div>
      )}

      {step === 2 && (
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] divide-y divide-[rgb(var(--border-subtle))]">
          {[
            ["Email",    data.email],
            ["Name",     data.name],
            ["Role",     data.role.charAt(0).toUpperCase() + data.role.slice(1)],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between px-4 py-3">
              <span className="text-[12px] text-[rgb(var(--text-tertiary))]">{label}</span>
              <span className="text-[13px] font-medium text-[rgb(var(--text-primary))]">{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {step > 0 ? (
          <Button variant="ghost" size="sm" leftIcon={<ChevronLeft className="w-4 h-4" />} onClick={back}>
            Back
          </Button>
        ) : <div />}

        {step < STEPS.length - 1 ? (
          <Button variant="primary" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />} onClick={next}>
            Continue
          </Button>
        ) : (
          <Button variant="primary" size="sm" loading={loading} onClick={submit}>
            {loading ? "Creating account…" : "Create account"}
          </Button>
        )}
      </div>
    </div>
  );
}
