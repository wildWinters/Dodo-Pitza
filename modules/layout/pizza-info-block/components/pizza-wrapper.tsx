import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import { IBasedProps } from "../../footer/main-footer-wrapper";
import { Counter } from "./pizza-counter";

export const PizzaWrapper = forwardRef<HTMLDivElement, IBasedProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("min-h-[430px] flex flex-col gap-[15px]", className)}
      {...props}
    >
      {children}
    </div>
  )
);
PizzaWrapper.displayName = "PizzaWrapper";

