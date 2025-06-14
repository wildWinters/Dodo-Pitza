import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { nunito400 } from "@/font/fonts";

interface IRadioFilterBlock {
  defaultValue?: string;
  className?: string;
  label: string;
  value: string;
  id: string;
}

export const RadioFilterBlock: React.FC<IRadioFilterBlock> = ({
  defaultValue = "option-one",
  label,
  value,
  id,
  className,
}) => {
  return (
    <div className={cn("flex gap-[12px] items-center", className)}>
      <RadioGroup className="flex my-[5px] gap-[12px] " defaultValue={defaultValue}>
      <RadioGroupItem
        value={value}
        id={id}
        className={cn(
          "w-[24px] h-[24px] rounded-full bg-[rgba(241,241,241,1)] focus:border-[7.5px] focus:border-[rgba(254,95,0,1)]",
          "[&>div]:bg-white" // ← це змінює цятку всередині на білу
        )}
      />
        <Label htmlFor={id} className={cn(nunito400.className, "text-[16px]")}>
          {label}
        </Label>
      </RadioGroup>
      
    </div>
  );
};
