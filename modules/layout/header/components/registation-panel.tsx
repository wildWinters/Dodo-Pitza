"use client"
import { DirectionWrapper } from "../../wrapper/direction-wrapper";
import { mockMenuItems } from "@/modules/main-page/mock/mock-menu";
import { Button } from "@/ui/button";
import { User } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { nunito600 } from "@/font/fonts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Fragment, useState} from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { nunito700 } from "@/font/fonts";
import { useBasketStore } from "@/store/use-basket-store";

export const RegistrationPanel: React.FC = () => {
  const count = useBasketStore(state => state.count);
  const screenPrice = useBasketStore(state => state.price);
  const basketItem = useBasketStore(state => state.basketItem);
  const addElementToBasketItem = useBasketStore(state => state.addElementToBasketItem);

  return (
    <DirectionWrapper direction="row">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`text-[16px] justify-center font-[900] text-[rgba(254,95,0,1)] py-[13px] px-4 max-w-[110px] w-full border-1 border-[rgba(254,95,0,1)] rounded-[5px] flex items-center gap-[10px] ${nunito600.className}`}
        >
          <User className="min-w-[20px] min-h-[20px]" />
          <span className="font-[700]">Увійти</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {mockMenuItems.map((value, index) => (
            <Fragment key={index}>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={`hover:bg-[rgba(255, 250, 246, 1)] min-h-[38px] max-w-[138px] w-full text-black text-[14px] flex text-left hover:text-[rgba(254,95,0,1)] pl-[16px] ${nunito600.className}`}
              >
                {value.label}
              </DropdownMenuItem>
            </Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Sheet>
        <SheetTrigger>
          <Button className="bg-[rgba(254,95,0,1)]  h-[50px] w-fit text-white  rounded-[15px] border-[1px]">
          <span>{screenPrice}$</span>
          <span>|</span>
          <ShoppingCart size={16} className="text-white" />
          <span className="text-[14px]">{count}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col space-justify-between">
        <SheetHeader>
          <SheetTitle className={count > 0 ? "" : "hidden"}>
            в коризині {count} товарів
          </SheetTitle>
          
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>
        <VoidBasket className={count  === 0 ? "" : "hidden" }/>
        <FilledBasket className={count  !== 0 ? "" : "hidden" }/>
      </SheetContent>
    </Sheet>
    </DirectionWrapper>
  );
};

import { FC, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { IBasedProps } from "../../footer/main-footer-wrapper";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";

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

import { ChevronRight } from "lucide-react";

interface IFilledBasket extends IBasedProps {
  price?: number;
  tax?: number;
}

// ! виинести знаю коменти урк  мовою не терба писати 
export const FilledBasket: FC<IFilledBasket> = ({ className, price, tax, ...props }) => {
  const summaryItems = [
    { label: "Total summary", value: price !== undefined ? `${price} $` : "чідорі" },
    { label: "Payment 5%", value: tax !== undefined ? `${tax} $` : "наруто" },
  ];

  const basketItem = useBasketStore(state => state.basketItem)
  const addElementToBasketItem = useBasketStore(state => state.addElementToBasketItem);

  return (
    <div
      className={cn(
        "flex justify-center" , 
        className
      )}
      {...props}
    >
      <div className="flex flex-col justify-between max-w-[400px] w-full">
        {basketItem.map(item =>  
          <PizzazPurchaseBlock  
            key={item.title + item.description}
            title={item.title}
            description={item.description}
            price={item.price}
            src={item.src}
            count={item.counts}
          />
        )}

        <div className="min-h-[207px] pt-[38px] pb-[30px] px-[35px] flex flex-col gap-6">
          {summaryItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full gap-3"
            >
              <span className="text-[16px] font-medium whitespace-nowrap">{item.label}</span>


              <div className="flex-grow border-t-2 border-dashed border-[rgba(223,223,223,1)] h-0" />

              <span className="text-[16px] font-semibold whitespace-nowrap">{item.value}</span>
            </div>
          ))}

          <Button
            className="bg-[rgba(254,95,0,1)] flex items-center justify-center gap-[20px] py-[15px] w-full max-w-[325px] h-[50px] rounded-[18px] mt-[34px] text-white text-[16px]"
          >
            Оформити замовлення <ChevronRight size={40}/>
          </Button>
        </div>
      </div>
    </div>
  );
};
//! винести 
export interface IPizzazPurchaseBlockProps {
  src?: string;
  title: string;
  description: string;
  price: number | string;
  count: number;
}

export const PizzazPurchaseBlock: FC<IPizzazPurchaseBlockProps> = ({
  src,
  title,
  description,
  price,
  count,
}) => {
  const increaseCount = useBasketStore(state => state.increaseCount);
  const decreaseCount = useBasketStore(state => state.decreaseCount);
  
  return (
    <div className="flex flex-col w-full h-[139px] items-center justify-center">
      <div className="gap-[24px] w-full flex flex-1 basis-[349px]">
        <Image
          className="rounded-full"
          src={src || "/0194d4f6904975a5a6427e297591980d.avif"}
          height={50}
          width={145}
          alt="image-pizza"
        />

        <div className="flex flex-col w-full">
          <div className="flex flex-col">
            <span className={`${nunito700.className} text-[16px]`}>{title}</span>
            <span className="text-[rgba(161,161,161,1)]">{description}</span>
          </div>

          <div className="max-w-[260px] h-[1px] bg-[rgba(237,237,237,1)] my-[12px]" />

          <div className="flex justify-between items-center">
            <div className="flex gap-[9px] items-center">
              <div
                className="border-2 border-[rgba(254,95,0,1)] flex items-center justify-center w-[30px] h-[30px] rounded-[10px]"
                onClick={() => decreaseCount(title)}
              >
                <Minus className="text-[rgba(254,95,0,1)]" size={15} />
              </div>

              <span className={`text-[16px] ${nunito700.className}`}>{count}</span>

              <div
                className="border-2 border-[rgba(254,95,0,1)] flex items-center justify-center w-[30px] h-[30px] rounded-[10px]"
                onClick={() => increaseCount(title)}
              >
                <Plus className="text-[rgba(254,95,0,1)]" size={15} />
              </div>
            </div>

            <span className={`${nunito700.className} text-[16px]`}>
              {price} ₴
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};