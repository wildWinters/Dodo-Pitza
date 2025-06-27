"use client";
import { nunito800 } from "@/font/fonts";
import { Trash } from "lucide-react";
import { useBasketStore } from "@/store/use-basket-store";
import { PizzazPurchaseBlock } from "../layout/header/components/pizza-purchase-block";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment, useEffect, useState } from "react";
import { Input } from "@/ui/input";
import { Label } from "@/components/ui/label";
import { inputFields } from "./mock/mock-input-field";
import { infoItems } from "./mock/mock-info-items";
import { Button } from "@/ui/button";

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

      <div className=""> 
         
      <div className="bg-white h-auto max-h-[340px] rounded-[30px] w-full flex-col max-w-[752px] px-[35px] py-[30px] flex gap-[45px]">
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

        <div className="grid grid-cols-2 grid-rows-2 max-w-[752px] gap-[26px] mt-[20px]">
          {inputFields.map((field) => (
          <div key={field.name} className=" grid-rows-2 gap-[5px] w-full max-w-[328px]">
            <Label className="text-[14px] font-semibold">{field.label}</Label>
            <Input
              type={field.type}
              name={field.name}
              value={field.value}
              placeholder={field.placeholder}
              className={`w-full h-[48px] px-3 rounded-[10px] border-2 ${
                field.hasError ? "border-red-500" : "border-[#EFEFEF]"
              }`}
            />
              {field.hasError && (
                <span className="text-red-500 text-[14px]">{field.errorText}</span>
              )}
            </div>
          ))}
      </div>

      <div className="px-[44px] py-[40px] rounded-[30px] max-w-[450px] max-h-[490px]"> 
        <div className="flex flex-col gap-[20px]"> 
          <span className="text-[22px] ">Итого:</span>
          <span className={`text-[34px] ${nunito800.className}`}>2365$</span>
        </div>

        <div className="flex flex-col gap-[15px] my-[30px] ">   
          {infoItems.map(({ label, icon: Icon }) => (
          <span key={label} className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4" />}
            {label}
              </span>
          ))}
        </div>
        <div className="w-full h-[2px] bg-gray-500 " />
        <span className="text-[18px] text-[rgba(119,119,119,1)] mt-[17px] mb-[27px]">В мене є промокод</span>
        <Button   className="mx-auto bg-[rgba(254,95,0,1)] py-[15px] w-full max-w-[360px] h-[60px] rounded-[18px] my-[34px] text-white text-[16px]">
          Перейти до оплати
        </Button>
      </div>

    </div>
    </>
  );
}
