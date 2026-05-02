import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { ValidationDemo } from "@/components/docs/FormValidationDemo";

export const metadata: Metadata = { title: "Form Validation" };

const CODE = {
  react: {
    filename: "ValidationDemo.tsx",
    code: `import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AlertCircle, Check } from "lucide-react";
import { cn } from "@/lib/cn";

function isValidEmail(v: string) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v);
}

function getPasswordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8)      score++;
  if (/[A-Z]/.test(pw))    score++;
  if (/[0-9]/.test(pw))    score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: "Weak",   color: "bg-red-500" };
  if (score <= 2) return { score, label: "Fair",   color: "bg-amber-500" };
  return            { score, label: "Strong", color: "bg-green-500" };
}

export function SignUpForm() {
  const [email, setEmail]           = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword]     = useState("");

  const strength = getPasswordStrength(password);

  // Validate on blur — not on every keystroke
  function handleEmailBlur() {
    if (!email)               return setEmailError("Email is required.");
    if (!isValidEmail(email)) return setEmailError("Enter a valid email address.");
    setEmailError("");
    setEmailValid(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Final validation on submit
    if (!isValidEmail(email)) return setEmailError("Enter a valid email address.");
    if (strength.score < 2) return; // show inline strength meter
    // proceed...
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 max-w-sm">
      {/* Email with on-blur validation */}
      <div className="space-y-1">
        <label className="block text-[12px] font-medium text-text-secondary">Email</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
          onBlur={handleEmailBlur}
          placeholder="you@example.com"
          error={emailError || undefined}
          rightIcon={emailValid ? <Check className="w-4 h-4 text-green-400" /> : undefined}
        />
        {emailError && (
          <p className="flex items-center gap-1 text-[11px] text-red-400">
            <AlertCircle className="w-3 h-3" /> {emailError}
          </p>
        )}
      </div>

      {/* Password with strength meter */}
      <div className="space-y-1">
        <label className="block text-[12px] font-medium text-text-secondary">Password</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
        />
        {password && (
          <div className="space-y-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    i <= strength.score ? strength.color : "bg-border"
                  )}
                />
              ))}
            </div>
            <p className="text-[11px] font-medium">{strength.label}</p>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full">Create account</Button>
    </form>
  );
}`,
  },
  html: {
    filename: "validation.html",
    code: `<form id="signUpForm" novalidate>
  <div class="field">
    <label class="field-label" for="email">Email</label>
    <div class="input-wrap">
      <input class="input" id="email" type="email" placeholder="you@example.com" />
      <span class="input-icon valid-icon" id="emailValidIcon" hidden>✓</span>
    </div>
    <p class="field-error" id="emailError" hidden></p>
  </div>

  <div class="field">
    <label class="field-label" for="password">Password</label>
    <input class="input" id="password" type="password" placeholder="Create a password" />
    <div class="strength-meter" id="strengthMeter" hidden>
      <div class="strength-bars">
        <div class="bar" id="bar1"></div>
        <div class="bar" id="bar2"></div>
        <div class="bar" id="bar3"></div>
        <div class="bar" id="bar4"></div>
      </div>
      <p class="strength-label" id="strengthLabel"></p>
    </div>
  </div>

  <button class="btn btn-primary btn-full" type="submit">Create account</button>
</form>

<style>
  .field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 16px; }
  .field-label { font-size: 12px; font-weight: 500; color: rgb(var(--text-secondary)); }
  .field-error  { font-size: 11px; color: #f87171; }
  .input-wrap   { position: relative; }
  .input-error  { border-color: #f87171 !important; }
  .valid-icon   { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: #4ade80; }
  .strength-bars { display: flex; gap: 4px; margin-top: 4px; }
  .bar { flex: 1; height: 4px; border-radius: 9999px; background: rgb(var(--border)); transition: background 200ms; }
  .bar.weak   { background: #f87171; }
  .bar.fair   { background: #fbbf24; }
  .bar.strong { background: #4ade80; }
  .strength-label { font-size: 11px; font-weight: 500; margin-top: 2px; }
</style>

<script>
  function isValidEmail(v) { return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v); }

  function getStrength(pw) {
    let s = 0;
    if (pw.length >= 8)       s++;
    if (/[A-Z]/.test(pw))     s++;
    if (/[0-9]/.test(pw))     s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  }

  const emailEl    = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const validIcon  = document.getElementById("emailValidIcon");
  const pwEl       = document.getElementById("password");
  const meter      = document.getElementById("strengthMeter");
  const bars       = [1,2,3,4].map(i => document.getElementById("bar"+i));
  const strengthLbl = document.getElementById("strengthLabel");

  emailEl.addEventListener("blur", () => {
    if (!emailEl.value) {
      showError("Email is required.");
    } else if (!isValidEmail(emailEl.value)) {
      showError("Enter a valid email address.");
    } else {
      clearError(); validIcon.hidden = false;
    }
  });

  function showError(msg) { emailError.textContent = msg; emailError.hidden = false; emailEl.classList.add("input-error"); validIcon.hidden = true; }
  function clearError()   { emailError.hidden = true; emailEl.classList.remove("input-error"); }

  pwEl.addEventListener("input", () => {
    if (!pwEl.value) { meter.hidden = true; return; }
    meter.hidden = false;
    const s = getStrength(pwEl.value);
    const cls  = s <= 1 ? "weak" : s <= 2 ? "fair" : "strong";
    const lbl  = s <= 1 ? "Weak" : s <= 2 ? "Fair" : "Strong";
    bars.forEach((b, i) => { b.className = "bar" + (i < s ? " " + cls : ""); });
    strengthLbl.textContent = lbl;
  });
</script>`,
  },
  swift: {
    filename: "FormValidation.swift",
    code: `import SwiftUI

struct SignUpView: View {
    @State private var email     = ""
    @State private var password  = ""
    @State private var emailError: String?
    @FocusState private var emailFocused: Bool

    var passwordStrength: (score: Int, label: String) {
        var s = 0
        if password.count >= 8          { s += 1 }
        if password.range(of: "[A-Z]", options: .regularExpression) != nil { s += 1 }
        if password.range(of: "[0-9]",  options: .regularExpression) != nil { s += 1 }
        if password.range(of: "[^A-Za-z0-9]", options: .regularExpression) != nil { s += 1 }
        let label = s <= 1 ? "Weak" : s <= 2 ? "Fair" : "Strong"
        return (s, label)
    }

    func validateEmail() {
        let pattern = #"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"#
        if email.isEmpty {
            emailError = "Email is required."
        } else if email.range(of: pattern, options: .regularExpression) == nil {
            emailError = "Enter a valid email address."
        } else {
            emailError = nil
        }
    }

    var body: some View {
        Form {
            // Email with on-blur validation
            Section {
                VStack(alignment: .leading, spacing: 4) {
                    TextField("Email", text: $email)
                        .keyboardType(.emailAddress)
                        .autocapitalization(.none)
                        .focused($emailFocused)
                        .onChange(of: emailFocused) { _, focused in
                            if !focused { validateEmail() }
                        }
                    if let error = emailError {
                        Label(error, systemImage: "exclamationmark.circle.fill")
                            .font(.caption)
                            .foregroundStyle(.red)
                    }
                }
            }

            // Password with strength meter
            Section {
                SecureField("Password", text: $password)
                if !password.isEmpty {
                    PasswordStrengthView(score: passwordStrength.score, label: passwordStrength.label)
                }
            }

            Section {
                Button("Create account") { /* submit */ }
            }
        }
    }
}

struct PasswordStrengthView: View {
    let score: Int
    let label: String

    var color: Color { score <= 1 ? .red : score <= 2 ? .orange : .green }

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack(spacing: 4) {
                ForEach(1...4, id: \\.self) { i in
                    RoundedRectangle(cornerRadius: 2)
                        .fill(i <= score ? color : Color.secondary.opacity(0.2))
                        .frame(height: 4)
                }
            }
            Text(label).font(.caption).foregroundStyle(color)
        }
    }
}`,
  },
};

