import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/PageHeader";
import { PropsTable } from "@/components/docs/PropsTable";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

export const metadata: Metadata = { title: "Slider" };

const PROPS = [
  { name: "value", type: "number | number[]", required: true, description: "Current slider value(s). Single number for single thumb, array for range." },
  { name: "onValueChange", type: "(value: number | number[]) => void", required: true, description: "Callback fired when value changes." },
  { name: "min", type: "number", default: "0", description: "Minimum value." },
  { name: "max", type: "number", default: "100", description: "Maximum value." },
  { name: "step", type: "number", default: "1", description: "Step increment." },
  { name: "disabled", type: "boolean", default: "false", description: "Prevents interaction and reduces opacity." },
  { name: "label", type: "string", description: "Label text displayed above the slider." },
  { name: "showValue", type: "boolean", default: "false", description: "Display current value next to the label." },
];

const CODE = {
  react: {
    filename: "Slider.tsx",
    code: `"use client";

import { cn } from "@/lib/cn";
import { useState } from "react";

export interface SliderProps {
  value?: number | number[];
  defaultValue?: number | number[];
  onValueChange?: (value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  showValue?: boolean;
}

export function Slider({
  value: controlledValue,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  label,
  showValue = false,
}: SliderProps) {
  const [internalValue, setInternalValue] = useState<number | number[]>(
    controlledValue ?? defaultValue ?? 0
  );
  const currentValue = controlledValue ?? internalValue;

  function handleChange(newValue: number | number[]) {
    if (disabled) return;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  }

  function getPercentage(val: number) {
    return ((val - min) / (max - min)) * 100;
  }

  const isRange = Array.isArray(currentValue);
  const values = isRange ? currentValue : [currentValue];
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  return (
    <div className="w-full space-y-2">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="text-[12px] font-medium text-[rgb(var(--text-secondary))]">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-[12px] font-medium text-[rgb(var(--text-primary))]">
               {isRange ? minVal + " – " + maxVal : minVal}
            </span>
          )}
        </div>
      )}
      <div className="relative h-2 flex items-center">
        {/* Track */}
        <div className="absolute h-[3px] rounded-full w-full bg-[rgb(var(--border))]" />
        {/* Fill */}
        <div
          className="absolute h-[3px] rounded-full bg-[rgb(var(--accent))]"
          style={{
             left: getPercentage(minVal) + "%",
             width: getPercentage(maxVal) - getPercentage(minVal) + "%",
          }}
        />
        {/* Thumbs */}
        {values.map((val, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-4 h-4 rounded-full border-2 cursor-pointer",
              "bg-white border-[rgb(var(--accent))]",
              "transition-transform hover:scale-110",
              disabled && "opacity-40 cursor-not-allowed"
            )}
            style={{
               left: getPercentage(val) + "%",
              transform: "translateX(-50%)",
              top: "50%",
              marginTop: "-6px",
            }}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={val}
            aria-label={label}
            tabIndex={disabled ? undefined : 0}
            onKeyDown={(e) => {
              if (disabled) return;
              const delta = e.shiftKey ? step * 10 : step;
              let newVal = val;
              if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                newVal = Math.max(val - delta, min);
              } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                newVal = Math.min(val + delta, max);
              }
              if (newVal !== val) {
                e.preventDefault();
                const newValue = isRange
                  ? (values.map((v, idx) => (idx === i ? newVal : v)) as [number, number])
                  : newVal;
                handleChange(newValue);
              }
            }}
          >
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={val}
              onChange={(e) => {
                const newVal = parseFloat(e.target.value);
                if (isRange) {
                  const newValue = [...values] as [number, number];
                  newValue[i] = newVal;
                  handleChange(newValue);
                } else {
                  handleChange(newVal);
                }
              }}
              className="sr-only"
              disabled={disabled}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-[rgb(var(--text-tertiary))]">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
`,
  },
  html: {
    filename: "slider.html",
    code: `<div class="slider-container">
  <div class="slider-header">
    <label class="slider-label">Volume</label>
    <span class="slider-value">75</span>
  </div>
  <div class="slider-track">
    <div class="slider-fill" style="width: 75%;"></div>
    <input 
      type="range" 
      min="0" 
      max="100" 
      value="75" 
      class="slider-input"
    />
    <div class="slider-thumb" style="left: 75%;"></div>
  </div>
  <div class="slider-labels">
    <span>0</span>
    <span>100</span>
  </div>
</div>

<style>
.slider-container { width: 100%; padding: 8px 0; }
.slider-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
.slider-label { font-size: 12px; color: var(--text-secondary); font-weight: 500; }
.slider-value { font-size: 12px; color: var(--text-primary); font-weight: 500; }
.slider-track { position: relative; height: 2px; background: var(--border); border-radius: 1px; }
.slider-fill { position: absolute; height: 100%; background: var(--accent); border-radius: 1px; }
.slider-input { position: absolute; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
.slider-thumb {
  position: absolute; top: 50%; width: 16px; height: 16px;
  background: white; border: 2px solid var(--accent); border-radius: 50%;
  transform: translate(-50%, -50%); cursor: pointer;
  transition: transform 0.15s;
}
.slider-thumb:hover { transform: translate(-50%, -50%) scale(1.15); }
.slider-labels { display: flex; justify-content: space-between; margin-top: 4px; }
.slider-labels span { font-size: 10px; color: var(--text-tertiary); }
</style>

<script>
const slider = document.querySelector('.slider-input');
const thumb = document.querySelector('.slider-thumb');
const fill = document.querySelector('.slider-fill');
const value = document.querySelector('.slider-value');

slider.addEventListener('input', (e) => {
  const val = e.target.value;
  thumb.style.left = val + '%';
  fill.style.width = val + '%';
  value.textContent = val;
});
</script>`,
  },
  swift: {
    filename: "CustomSlider.swift",
    code: `import SwiftUI

struct CustomSlider: View {
    @Binding var value: Double
    let range: ClosedRange<Double>
    let step: Double
    let label: String?
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            if let label = label {
                HStack {
                    Text(label)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Spacer()
                    Text("\(Int(value))")
                        .font(.caption)
                        .fontDesign(.monospaced)
                        .foregroundStyle(.primary)
                }
            }
            
            Slider(value: $value, in: range, step: step)
                .tint(.accent)
            
            HStack {
                Text("\(Int(range.lowerBound))")
                    .font(.caption2)
                    .foregroundStyle(.tertiary)
                Spacer()
                Text("\(Int(range.upperBound))")
                    .font(.caption2)
                    .foregroundStyle(.tertiary)
            }
        }
        .padding(.vertical, 4)
    }
}

struct VolumeSlider: View {
    @State private var volume: Double = 75
    
    var body: some View {
        VStack(spacing: 24) {
            CustomSlider(
                value: $volume,
                range: 0...100,
                step: 1,
                label: "Volume"
            )
            .padding()
        }
    }
}

#Preview {
    VolumeSlider()
}`,
  },
};

