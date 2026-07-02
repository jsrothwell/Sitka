"use client";

import { useState } from "react";
import { SegmentedButton } from "@/components/ui/SegmentedButton";
import { LayoutGrid, List, Map, AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline } from "lucide-react";

export function ViewToggleDemo() {
  const [view, setView] = useState("grid");

  return (
    <SegmentedButton
      value={view}
      onChange={(v) => setView(v as string)}
      options={[
        { value: "grid", label: "Grid",  icon: <LayoutGrid className="w-4 h-4" /> },
        { value: "list", label: "List",  icon: <List className="w-4 h-4" /> },
        { value: "map",  label: "Map",   icon: <Map className="w-4 h-4" /> },
      ]}
    />
  );
}

export function IconOnlyDemo() {
  const [align, setAlign] = useState("left");

  return (
    <SegmentedButton
      value={align}
      onChange={(v) => setAlign(v as string)}
      options={[
        { value: "left",    icon: <AlignLeft className="w-4 h-4" /> },
        { value: "center",  icon: <AlignCenter className="w-4 h-4" /> },
        { value: "right",   icon: <AlignRight className="w-4 h-4" /> },
        { value: "justify", icon: <AlignJustify className="w-4 h-4" /> },
      ]}
    />
  );
}

export function MultiSelectDemo() {
  const [active, setActive] = useState<string[]>(["bold"]);

  return (
    <SegmentedButton
      multiple
      value={active}
      onChange={(v) => setActive(v as string[])}
      options={[
        { value: "bold",      icon: <Bold className="w-4 h-4" /> },
        { value: "italic",    icon: <Italic className="w-4 h-4" /> },
        { value: "underline", icon: <Underline className="w-4 h-4" /> },
      ]}
    />
  );
}

export function SizesDemo() {
  const [v1, setV1] = useState("day");
  const [v2, setV2] = useState("day");
  const [v3, setV3] = useState("day");

  const opts = [
    { value: "day",   label: "Day" },
    { value: "week",  label: "Week" },
    { value: "month", label: "Month" },
  ] as const;

  return (
    <div className="flex flex-col items-center gap-4">
      <SegmentedButton size="sm" value={v1} onChange={(v) => setV1(v as string)} options={[...opts]} />
      <SegmentedButton size="md" value={v2} onChange={(v) => setV2(v as string)} options={[...opts]} />
      <SegmentedButton size="lg" value={v3} onChange={(v) => setV3(v as string)} options={[...opts]} />
    </div>
  );
}
