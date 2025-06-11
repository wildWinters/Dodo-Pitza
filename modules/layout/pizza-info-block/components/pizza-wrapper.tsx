import { nunito700 } from "@/font/fonts";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Minus, Plus, Settings2 } from "lucide-react";
import Image from "next/image";
import { forwardRef, ReactNode, useState } from "react";
import { IBasedProps } from "../../footer/main-footer-wrapper";

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

export const PizzaImageBlock: React.FC<{
  className?: string;
  src: string;
  alt: string;
}> = ({ className, src, alt }) => (
  <div className={cn("flex items-center justify-center relative bg-[rgba(255,247,238,1)] rounded-[15px]", className)}>
    <Settings2 size={24} className="text-[rgba(254,95,0,1)] absolute top-[24px] right-[24px]" />
    <Image className="rounded-full" src={src} width={211} height={212} alt={alt} />
  </div>
);

// Блок опису піци
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

// Блок з ціною і кнопкою
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

// Альтернативний блок опису з кнопкою-іконкою
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

interface CounterProps {
  sign: "minus" | "plus";
  className?: string;
  onClick?: () => void;
}

export const Counter: React.FC<CounterProps> = ({ sign, className, onClick }) => {
  const Icon = sign === "minus" ? Minus : Plus;

  return (
    <div
      className={`flex items-center justify-center w-[42px] h-[42px] cursor-pointer ${className ?? ""}`}
      onClick={onClick}
    >
      <Icon />
    </div>
  );
};

export const CounterBlock: React.FC = () => {
  const [count, setCount] = useState<number>(1);

  return (
    <div className="flex items-center gap-[14px]">
      <Counter sign="minus" onClick={() => setCount((prev) => Math.max(1, prev - 1))} />
      <span>{count}</span>
      <Counter sign="plus" onClick={() => setCount((prev) => prev + 1)} />
    </div>
  );
};

