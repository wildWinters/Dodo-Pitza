import { Minus, Plus } from "lucide-react";

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