import { useState, useMemo } from "react";
import Image from "next/image";
import { nunito400, nunito600, nunito700 } from "@/font/fonts";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import { Button } from "@/ui/button";
import { Check } from "lucide-react";
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
import { addOrRemoveFromArray } from "@/utils/add-or-remove-from-array";

export const PizzaPriceBlock: React.FC<IPizzaPriceBlockProps> = ({
  className,
  price,
  buttonMode,
  src,
}) => {
  const [sizeMode, setSizeMode] = useState<SizeMode>(null);
  const [doughType, setDoughType] = useState<DoughType | null>(null);
  const [cardBorder, setCardBorder] = useState<cardBorder>(null);
  const [isBorderExistsOnIndex, setIsBorderExistsOnIndex] = useState<number[]>([]);
  const [isClickedOnTopping, setIsClickedOnTopping] = useState<boolean[]>(
    new Array(mockAdditions.length).fill(false)
  );

  // Динамічний підрахунок ціни
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
      <span
        className={nunito700.className}
      >
        від {price} <span className="text-[20px]">$</span>
      </span>

      <Dialog>
        <DialogTrigger className="px-3 py-1 text-sm rounded-[8px] border-none text-[rgba(254,95,0,1)] bg-[rgba(255,250,244,1)]">
          {buttonMode}
        </DialogTrigger>
        <DialogContent className="flex rounded-[30px]  min-h-[580px] w-fit rounded-4">
          <div className="flex my-[66px] justify-center items-center w-fit h-full">
            <div className="relative w-[450px] h-[450px] rounded-full border-2 border-dashed border-[rgba(222,222,222,1)] flex items-center justify-center">
              <div className="w-[375px] h-[375px] rounded-full border-2 border-dashed border-[rgba(222,222,222,1)] flex items-center justify-center">
                <Image
                  src={src || "/dodo.avif"}
                  alt="image-pitza"
                  width={300}
                  height={300}
                  priority
                  className="rounded-full object-cover"
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
              <Tabs defaultValue="small" className="w-full">
                <TabsList className="w-full h-[39px] p-0 bg-[rgba(236,236,236,1)] rounded-[30px] flex justify-center gap-2">
                  {mockSizeTabs.map(({ label, value }) => (
                    <TabsTrigger
                      key={value}
                      className="px-4 h-[30px] rounded-[30px] text-sm font-medium data-[state=active]:bg-white"
                      value={value}
                      onClick={() => setSizeMode(value as SizeMode)}
                    >
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <Tabs
                defaultValue="traditional"
                className="bg-[rgba(236,236,236,1)] flex items-center w-full h-[39px] rounded-[30px]"
              >
                <TabsList className="w-full flex justify-center gap-2">
                  {mockDoughTabs.map(({ label, value }) => (
                    <TabsTrigger
                      key={value}
                      onClick={() => setDoughType(value as DoughType)}
                      className="rounded-[30px] h-[30px] px-4 text-sm font-medium data-[state=active]:bg-white"
                      value={value}
                    >
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
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
                      isBorderExistsOnIndex.includes(index) &&
                        "border-2 border-[rgba(254,95,0,1)]"
                    )}
                  >
                    {isBorderExistsOnIndex.includes(index) && (
                      <Check className="rounded-full border-2 border-[rgba(254,95,0,1)] aspect-square flex items-center justify-center absolute top-1 right-1 w-[18px] h-[18px] text-[rgba(254,95,0,1)]" />
                    )}
                    <Image src={item.icon} width={110} height={110} alt={item.name} />
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
