import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface IFilterOptionProps {
  label: string;
  type?: "checkbox" | "radio";
  name?: string;
  className?: string;
  classNameLabel?: string;
  controlClassName?: string;
  checked?: boolean;
  value?: string;
  onChangeValue?: (checked: boolean) => void;
}

//! розділити окремо на 2 частини треба роздлити код наи 2 коремі частини в тому і суть роздилити код на 2 частини
//! роздилити код на 2 частини розділяється просто на 2 частини
export const FilterOption: React.FC<IFilterOptionProps> = ({
  label,
  type = "checkbox",
  name,
  className,
  classNameLabel,
  controlClassName,
  onChangeValue,
  checked,
  value,
  ...props
}) => {
  const id = `filteroption-${label.replace(/\s+/g, "-").toLowerCase()}`;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue?.(e.target.checked);
  };

  return (
    <div className={cn("flex gap-[12px] items-center", className)}>
      <Checkbox
        id={id}
        name={name}
        value={value || label}
        checked={checked}
        onChange={handleChange}
        className={cn(
          type === "checkbox"
            ? " border-none w-[24px] h-[24px] bg-[rgba(241,241,241,1)] rounded-[8px] data-[state=checked]:bg-[rgba(254,95,0,1)]"
            : "w-[24px] h-[24px] bg-[rgba(241,241,241,1)] rounded-full data-[state=checked]:bg-[rgba(254,95,0,1)]",
          controlClassName
        )}
        {...props}
      />
      <label htmlFor={id} className={cn("", classNameLabel)}>
        {label}
      </label>
    </div>
  );
};
