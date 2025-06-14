import { Label } from "@/components/ui/label";
import { RadioGroupItem, } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface IFilterOptionProps {
  label: string;
  className?: string;
  classNameLabel?: string;
  controlClassName?: string;
  value?: string;
}
export const FilterRadio: React.FC<IFilterOptionProps> = ({
  label,
  className,
  classNameLabel,
  controlClassName,
  value,
}) => {
  const id = `filter-radio-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={cn("flex gap-[12px] items-center", className)}>
      <RadioGroupItem
        id={id}
        value={value || label}
        className={cn(
          "border-[30px] bg-white border-[rgba(254, 95, 0, 1)] w-[24px] h-[24px] bg-[rgba(241,241,241,1)] rounded-full data-[state=checked]:bg-[rgba(254,95,0,1)]",
          controlClassName
        )}
      />
      <Label htmlFor={id} className={cn("", classNameLabel)}>
        {label}
      </Label>
    </div>
  );
};
