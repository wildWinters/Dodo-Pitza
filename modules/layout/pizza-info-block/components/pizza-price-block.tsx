import { nunito700 } from "@/font/fonts";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";

export const PizzaPriceBlock: React.FC<{
  className?: string;
  price: string;
  mode: "button" | "counter";
  buttonMode: "Собрать" | "Додати";
}> = ({ className, price, buttonMode }) => {
  const buttonText = buttonMode === "Додати" ? "Додати" : "Собрать";

  return (
    <div className={cn("flex items-center justify-between rounded-[15px] w-full    py-2", className)}>
      <span className={nunito700.className}>
        від {price} <span className="text-[20px]">$</span>
      </span>
      <Button className="px-3 py-1 text-sm rounded-[8px]  border-none text-[rgba(254,95,0,1)]   bg-[rgba(255,250,244,1)]">{buttonText}</Button>
    </div>
  );
};
