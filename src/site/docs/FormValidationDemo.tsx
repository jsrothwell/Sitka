"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Check, AlertCircle, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib";

function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8)  score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: "Weak",   color: "bg-red-500" };
  if (score <= 2) return { score, label: "Fair",   color: "bg-amber-500" };
  return            { score, label: "Strong", color: "bg-green-500" };
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function ValidationDemo() {
  const [email, setEmail]             = useState("");
  const [emailError, setEmailError]   = useState("");
  const [emailValid, setEmailValid]   = useState(false);

  const [password, setPassword]       = useState("");
  const [showPw, setShowPw]           = useState(false);

  const [submitted, setSubmitted]     = useState(false);
  const [loading, setLoading]         = useState(false);
  const [success, setSuccess]         = useState(false);

  const strength = getPasswordStrength(password);

  function handleEmailBlur() {
    if (!email) {
      setEmailError("Email is required.");
      setEmailValid(false);
    } else if (!isValidEmail(email)) {
      setEmailError("Enter a valid email address.");
      setEmailValid(false);
    } else {
      setEmailError("");
      setEmailValid(true);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    let hasError = false;
    if (!email || !isValidEmail(email)) {
      setEmailError("Enter a valid email address.");
      setEmailValid(false);
      hasError = true;
    }
    if (!password || strength.score < 2) hasError = true;
    if (hasError) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-center max-w-sm mx-auto">
        <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center">
          <Check className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <p className="text-[16px] font-semibold text-[rgb(var(--text-primary))]">Account created</p>
          <p className="text-[13px] text-[rgb(var(--text-secondary))] mt-1">Welcome aboard!</p>
        </div>
        <Button variant="secondary" onClick={() => { setSuccess(false); setEmail(""); setPassword(""); setSubmitted(false); setEmailValid(false); setEmailError(""); }}>
          Reset demo
        </Button>
      </div>
    );
  }

  const pwTooWeak = submitted && password && strength.score < 2;
  const pwEmpty   = submitted && !password;

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-sm mx-auto space-y-4">
      {/* Email */}
      <div className="space-y-1">
        <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))]">
          Email address
        </label>
        <div className="relative">
          <Input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(""); if (emailValid) setEmailValid(false); }}
            onBlur={handleEmailBlur}
            placeholder="you@example.com"
            error={emailError || undefined}
            rightIcon={emailValid ? <Check className="w-4 h-4 text-green-400" /> : undefined}
          />
        </div>
        {emailError && (
          <p className="flex items-center gap-1 text-[11px] text-red-400">
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            {emailError}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))]">
          Password
        </label>
        <Input
          type={showPw ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          error={(pwTooWeak || pwEmpty) ? " " : undefined}
          rightIcon={
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPw((v) => !v)}
              className="text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))] transition-colors"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        {/* Strength meter */}
        {password && (
          <div className="space-y-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-200",
                    i <= strength.score ? strength.color : "bg-[rgb(var(--border))]"
                  )}
                />
              ))}
            </div>
            <p className={cn(
              "text-[11px] font-medium",
              strength.score <= 1 ? "text-red-400" : strength.score <= 2 ? "text-amber-400" : "text-green-400"
            )}>
              {strength.label}
              {strength.score < 2 && (
                <span className="text-[rgb(var(--text-tertiary))] font-normal">
                  {" "}— use 8+ chars, uppercase, a number, and a symbol
                </span>
              )}
            </p>
          </div>
        )}

        {(pwTooWeak || pwEmpty) && (
          <p className="flex items-center gap-1 text-[11px] text-red-400">
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            {pwEmpty ? "Password is required." : "Password must be at least \"Fair\" strength."}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" loading={loading}>
        Create account
      </Button>
    </form>
  );
}
