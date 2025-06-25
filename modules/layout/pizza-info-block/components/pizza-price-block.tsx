"use client";

import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle, XCircle, CircleCheck } from "lucide-react";
import { useState, useMemo } from 'react';
import Image from "next/image";
import { nunito600, nunito700 } from "@/font/fonts";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockSizeTabs } from "@/modules/main-page/mock/mock-size-tabs";
import { mockDoughTabs } from "./mock-dough-tabs";
import { mockAdditions } from "@/modules/main-page/mock/mock-addition";
import {
  IPizzaPriceBlockProps,
  SizeMode,
  DoughType,
  IAdditionItem,
} from "@/modules/main-page/types/index";
import { TabList } from '@/components/ui/full-tab-list';
import { useBasketStore } from '@/store/use-basket-store';
import { PizzazPurchaseBlock } from '../../header/components/registation-panel';

const success = () =>
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } flex items-center gap-3 p-4 bg-green-100 border border-green-300 rounded-lg shadow-md text-green-800`}
    >
      <CheckCircle className="w-5 h-5 text-green-600" />
      <p className="font-medium">Purchase completed successfully!</p>
    </div>
  ));


const error = () =>
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } flex items-center gap-3 p-4 bg-red-100 border border-red-300 rounded-lg shadow-md text-red-800`}
    >
      <XCircle className="w-5 h-5 text-red-600" />
      <p className="font-medium">Please select size and dough type.</p>
    </div>
  ));

export const PizzaPriceBlock: React.FC<IPizzaPriceBlockProps> = ({
  className,
  price,
  buttonMode,
  src,
  name,
  description="",
}) => {
  const [sizeMode, setSizeMode] = useState<SizeMode>();
  const [doughType, setDoughType] = useState<DoughType>();
  const [selectedAdditions, setSelectedAdditions] = useState<Set<number>>(new Set());
  const [chosenTopics, setChosenTopics] = useState<Set<string>>(new Set());
  const addElementToBasketItem = useBasketStore(state => state.addElementToBasketItem);
  const setChosenCountProducts = useBasketStore(state => state.setChosenCountProducts);
  const setChosenPriceProducts = useBasketStore(state => state.setChosenPriceProducts);

  const sizePitza = {
    small: "20cm",
    medium: "30cm",
    big: "40cm",
  };

  const priceProduct = useMemo(() => {
    const additionsSum = [...selectedAdditions].reduce(
      (sum, index) => sum + Number(mockAdditions[index].price),
      0
    );
    return Number(price) + additionsSum;
  }, [price, selectedAdditions]);

  const toggleAddition = (index: number, name: string) => {
    setSelectedAdditions(prev => {
      const newSet = new Set(prev);
      newSet.has(index) ? newSet.delete(index) : newSet.add(index);
      return newSet;
    });

    setChosenTopics(prev => {
      const newSet = new Set(prev);
      newSet.has(name) ? newSet.delete(name) : newSet.add(name);
      return newSet;
    });
  };

  const renderAdditionItem = (item: IAdditionItem, index: number) => {
    const isSelected = selectedAdditions.has(index);

    return (
      <div
        key={item.name}
        onClick={() => toggleAddition(index, item.name)}
        className={cn(
          "relative rounded-[15px] flex max-w-[130px] flex-col px-[10px] pt-[12px] pb-[10px] w-full bg-white cursor-pointer",
          isSelected && "border-2 border-[rgba(254,95,0,1)]"
        )}
      >
        {isSelected && (
          <CircleCheck className="rounded-full absolute top-1 right-1 w-[28px] h-[28px] text-[rgba(254,95,0,1)]" />
        )}
        <Image src={item.icon} width={110} height={110} alt={item.name} />
        <span className="text-[12px] text-center">{item.name}</span>
        <span className="text-center">{item.price}</span>
      </div>
    );
  };

  return (
    <div className={cn(
      "flex items-center justify-between rounded-[15px] w-full py-2",
      className
    )}>
      <span className={nunito700.className}>
        від {price} <span className="text-[20px]">$</span>
      </span>

      <Dialog>
        <DialogTrigger className="px-3 py-1 text-sm rounded-[8px] border-none text-[rgba(254,95,0,1)] bg-[rgba(255,250,244,1)]">
          {buttonMode}
        </DialogTrigger>
        <DialogContent className="flex rounded-[30px] min-h-[580px] w-fit">
          <div className="flex mx-[20px] my-[66px] justify-center items-center w-fit h-full">
            <div className="relative w-[450px] h-[450px] rounded-full border-2 border-dashed border-[rgba(222,222,222,1)] flex items-center justify-center">
              <div className="relative w-[375px] h-[375px] rounded-full border-2 border-dashed border-[rgba(222,222,222,1)] flex items-center justify-center">
                <Image
                  src={src || "/680565d2826df6b5beafcaedf1ed3943-removebg-preview.png"}
                  alt="image-pitza"
                  priority
                  width={1000}
                  height={1000}
                  className={cn(
                    "absolute rouded-[50%] min-w-[300px] duration-500 transition-all min-h-[300px] top-1/2 left-[55%] transform -translate-x-1/2 -translate-y-1/2",
                    sizeMode === "medium" && "min-w-[458px] min-h-[452px] aspect-square",
                    sizeMode === "big" && "min-w-[550px] min-h-[540px]"
                  )}
                />
              </div>
            </div>
          </div>

          <div className="bg-[rgba(244,241,238,1)] flex flex-col gap-[10px] w-[500px] rounded-r-[30px] min-h-[100%] px-[40px]">
            <span className={`text-[24px] font-[700] ${nunito700.className}`}>{name}</span>
            <span className="text-base text-gray-600 font-normal">
              {sizeMode ? sizePitza[sizeMode] : ''} {doughType} піца
              {chosenTopics.size > 0 && ` з: ${Array.from(chosenTopics).join(", ")}`}
            </span>

            <div className="flex flex-col gap-[10px]">
              <TabList setState={setSizeMode} mock={mockSizeTabs} />
              <TabList setState={setDoughType} mock={mockDoughTabs} />
            </div>

            <div className="flex flex-col">
              <span className={`${nunito600.className} font-[600]`}>Додати по смаку</span>

              <div className="flex flex-wrap justify-center items-center gap-3">
                {mockAdditions.map(renderAdditionItem)}
              </div>

              <Button
                onClick={() => {
                  if (!sizeMode || !doughType) {
                    error();
                    return;
                  }
                  setChosenPriceProducts(priceProduct);
                  setChosenCountProducts();
                  success();
                  addElementToBasketItem({ 
                    src: src,
                    title: name,
                    description: `${sizeMode ? sizePitza[sizeMode] : ''} ${doughType ? doughType : ''} піца${chosenTopics.size > 0 ? ` з: ${Array.from(chosenTopics).join(", ")}` : ''}`,
                    price: priceProduct,
                    counts:0
                  });
                }}
                className="bg-[rgba(254,95,0,1)] mx-auto py-[15px] w-full max-w-[418px] h-[50px] rounded-[18px] my-[34px] text-white text-[16px]"
              >
                Додай корзину {priceProduct}
              </Button>

              <Toaster />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
