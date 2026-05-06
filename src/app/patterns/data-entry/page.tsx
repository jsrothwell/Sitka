"use client";

import { PageHeader } from "@/components/docs/PageHeader";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, Save, X } from "lucide-react";


const CODE = {
  react: {
    filename: "DataEntryForm.tsx",
    code: `"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { DatePicker } from "@/components/date-time-pickers";
import { cn } from "@/lib/cn";

// ── Form with inline validation ─────────────────────────────

interface FormField<T = string> {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "textarea" | "select" | "date" | "number";
  value: T;
  error?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface DataEntryFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  submitLabel?: string;
}

export function DataEntryForm({ fields, onSubmit, submitLabel = "Save" }: DataEntryFormProps) {
  const [formFields, setFormFields] = useState(fields);

  function updateField(name: string, value: any) {
    setFormFields(prev =>
      prev.map(f => {
        if (f.name !== name) return f;
        const error = validate(f, value);
        return { ...f, value, error };
      })
    );
  }

  function validate(field: FormField, value: any): string | undefined {
    if (field.required && !value?.toString().trim()) {
       return field.label + " is required";
    }
    if (field.type === "email" && value && !/^[^@]+@[^@]+\.[^@]+$/.test(value)) {
      return "Enter a valid email address";
    }
    return undefined;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let hasError = false;
    const validated = formFields.map(f => {
      const error = validate(f, f.value);
      if (error) hasError = true;
      return { ...f, error };
    });
    setFormFields(validated);

    if (!hasError) {
      const data = validated.reduce((acc, f) => ({ ...acc, [f.name]: f.value }), {});
      onSubmit(data);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formFields.map((field) => (
        <div key={field.name}>
          <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))] mb-2">
            {field.label}
            {field.required && <span className="text-[rgb(var(--accent))] ml-0.5">*</span>}
          </label>

          {field.type === "textarea" ? (
            <textarea
              value={field.value as string}
              onChange={(e) => updateField(field.name, e.target.value)}
              onBlur={() => updateField(field.name, field.value)}
              rows={3}
              className={cn(
                "w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",
                "px-3 py-2 text-[13px] text-[rgb(var(--text-primary))]",
                "focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20",
                "transition-colors resize-none",
                field.error && "border-[#f87171] focus:ring-[#f87171]/20"
              )}
               placeholder={"Enter " + field.label.toLowerCase() + "..."}
            />
          ) : field.type === "select" ? (
            <select
              value={field.value as string}
              onChange={(e) => updateField(field.name, e.target.value)}
              className={cn(
                "w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))]",
                "px-3 py-2 text-[13px] text-[rgb(var(--text-primary))] cursor-pointer",
                "focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20",
                "appearance-none",
                field.error && "border-[#f87171]"
              )}
            >
              <option value="">Select an option</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : field.type === "date" ? (
            <div>
              <Input
                type="date"
                value={field.value as string}
                onChange={(e) => updateField(field.name, e.target.value)}
                error={field.error}
                required={field.required}
              />
            </div>
          ) : (
            <Input
              type={field.type}
              value={field.value as string}
              onChange={(e) => updateField(field.name, e.target.value)}
              onBlur={() => updateField(field.name, field.value)}
              error={field.error}
              required={field.required}
               placeholder={"Enter " + field.label.toLowerCase() + "..."}
            />
          )}

          {field.error && (
            <p className="flex items-center gap-1.5 mt-2 text-[12px] text-[#f87171]">
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="6" y1="3" x2="6" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {field.error}
            </p>
          )}
        </div>
      ))}

      <Button type="submit" variant="primary" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}

// ── Stepped data entry w/ progress ─────────────────────────

interface Step {
  title: string;
  fields: FormField[];
}

export function SteppedDataEntry({
  steps,
  onComplete,
}: {
  steps: Step[];
  onComplete: (data: Record<string, any>) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepData, setStepData] = useState<Record<string, any>[]>(steps.map(() => ({})));

  function updateStepData(field: FormField, value: any) {
    setStepData(prev => {
      const next = [...prev];
      next[currentStep] = { ...next[currentStep], [field.name]: value };
      return next;
    });
  }

  function next() {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
    else {
      const allData = stepData.reduce((acc, data, i) => {
        steps[i].fields.forEach(f => { acc[f.name] = data[f.name]; });
        return acc;
      }, {} as Record<string, any>);
      onComplete(allData);
    }
  }

  function back() {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((step, i) => (
          <div key={step.title} className="flex items-center flex-1">
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all",
              i < currentStep ? "bg-[rgb(var(--accent))] text-white" :
              i === currentStep ? "bg-[rgb(var(--accent))] text-white ring-4 ring-[rgb(var(--accent))]/20" :
                                "bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-tertiary))] border border-[rgb(var(--border))]"
            )}>
              {i < currentStep ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={cn("flex-1 h-px mx-2", i < currentStep ? "bg-[rgb(var(--accent))]" : "bg-[rgb(var(--border))]")} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6">
        <h3 className="text-[16px] font-semibold text-[rgb(var(--text-primary))] mb-6">{steps[currentStep].title}</h3>
        
        <div className="space-y-5">
          {steps[currentStep].fields.map((field) => (
            <div key={field.name}>
              <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))] mb-2">
                {field.label}
                {field.required && <span className="text-[rgb(var(--accent))] ml-0.5">*</span>}
              </label>
              <Input
                type={field.type === "number" ? "number" : "text"}
                value={stepData[currentStep][field.name] || ""}
                onChange={(e) => updateStepData(field, e.target.value)}
                placeholder={field.label}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[rgb(var(--border-subtle))]">
          <button
            onClick={back}
            disabled={currentStep === 0}
            className={cn(
              "text-[12px] font-medium transition-colors",
              currentStep === 0
                ? "text-[rgb(var(--text-tertiary))] cursor-not-allowed"
                : "text-[rgb(var(--accent))] hover:underline"
            )}
          >
            Back
          </button>
          <button
            onClick={next}
            className="px-4 py-2 rounded-lg bg-[rgb(var(--accent))] text-white text-[12px] font-medium hover:bg-[rgb(var(--accent))]/90 transition-colors"
          >
            {currentStep === steps.length - 1 ? "Complete" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Bulk entry table ───────────────────────────────────────

interface BulkEntryProps<T = Record<string, any>> {
  columns: { key: string; label: string; type: "text" | "number" | "select" }[];
  rows: T[];
  onChange: (rows: T[]) => void;
  addRowLabel?: string;
}

export function BulkEntryTable<T extends Record<string, any>>({
  columns,
  rows,
  onChange,
  addRowLabel = "Add row",
}: BulkEntryProps<T>) {
  const updateCell = (rowIndex: number, colKey: string, value: any) => {
    const newRows = [...rows];
    newRows[rowIndex] = { ...newRows[rowIndex], [colKey]: value };
    onChange(newRows);
  };

  const addRow = () => {
    const newRow = columns.reduce((acc, col) => ({ ...acc, [col.key]: "" }), {} as T);
    onChange([...rows, newRow]);
  };

  const removeRow = (index: number) => {
    onChange(rows.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">\n            {columns.map(col => (
              <th key={col.key} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                {col.label}
              </th>
            ))}
            <th className="w-12"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-[rgb(var(--border-subtle))] last:border-0 hover:bg-[rgb(var(--surface))]">
              {columns.map(col => (
                <td key={col.key} className="px-4 py-2">
                  {col.type === "select" ? (
                    <select
                      value={row[col.key] as string}
                      onChange={(e) => updateCell(rowIndex, col.key, e.target.value)}
                      className="w-full rounded border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-2 py-1 text-[12px]"
                    >
                      <option value="">Select</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                    </select>
                  ) : (
                    <input
                      type={col.type}
                      value={row[col.key] as string}
                      onChange={(e) => updateCell(rowIndex, col.key, e.target.value)}
                      className="w-full bg-transparent text-[12px] outline-none focus:text-[rgb(var(--text-primary))]"
                    />
                  )}
                </td>
              ))}
              <td>
                <button
                  onClick={() => removeRow(rowIndex)}
                  className="p-1 rounded text-[rgb(var(--text-tertiary))] hover:text-[#f87171] transition-colors"
                  aria-label="Remove row"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addRow}
        className="w-full py-2 text-[12px] text-[rgb(var(--accent))] font-medium hover:bg-[rgb(var(--surface))] transition-colors flex items-center justify-center gap-1"
      >
        <Plus className="w-3 h-3" />
        {addRowLabel}
      </button>
    </div>
  );
}
`,
  },
  html: {
    filename: "data-entry.html",
    code: `<div class="data-entry-form">
  <form>
    <!-- Validation -->
    <div class="form-group">
      <label>Email <span class="required">*</span></label>
      <input type="email" class="form-input" required>
      <div class="error-msg">Please enter a valid email</div>
    </div>

    <!-- Stepped entry -->
    <div class="stepper">
      <div class="step-indicator">
        <span class="step active">1</span>
        <span class="step">2</span>
        <span class="step">3</span>
      </div>
    </div>

    <!-- Bulk entry table -->
    <table class="bulk-entry">
      <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th></th></tr></thead>
      <tbody>
        <tr>
          <td><input type="text" value="Product A"></td>
          <td><input type="number" value="2"></td>
          <td><input type="number" value="29.99"></td>
          <td><button class="remove">✕</button></td>
        </tr>
      </tbody>
    </table>
    <button class="add-row">+ Add row</button>
  </form>
</div>

<style>
.data-entry-form { padding: 24px; }
.required { color: #ef4444; }
.error-msg {
  font-size: 12px; color: #ef4444; margin-top: 4px;
  display: none;
}
.form-input:invalid:focus ~ .error-msg { display: block; }

.stepper { display: flex; gap: 8px; margin: 16px 0; }
.step {
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600;
  background: var(--surface); border: 1px solid var(--border);
}
.step.active { background: var(--accent); color: white; border-color: var(--accent); }

.bulk-entry { width: 100%; border-collapse: collapse; }
.bulk-entry td { padding: 8px; border-bottom: 1px solid var(--border); }
.bulk-entry input { width: 100%; border: none; background: transparent; }
.bulk-entry input:focus { outline: none; background: var(--surface-hover); }
.remove {
  width: 24px; height: 24px; border: none; background: none;
  cursor: pointer; color: var(--text-tertiary);
}
.add-row {
  width: 100%; padding: 8px; margin-top: 8px;
  background: none; border: 1px dashed var(--border);
  color: var(--accent); cursor: pointer;
}
</style>`,
  },
  swift: {
    filename: "DataEntryView.swift",
    code: `import SwiftUI

// ── Form with validation ────────────────────────────────────

struct ValidatedForm: View {
    @State private var email = ""
    @State private var name = ""
    @State private var emailError: String?
    
    var body: some View {
        Form {
            Section("Account Info") {
                TextField("Email", text: $email)
                    .keyboardType(.emailAddress)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
                    .onChange(of: email) { _, newValue in
                        emailError = validateEmail(newValue)
                    }
                
                if let error = emailError {
                    Label(error, systemImage: "exclamationmark.circle")
                        .font(.caption)
                        .foregroundColor(.red)
                }
                
                TextField("Full Name", text: $name)
            }
            
            Section {
                Button("Create Account") {
                    // Submit logic
                }
                .disabled(!isValid)
            }
        }
    }
    
    var isValid: Bool {
        !email.isEmpty && emailError == nil && !name.isEmpty
    }
    
    func validateEmail(_ email: String) -> String? {
        let emailRegex = #"^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$"#
        let predicate = NSPredicate(format: "SELF MATCHES[c] %@", emailRegex)
        return predicate.evaluate(with: email) ? nil : "Invalid email format"
    }
}

// ── Stepped entry wizard ───────────────────────────────────

struct SteppedEntryWizard: View {
    @State private var step = 0
    @State private var personalInfo = (name: "", email: "")
    @State private var preferences = (theme: "Light", notifications: true)
    
    var body: some View {
        NavigationStack {
            Form {
                switch step {
                case 0:
                    Section("Personal Information") {
                        TextField("Name", text: $personalInfo.name)
                        TextField("Email", text: $personalInfo.email)
                            .keyboardType(.emailAddress)
                    }
                case 1:
                    Section("Preferences") {
                        Picker("Theme", selection: $preferences.theme) {
                            Text("Light").tag("Light")
                            Text("Dark").tag("Dark")
                        }
                        Toggle("Email Notifications", isOn: $preferences.notifications)
                    }
                default:
                    Section {
                        VStack(spacing: 16) {
                            Image(systemName: "checkmark.circle.fill")
                                .font(.system(size: 48))
                                .foregroundStyle(.green)
                            Text("Account Created!")
                                .font(.title2.bold())
                            Text("Welcome, \(personalInfo.name)!")
                                .foregroundStyle(.secondary)
                        }
                        .frame(maxWidth: .infinity)
                    }
                }
                
                if step < 2 {
                    Section {
                        Button("Continue") {
                            withAnimation {
                                step += 1
                            }
                        }
                        .disabled(step == 0 && (personalInfo.name.isEmpty || personalInfo.email.isEmpty))
                    }
                }
            }
            .navigationTitle(step == 2 ? "Complete" : "Step \(step + 1)/3")
            .toolbar {
                if step > 0 && step < 2 {
                    ToolbarItem(placement: .cancellationAction) {
                        Button("Back") {
                            step -= 1
                        }
                    }
                }
            }
        }
    }
}

// ── Bulk entry with inline editing ─────────────────────────

struct BulkEntryTable: View {
    @State private var items: [ExpenseItem] = [
        .init(name: "Office Supplies", amount: 149.99, category: "Operations"),
        .init(name: "Team Lunch", amount: 85.50, category: "Team"),
    ]
    
    @State private var showingAddSheet = false
    
    var body: some View {
        List {
            ForEach($items) { $item in
                HStack {
                    TextField("Item name", text: $item.name)
                        .textFieldStyle(.roundedBorder)
                    TextField("Amount", value: $item.amount, format: .number)
                        .textFieldStyle(.roundedBorder)
                        .frame(width: 100)
                        .multilineTextAlignment(.trailing)
                }
            }
            .onDelete(perform: deleteItems)
            
            Button {
                showingAddSheet = true
            } label: {
                Label("Add Item", systemImage: "plus.circle")
                    .foregroundStyle(.accent)
            }
        }
        .sheet(isPresented: $showingAddSheet) {
            NavigationStack {
                AddItemView(items: $items)
                    .navigationTitle("New Item")
                    .toolbar {
                        ToolbarItem(placement: .cancellationAction) {
                            Button("Cancel") { showingAddSheet = false }
                        }
                    }
            }
        }
    }
    
    func deleteItems(at offsets: IndexSet) {
        items.remove(atOffsets: offsets)
    }
}

struct ExpenseItem: Identifiable {
    let id = UUID()
    var name: String
    var amount: Double
    var category: String
}

struct AddItemView: View {
    @Environment(\.dismiss) var dismiss
    @Binding var items: [ExpenseItem]
    @State private var name = ""
    @State private var amount = ""
    
    var body: some View {
        Form {
            TextField("Item name", text: $name)
            TextField("Amount", text: $amount)
                .keyboardType(.decimalPad)
            
            Button("Save") {
                if let amount = Double(amount) {
                    items.append(.init(name: name, amount: amount, category: "Misc"))
                }
                dismiss()
            }
            .disabled(name.isEmpty || amount.isEmpty)
        }
    }
}

// Preview provider
struct DataEntryPreviews: PreviewProvider {
    static var previews: some View {
        TabView {
            ValidatedForm()
                .tabItem { Label("Form", systemImage: "doc.text") }
            
            SteppedEntryWizard()
                .tabItem { Label("Wizard", systemImage: "list.bullet") }
            
            BulkEntryTable()
                .tabItem { Label("Bulk", systemImage: "table") }
        }
    }
}`,
  },
};

