import { useState, useMemo, Dispatch, SetStateAction } from 'react';
import Image from "next/image";
import { nunito400, nunito600, nunito700 } from "@/font/fonts";
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
  cardBorder,
} from "@/modules/main-page/types/index";
import { CircleCheck } from "lucide-react";
import { TabList } from '@/components/ui/full-tab-list';

export const PizzaPriceBlock: React.FC<IPizzaPriceBlockProps> = ({
  className,
  price,
  buttonMode,
  src,
}) => {
  const [sizeMode, setSizeMode] = useState<SizeMode>(undefined); 
  const [doughType, setDoughType] = useState<DoughType>(null);
  const [cardBorder, setCardBorder] = useState<cardBorder>(null);
  const [isBorderExistsOnIndex, setIsBorderExistsOnIndex] = useState<number[]>([]);
  const [isClickedOnTopping, setIsClickedOnTopping] = useState<boolean[]>(
    new Array(mockAdditions.length).fill(false)
  );

  const priceProduct = useMemo(() => {
    const selectedAdditionsSum = isBorderExistsOnIndex.reduce(
      (sum, idx) => sum + Number(mockAdditions[idx].price),
      0
    );
    return Number(price) + selectedAdditionsSum;
  }, [price, isBorderExistsOnIndex]);

  const handleToppingClick = (index: number, toppingPrice: number) => {
    setIsClickedOnTopping((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
    setIsBorderExistsOnIndex((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
    setCardBorder(index);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-[15px] w-full py-2",
        className
      )}
    >
      <span className={nunito700.className}>
        від {price} <span className="text-[20px]">$</span>
      </span>

      <Dialog>
        <DialogTrigger className="px-3 py-1 text-sm rounded-[8px] border-none text-[rgba(254,95,0,1)] bg-[rgba(255,250,244,1)]">
          {buttonMode}
        </DialogTrigger>

        <DialogContent className="flex  rounded-[30px] min-h-[580px] w-fit">
          {/* Pizza image block */}
          <div className="flex  mx-[20px] my-[66px] justify-center items-center w-fit h-full">
            <div className="relative w-[450px] h-[450px] rounded-full border-2 border-dashed border-[rgba(222,222,222,1)] flex items-center justify-center">
              <div className="relative w-[375px] h-[375px] rounded-full border-2 border-dashed border-[rgba(222,222,222,1)] flex items-center justify-center">
                <Image
                  src={src || "/680565d2826df6b5beafcaedf1ed3943-removebg-preview.png"}
                  alt="image-pitza"
                  priority
                  width={1000}
                  height={1000}
                  className={cn(
                    "absolute min-w-[300px]  duration-500 transition-all min-h-[300px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full",
                    sizeMode === "medium" && "min-w-[458px] min-h-[452px] aspect-square",
                    sizeMode === "big" && "min-w-[550px] min-h-[540px] "
                  )}
                />
              </div>
            </div>
          </div>

          <div className="bg-[rgba(244,241,238,1)] flex flex-col gap-[10px] w-[500px] rounded-r-[30px] min-h-[100%] px-[40px]">
            <span className={`text-[24px] font-[700] ${nunito700.className}`}>Паперони фреш</span>
            <span className={`${nunito400.className} font-[400] text-[rgba(119,119,119,1)]`}>
              25 см, традиционное тесто 25, 380 г
            </span>

            <div className="flex flex-col gap-[10px]">
              <TabList  setState={setSizeMode} mock={mockSizeTabs} />
              <TabList  setState={setDoughType} mock={mockDoughTabs} />
            </div>
            
            <div className="flex flex-col">
              <span className={`${nunito600.className} font-[600]`}>Додати по смаку</span>

              <div className="flex flex-wrap justify-center items-center gap-3">
                {mockAdditions.map((item: IAdditionItem, index) => (
                  <div
                    key={item.name}
                    onClick={() => handleToppingClick(index, Number(item.price))}
                    className={cn(
                      "relative rounded-[15px] flex max-w-[130px] flex-col px-[10px] pt-[12px] pb-[10px] w-full bg-white cursor-pointer",
                      isBorderExistsOnIndex.includes(index) && "border-2 border-[rgba(254,95,0,1)]"
                    )}
                  >
                    {isBorderExistsOnIndex.includes(index) && (
                      <CircleCheck className="rounded-full  border-[rgba(254,95,0,1)]  absolute top-1 right-1 w-[28px] h-[28px] text-[rgba(254,95,0,1)]" />
                    )}

                    <Image
                      src={item.icon}
                      width={110}
                      height={110}
                      alt={item.name}
                    />
                    <span className="text-[12px] text-center">{item.name}</span>
                    <span className="text-center">{item.price}</span>
                  </div>
                ))}
              </div>
              <Button className="bg-[rgba(254,95,0,1)] mx-auto py-[15px] w-full max-w-[418px] h-[50px] rounded-[18px] my-[34px] text-white text-[16px]">
                Додай корзину {priceProduct}
              </Button>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};



