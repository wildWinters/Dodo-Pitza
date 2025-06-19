import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
export interface IFilterOptionProps {
  label: string;
  type?: "checkbox" | "radio";
  name?: string;
  className?: string;
  classNameLabel?: string;
  controlClassName?: string;
  checked?: boolean;
  value?: string;
  onClick?: () => void;
}

export const FilterOption: React.FC<IFilterOptionProps> = ({
  label,
  type = "checkbox",
  name,
  className,
  classNameLabel,
  controlClassName,
  checked,
  value,
  onClick,
  ...props
}) => {
  const id = `filteroption-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={cn("flex gap-[12px] items-center", className)}>
      <Checkbox
        id={id}
        name={name}
        value={value || label}
        checked={checked}
        className={cn(
          type === "checkbox"
            ? "font-[600] border-none w-[24px] h-[24px] bg-[rgba(241,241,241,1)] rounded-[8px] data-[state=checked]:bg-[rgba(254,95,0,1)]"
            : "w-[24px] h-[24px] bg-[rgba(241,241,241,1)] rounded-full data-[state=checked]:bg-[rgba(254,95,0,1)]",
          controlClassName
        )}
        {...props}
      />
      <label htmlFor={id} className={cn("", classNameLabel)} onClick={onClick}>
        {label}
      </label>
    </div>
  );
};