export default function FormValidationPage() {
  return (
    <div>
      <PageHeader
        title="Form Validation"
        description="Patterns for surfacing errors and confirmations in forms. Validate on blur, not on every keystroke — give users room to type before judging. Show errors inline, close to the field, using plain language."
      />

      {/* Demo */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))] mb-4">
          Preview
        </h2>
        <ComponentPreview>
          <ValidationDemo />
        </ComponentPreview>
        <p className="text-[12px] text-[rgb(var(--text-tertiary))] mt-3">
          Tab away from the email field to trigger on-blur validation. Type in the password field to see the strength meter. Submit with an invalid state to see submit-time errors.
        </p>
      </section>

      {/* Timing table */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">When to validate</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["Trigger", "Use for", "Avoid"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { trigger: "On blur (focus leave)", use: "Email, URL, date, any field where the full value matters", avoid: "Password strength — show that eagerly after the first character" },
                { trigger: "On input (keystroke)", use: "Password strength meter, character counter, live search", avoid: "Error messages — premature errors on partial input are frustrating" },
                { trigger: "On submit", use: "Final gate; catches any field the user skipped", avoid: "As the only validation trigger — users have already committed before they see errors" },
                { trigger: "Server-side async", use: "Unique username/email check, promo code validation", avoid: "Firing too eagerly; debounce by ≥ 400 ms and only trigger after on-blur" },
              ].map((row, i) => (
                <tr key={row.trigger} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))] whitespace-nowrap">{row.trigger}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{row.use}</td>
                  <td className="px-4 py-3 text-[rgb(var(--text-tertiary))]">{row.avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Error message guidance */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Error message guidance</h2>
        <ul className="space-y-4 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            { title: "Be specific", body: "\"Enter a valid email address\" is better than \"Invalid input\". Tell the user exactly what's wrong and how to fix it." },
            { title: "Plain language, no jargon", body: "Avoid \"regex mismatch\", \"null value\", or HTTP status codes. Write as if speaking to the user directly: \"Email can't be blank.\"" },
            { title: "Inline, not modal", body: "Show errors close to the field they describe, not in a dialog or at the top of the page. Users shouldn't have to hunt for which field failed." },
            { title: "Don't clear errors on focus", body: "Clear the error when the user starts correcting the value (on input), not when they simply focus the field. Premature clearing makes users wonder if they've already fixed it." },
            { title: "Pair errors with positive states", body: "When a field is valid, show a green check (or similar). This confirms to the user that this field is done — they don't need to guess." },
          ].map(({ title, body }) => (
            <li key={title} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 flex-shrink-0">→</span>
              <span><strong className="text-[rgb(var(--text-primary))]">{title}.</strong> {body}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Implementation */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Implementation</h2>
        <PlatformTabs code={CODE} />
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Accessibility</h2>
        <ul className="space-y-2 text-[14px] text-[rgb(var(--text-secondary))]">
          {[
            "Link error messages to their inputs with aria-describedby so screen readers announce the error when the field receives focus.",
            "Mark invalid fields with aria-invalid=\"true\" when they have an error. Remove the attribute (or set to false) once the error is cleared.",
            "On submit failure, move focus to the first invalid field. Don't leave focus on the submit button — users with screen readers may not discover which field failed.",
            "Never rely on color alone to communicate an error. Pair the red color with an icon (AlertCircle) and text so colorblind users can identify the error state.",
            "The password strength meter should have an aria-live=\"polite\" region so the label (Weak/Fair/Strong) is announced as the user types.",
            "noValidate on the <form> element disables browser-native validation bubbles in favor of your custom inline errors. Do this whenever you implement custom validation.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[rgb(var(--accent))] mt-0.5 flex-shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
