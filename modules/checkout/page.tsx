"use client";

import { nunito800 } from "@/font/fonts";
import { Trash } from "lucide-react";
import { useBasketStore } from "@/store/use-basket-store";
import { PizzazPurchaseBlock } from "../layout/header/components/pizza-purchase-block";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CheckoutPage() {
  const basketItem = useBasketStore((state) => state.basketItem);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsLoading(false), 10000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <span className={`my-[48px] text-[36px] ${nunito800.className}`}>
        Оформлення Замовлення
      </span>

      <div className="bg-red-800 h-auto max-h-[340px] rouded-[30px] w-full flex-col max-w-[752px] rounded-[30px] px-[35px] py-[30px] flex gap-[45px]">
        <div className="w-full max-w-[745px]">
          <div className="flex items-center justify-between w-full">
            <span className={`text-[30px] ${nunito800.className}`}>1. Корзина</span>
            <span className="text-gray-300 flex items-center gap-[10px] cursor-pointer hover:opacity-80 transition">
              <Trash className="text-gray-300" size={20} />
              <span>Очистити корзину</span>
            </span>
          </div>
        </div>

        {isLoading && (
          <>
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-full h-[40px] rounded-[20px] animate-pulse"
              />
            ))}
          </>
        )}

        {!isLoading &&
          basketItem.map((item) => (
            <Fragment key={item.title + item.description}>
              <PizzazPurchaseBlock
                title={item.title}
                description={item.description}
                price={item.price}
                src={item.src}
                count={item.counts}
              />
            </Fragment>
          ))}
      </div>
    </>
  );
}
