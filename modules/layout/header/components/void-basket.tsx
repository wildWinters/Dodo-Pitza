import { FC, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface VoidBasketProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const VoidBasket: FC<VoidBasketProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "h-full w-full flex flex-col items-center justify-center gap-5",
        className
      )}
      {...props}
    >
      <Image
        src="/174b53d6e0efb90ef8ce4fb82d0f992b7486e782.png"
        alt="basket-store"
        width={120}
        height={120}
      />

      <h2 className="text-xl font-semibold">Корзина пуста</h2>

      <p className="max-w-[285px] text-center text-gray-400">
        Добавьте хотя бы одну пиццу, чтобы совершить заказ
      </p>

      <Button className="bg-[rgba(254,95,0,1)] py-4 w-full max-w-[230px] h-[55px] rounded-[18px] mt-8 text-white text-base">
        <ArrowLeft className="w-[13px] h-[12px] mr-2" />
        Вернутися назад
      </Button>
    </div>
  );
};
