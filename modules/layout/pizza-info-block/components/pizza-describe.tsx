import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import Image from "next/image";

export const PizzaDescribe: React.FC<{
  price: string | number;
  description: string;
  className?: string;
  icon: "plus" | "add";
  isButtonOrCounter: boolean;
}> = ({ price, description, className, icon, isButtonOrCounter }) => {
  const chooseIcon = icon === "add" ? "/Group (1).png" : "/Vector (15).png";

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <span>від {price}</span>
      {isButtonOrCounter ? (
        <Button className="rounded-[15px] bg-[rgba(255,250,244,1)] max-w-[125px] min-h-[42px] flex items-center gap-[6px]">
          <Image src={chooseIcon} alt={icon} width={14} height={14} />
          {description}
        </Button>
      ) : null}
    </div>
  );
};