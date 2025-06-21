import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export interface IFilterOptionProps {
  label: string;
  name?: string;
  type?: "checkbox" | "radio";
  className?: string;
  controlClassName?: string;
  checked?: boolean;
  value?: string;
  onClick?: () => void;
}

export const FilterOption: React.FC<IFilterOptionProps> = ({
  label,
  name,
  type = "checkbox",
  className,
  controlClassName,
  checked,
  value,
  onClick,
  ...props
}) => {
  const id = `filteroption-${label.replace(/\s+/g, "-").toLowerCase()}`;

  const baseControlClass =
    "w-[24px] h-[24px] bg-[rgba(241,241,241,1)] data-[state=checked]:bg-[rgba(254,95,0,1)]";

  const shapeClass =
    type === "checkbox"
      ? "font-[600] border-none rounded-[8px]"
      : "rounded-full";

  return (
    <div className={cn("flex items-center gap-[12px]", className)}>
      <Checkbox
        id={id}
        name={name}
        value={value || label}
        checked={checked}
        className={cn(baseControlClass, shapeClass, controlClassName)}
        {...props}
      />

      <label
        htmlFor={id}
        onClick={onClick}
        className={cn("cursor-pointer select-none")}
      >
        {label}
      </label>
    </div>
  );
};