const STATES = [
  { state: "Default", thumb: "bg-white border-[rgb(var(--accent))]", fill: "bg-[rgb(var(--border))]", note: "Resting state" },
  { state: "Hover", thumb: "bg-white border-[rgb(var(--accent))] scale-110", fill: "bg-[rgb(var(--border))]", note: "Cursor over thumb" },
  { state: "Active", thumb: "bg-white border-[rgb(var(--accent))] scale-110", fill: "bg-[rgb(var(--accent)]", note: "Dragging thumb" },
  { state: "Disabled", thumb: "bg-white border-[rgb(var(--border))] opacity-40", fill: "bg-[rgb(var(--border))]", note: "Not interactive" },
];

export default function SliderPage() {
  const [singleValue, setSingleValue] = useState(50);
  const [rangeValue, setRangeValue] = useState([25, 75]);

  return (
    <div>
      <PageHeader
        title="Slider"
        description="Select a value from a continuous range. Supports single thumb for simple selection or dual thumbs for range selection with keyboard accessibility."
      />

      {/* Single thumb */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Single value</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Choose one value from a range. Common uses include volume control, brightness adjustment, or rating input.
        </p>
        <ComponentPreview>
          <div className="w-full max-w-md mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
            <div className="space-y-6">
              <div>
                <CustomSliderDemo
                  label="Volume"
                  min={0}
                  max={100}
                  value={singleValue}
                  onChange={setSingleValue}
                  showValue
                />
              </div>
              <div>
                <CustomSliderDemo
                  label="Brightness"
                  min={0}
                  max={100}
                  defaultValue={70}
                  showValue
                />
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Range selection */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-2">Range selection</h2>
        <p className="text-[14px] text-[rgb(var(--text-secondary))] mb-5 leading-relaxed">
          Select a minimum and maximum value. Useful for price filters, date ranges, or any bounded selection.
        </p>
        <ComponentPreview>
          <div className="w-full max-w-md mx-auto p-6 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
            <CustomRangeSliderDemo
              label="Price range"
              min={0}
              max={500}
              value={rangeValue}
              onChange={setRangeValue}
              showValue
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Anatomy */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-6">Anatomy</h2>
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-10 flex items-center justify-center">
          <svg viewBox="0 0 400 120" width="400" height="120" className="max-w-full">
            {/* Track */}
            <line x1="40" y1="60" x2="360" y2="60" stroke="rgb(var(--border))" strokeWidth="4" strokeLinecap="round" />
            {/* Fill */}
            <line x1="40" y1="60" x2="200" y2="60" stroke="rgb(var(--accent))" strokeWidth="4" strokeLinecap="round" />
            {/* Thumb */}
            <circle cx="200" cy="60" r="12" fill="white" stroke="rgb(var(--accent))" strokeWidth="3" />
            
            {/* Labels */}
            <text x="40" y="85" fontSize="10" fill="rgb(var(--text-tertiary))">Min</text>
            <text x="360" y="85" fontSize="10" fill="rgb(var(--text-tertiary))" textAnchor="end">Max</text>
            <text x="200" y="40" fontSize="10" fill="rgb(var(--text-tertiary))" textAnchor="middle">Value</text>
            
            {/* Annotations */}
            <line x1="200" y1="74" x2="200" y2="95" stroke="rgb(var(--border))" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="200" y1="74" x2="180" y2="100" stroke="rgb(var(--border))" strokeWidth="1" strokeDasharray="3 2" />
          </svg>
        </div>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">States</h2>
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[rgb(var(--surface-raised))] border-b border-[rgb(var(--border))]">
                {["State", "Appearance", "Notes"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--text-tertiary))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STATES.map((s, i) => (
                <tr key={s.state} className={`border-b border-[rgb(var(--border-subtle))] last:border-0 ${i % 2 === 0 ? "bg-[rgb(var(--surface))]" : "bg-[rgb(var(--background))]"}`}>
                  <td className="px-4 py-3 font-medium text-[rgb(var(--text-primary))]">{s.state}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${s.thumb}`} />
                      <div className="flex-1 h-[3px] rounded-full">
                        <div className={`h-full rounded-full ${s.fill} w-3/4`} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[rgb(var(--text-secondary))]">{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage guidelines */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-4">Usage guidelines</h2>
        <div className="grid grid-cols-2 gap-4">
           {[{ type: "do", items: ["Use sliders for continuous values, not discrete choices", "Provide clear min/max labels to define the range", "Default to a meaningful middle value, not extremes", "Allow precise input via keyboard arrows and Shift for larger steps"] },
            { type: "dont", items: ["Don't use sliders for binary choices (use a switch instead)", "Avoid sliders when precision is critical (use numeric input)", "Don't hide the current value — always show it", "Don't use more than 2 thumbs for range selection"] },
          ].map(({ type, items }) => (
            <div key={type} className="rounded-xl border border-[rgb(var(--border))] overflow-hidden">
              <div className={`px-4 py-2.5 border-b border-[rgb(var(--border))] text-[11px] font-semibold uppercase tracking-wider ${
                type === "do" ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20" : "text-red-500 bg-red-50 dark:bg-red-950/20"
              }`}>
                {type === "do" ? "✓ Do" : "✗ Don't"}
              </div>
              <ul className="p-4 space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-[12px] text-[rgb(var(--text-secondary))] flex gap-2">
                    <span className={type === "do" ? "text-emerald-500" : "text-red-400"}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-[20px] font-semibold text-[rgb(var(--text-primary))] mb-5">Props</h2>
        <PropsTable props={PROPS} />
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
           {["Sliders must have an associated label via aria-label or aria-labelledby.",
            "Keyboard: Arrow keys adjust by step; Shift + arrow keys adjust by 10× step.",
            "Range sliders must have aria-valuemin, aria-valuemax, and aria-valuenow on each thumb.",
            "Provide visible focus indicators on thumbs for keyboard users.",
            "Value display must be screen-reader accessible via aria-valuetext if needed.",
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

function CustomSliderDemo({ label, min, max, value, onChange, defaultValue, showValue }: any) {
  const [val, setVal] = useState(value ?? defaultValue ?? min);
  const handleChange = (v: number) => {
    setVal(v);
    onChange?.(v);
  };
  return (
    <div className="space-y-2">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <label className="text-[12px] font-medium text-[rgb(var(--text-secondary))]">{label}</label>}
          {showValue && <span className="text-[12px] font-medium text-[rgb(var(--text-primary))]">{val}</span>}
        </div>
      )}
      <div className="relative h-2 flex items-center">
        <div className="absolute h-[3px] rounded-full w-full bg-[rgb(var(--border))]" />
        <div
          className="absolute h-[3px] rounded-full bg-[rgb(var(--accent))]"
          style={{
            left: `${((val - min) / (max - min)) * 100}%`,
            width: `${((val - min) / (max - min)) * 100}%`,
          }}
        />
        <div
          className="absolute w-4 h-4 rounded-full border-2 bg-white border-[rgb(var(--accent))] cursor-pointer"
          style={{
            left: `${((val - min) / (max - min)) * 100}%`,
            transform: "translateX(-50%)",
            top: "50%",
            marginTop: "-6px",
          }}
          role="slider"
          tabIndex={0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={val}
          aria-label={label}
          onKeyDown={(e) => {
            const delta = e.shiftKey ? 10 : 1;
            if (e.key === "ArrowLeft" && val > min) handleChange(val - delta);
            if (e.key === "ArrowRight" && val < max) handleChange(val + delta);
          }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-[rgb(var(--text-tertiary))]">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function CustomRangeSliderDemo({ label, min, max, value, onChange, showValue }: any) {
  const [vals, setVals] = useState(value ?? [min, max]);
  const handleChange = (v: number[]) => {
    setVals(v);
    onChange?.(v);
  };
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <label className="text-[12px] font-medium text-[rgb(var(--text-secondary))]">{label}</label>}
          {showValue && (
            <span className="text-[12px] font-medium text-[rgb(var(--text-primary))]">
              {vals[0]} – {vals[1]}
            </span>
          )}
        </div>
      )}
      <div className="relative h-2 flex items-center">
        <div className="absolute h-[3px] rounded-full w-full bg-[rgb(var(--border))]" />
        <div
          className="absolute h-[3px] rounded-full bg-[rgb(var(--accent))]"
          style={{ left: `${pct(vals[0])}%`, width: `${pct(vals[1]) - pct(vals[0])}%` }}
        />
        {[0, 1].map((i) => (
          <div
            key={i}
            className="absolute w-4 h-4 rounded-full border-2 bg-white border-[rgb(var(--accent))] cursor-pointer"
            style={{
              left: `${pct(vals[i])}%`,
              transform: "translateX(-50%)",
              top: "50%",
              marginTop: "-6px",
            }}
            role="slider"
            tabIndex={0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={vals[i]}
            aria-label={`${label} ${i === 0 ? "minimum" : "maximum"}`}
            onKeyDown={(e) => {
              const delta = e.shiftKey ? 10 : 1;
              const newVals = [...vals] as [number, number];
              if (e.key === "ArrowLeft" && vals[i] > min + (i === 1 ? 1 : 0)) newVals[i] -= delta;
              if (e.key === "ArrowRight" && vals[i] < max - (i === 0 ? 1 : 0)) newVals[i] += delta;
              if (newVals[0] <= newVals[1]) handleChange(newVals);
            }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-[rgb(var(--text-tertiary))]">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
