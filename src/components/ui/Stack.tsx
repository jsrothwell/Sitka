import { ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const GAP: Record<string, string> = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "5": "gap-5",
  "6": "gap-6",
  "8": "gap-8",
  "10": "gap-10",
  "12": "gap-12",
};

const ALIGN: Record<string, string> = {
  start:   "items-start",
  center:  "items-center",
  end:     "items-end",
  stretch: "items-stretch",
  baseline:"items-baseline",
};

const JUSTIFY: Record<string, string> = {
  start:   "justify-start",
  center:  "justify-center",
  end:     "justify-end",
  between: "justify-between",
  around:  "justify-around",
  evenly:  "justify-evenly",
};

type StackOwnProps<E extends ElementType = "div"> = {
  as?: E;
  direction?: "row" | "col";
  gap?: keyof typeof GAP;
  align?: keyof typeof ALIGN;
  justify?: keyof typeof JUSTIFY;
  wrap?: boolean;
  className?: string;
};

type StackProps<E extends ElementType = "div"> = StackOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof StackOwnProps<E>>;

export function Stack<E extends ElementType = "div">({
  as,
  direction = "col",
  gap = "4",
  align,
  justify,
  wrap = false,
  className,
  ...rest
}: StackProps<E>) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        gap && GAP[gap],
        align && ALIGN[align],
        justify && JUSTIFY[justify],
        wrap && "flex-wrap",
        className,
      )}
      {...rest}
    />
  );
}

type InlineProps = Omit<StackProps<"div">, "direction" | "as"> & { as?: never };

export function Inline({
  gap = "2",
  align = "center",
  wrap = true,
  className,
  children,
  ...rest
}: InlineProps) {
  return (
    <div
      className={cn(
        "flex flex-row",
        gap && GAP[gap],
        align && ALIGN[align],
        wrap && "flex-wrap",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