const ENTRY_PATTERNS = [
  { type: "Inline validation", desc: "Validate as you type with clear error messages and helpful suggestions" },
  { type: "Stepped wizard", desc: "Break complex forms into logical steps with progress indicators" },
  { type: "Bulk editing", desc: "Edit multiple records in a spreadsheet-like interface for efficiency" },
  { type: "Smart defaults", desc: "Pre-fill with sensible defaults and remember user preferences" },
];

export default function DataEntryPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [wizardComplete, setWizardComplete] = useState(false);

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const handleWizardComplete = (data: any) => {
    console.log("Wizard complete:", data);
    setWizardComplete(true);
    setTimeout(() => setWizardComplete(false), 3000);
  };

  return (
    <div>
      <PageHeader
        title="Data Entry"
        description="Patterns for efficient and accurate data input — from inline validation to multi-step wizards and bulk editing. Minimize errors and maximize completion rates."
      />

      {/* Inline validation form */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Form with inline validation</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Validate input as users type and provide immediate, specific error messages. Show success states when input is valid.
        </p>
        <ComponentPreview>
          <div className="w-full max-w-md mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); setTimeout(() => setFormSubmitted(false), 2000); }}>
              <div className="space-y-1">
                <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))]">
                  Email <span className="text-[rgb(var(--accent))]">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  error="Please enter a valid email address"
                />
                <p className="text-[11px] text-[rgb(var(--text-tertiary))] mt-1">
                  We'll send a confirmation email
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))]">
                  Full name <span className="text-[rgb(var(--accent))]">*</span>
                </label>
                <Input placeholder="Jane Smith" />
              </div>

              <div className="space-y-1">
                <label className="block text-[12px] font-medium text-[rgb(var(--text-secondary))]">
                  Role
                </label>
                <select className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2 text-[13px] text-[rgb(var(--text-primary))] focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20 outline-none">
                  <option value="">Select a role</option>
                  <option value="designer">Designer</option>
                  <option value="engineer">Engineer</option>
                  <option value="pm">Product Manager</option>
                </select>
              </div>

              <Button type="submit" variant="primary" className="w-full" loading={formSubmitted}>
                {formSubmitted ? "Creating Account…" : "Create Account"}
              </Button>
            </form>
          </div>
        </ComponentPreview>
      </section>

      {/* Stepped wizard */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Multi-step wizard</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Break complex data entry into focused steps. Validate each step before allowing progress, and show clear navigation controls.
        </p>
        <ComponentPreview>
          <div className="w-full max-w-md mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    step === 1 ? "bg-[rgb(var(--accent))] text-white" : "bg-[rgb(var(--surface-raised))] text-[rgb(var(--text-tertiary))] border border-[rgb(var(--border))]"
                  }`}>
                    {step < 3 ? step : "✓"}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-px ${step === 1 ? "bg-[rgb(var(--accent))]" : "bg-[rgb(var(--border))]"}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="text-[14px] font-semibold text-[rgb(var(--text-primary))]">Personal information</h3>
              <Input label="First name" placeholder="Jane" />
              <Input label="Last name" placeholder="Smith" />
              <Input label="Email" type="email" placeholder="you@example.com" />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[rgb(var(--border-subtle))]">
              <button className="text-[12px] font-medium text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))]">
                Back
              </button>
              <Button variant="primary" size="sm">
                Continue
              </Button>
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Bulk entry */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Bulk data entry</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          For entering multiple records at once, provide a spreadsheet-like interface with inline editing and quick-add rows.
        </p>
        <ComponentPreview>
          <div className="w-full overflow-x-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[rgb(var(--border))] text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4 w-8"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[rgb(var(--border-subtle))]">
                  <td className="py-2 px-4">
                    <input type="text" defaultValue="Laptop" className="w-full bg-transparent text-[12px] outline-none focus:text-[rgb(var(--text-primary))]" />
                  </td>
                  <td className="py-2 px-4">
                    <input type="number" defaultValue="2" className="w-16 bg-transparent text-[12px] text-right outline-none focus:text-[rgb(var(--text-primary))]" />
                  </td>
                  <td className="py-2 px-4">
                    <input type="number" defaultValue="1299.99" className="w-20 bg-transparent text-[12px] text-right outline-none focus:text-[rgb(var(--text-primary))]" />
                  </td>
                  <td className="py-2 px-4">
                    <button className="p-1 text-[rgb(var(--text-tertiary))] hover:text-[#f87171]">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-[rgb(var(--border-subtle))]">
                  <td className="py-2 px-4">
                    <input type="text" defaultValue="Mouse" className="w-full bg-transparent text-[12px] outline-none focus:text-[rgb(var(--text-primary))]" />
                  </td>
                  <td className="py-2 px-4">
                    <input type="number" defaultValue="5" className="w-16 bg-transparent text-[12px] text-right outline-none focus:text-[rgb(var(--text-primary))]" />
                  </td>
                  <td className="py-2 px-4">
                    <input type="number" defaultValue="49.99" className="w-20 bg-transparent text-[12px] text-right outline-none focus:text-[rgb(var(--text-primary))]" />
                  </td>
                  <td className="py-2 px-4">
                    <button className="p-1 text-[rgb(var(--text-tertiary))] hover:text-[#f87171]">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="w-full py-2 mt-2 text-[12px] text-[rgb(var(--accent))] font-medium hover:bg-[rgb(var(--surface))] flex items-center justify-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Add row
            </button>
          </div>
        </ComponentPreview>
      </section>

      {/* Use cases */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Entry patterns</h2>
        <div className="grid grid-cols-2 gap-4">
          {ENTRY_PATTERNS.map((ex) => (
            <div key={ex.type} className="rounded-xl border border-[rgb(var(--border))] p-4 bg-[rgb(var(--surface))]">
              <h3 className="text-[13px] font-semibold text-[rgb(var(--text-primary))] mb-1">{ex.type}</h3>
              <p className="text-[12px] text-[rgb(var(--text-secondary))]">{ex.desc}</p>
            </div>
          ))}
        </div>
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
           {["Always provide associated <label> elements for inputs, use aria-label as fallback.",
            "Error messages must be linked via aria-describedby and have role='alert' for screen readers.",
            "Required fields need aria-required='true' and visually indicate the requirement.",
            "After validation errors, move focus to the first error or provide a summary at the top.",
            "Use appropriate input types (email, number, tel) to trigger correct virtual keyboards.",
            "For multi-step forms, announce step changes with aria-live regions.",
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
