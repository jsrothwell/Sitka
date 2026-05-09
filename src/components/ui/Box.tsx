import { ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type BoxOwnProps<E extends ElementType = "div"> = {
  as?: E;
  className?: string;
};

type BoxProps<E extends ElementType = "div"> = BoxOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof BoxOwnProps<E>>;

export function Box<E extends ElementType = "div">({
  as,
  className,
  ...rest
}: BoxProps<E>) {
  const Tag = as ?? "div";
  return <Tag className={cn(className)} {...rest} />;
}
