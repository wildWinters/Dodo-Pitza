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
import { Fragment, ReactNode } from "react";
import { useBasketStore } from "@/store/use-basket-store";
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

export const RegistrationPanel: React.FC = () => {
  const count = useBasketStore(state => state.count);
  const screenPrice = useBasketStore(state => state.price);

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
      <SheetContent>
        <SheetHeader>
          <SheetTitle className={count > 0 ? "" : "hidden"}>
            в коризині {count} товарів
          </SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>
        <VoidBasket className={count  === 0 ? "" : "hidden" }/>
      </SheetContent>
    </Sheet>
    </DirectionWrapper>
  );
};

import { FC, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { IBasedProps } from "../../footer/main-footer-wrapper";

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
interface IFilledBasket extends IBasedProps {
  mock:any[];
  price: number;
  tax:number;
}

export const FilledBasket:FC<IFilledBasket> = ({ className, ...props}) => {

  return  ( 
    <div className="flex flex-col justify-between" {...props}>
      <div className="flex flex-col gap-[10px]"> 
            <div className="bg-white py-[20px] pl-[20px] pr-[26px]"> 
                <Image
                  src="/11ee7d6108e3a1c9952cd3a7f39a4d02.avif"
                  width={65}
                  height={65}
                  alt="pizza-image"
                />
      </div>
      </div>

      <div className="min-h-[207px] flex flex-col items-center justify-center">
        
      </div>
    </div>
  )
 }