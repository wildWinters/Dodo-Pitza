import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const PizzaDescription: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ className, children, ...props }) => (
  <div
    className={cn("flex flex-col gap-[7px] rounded-[15px] p-4", className)}
    {...props}
  >
    {children}
  </div>
);