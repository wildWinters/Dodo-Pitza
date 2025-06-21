import { useState } from "react";
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

type ButtonDescription = "Собрать" | "Додати";
type Mode = "button" | "counter";
type SizeMode = "small" | "medium" | "big" | null;
type DoughType = "thin" | "traditional";

interface PizzaPriceBlockProps {
  className?: string;
  price: string | number;
  mode: Mode;
  buttonMode: ButtonDescription;
  src?: string;
}

const mockSizeTabs = [
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Big", value: "big" },
];

const mockDoughTabs = [
  { label: "Traditional", value: "traditional" },
  { label: "Thin", value: "thin" },
];

const mockAdditions = [
  { name: "Сирний Ботик", price: "179₴", icon: "/pitza-icon.png" },
  { name: "Ковбаска Пепероні", price: "199₴", icon: "/pitza-icon.png" },
  { name: "Гриби Шампіньйони", price: "159₴", icon: "/pitza-icon.png" },
];

export const PizzaPriceBlock: React.FC<PizzaPriceBlockProps> = ({
  className,
  price,
  mode,
  buttonMode,
  src,
}) => {
  const [sizeMode, setSizeMode] = useState<SizeMode>(null);
  const [doughType, setDoughType] = useState<DoughType | null>(null);
  const [cardBorder, setCardBorder] = useState<number | null>(null);

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

        <DialogContent className="flex items-center min-h-[580px] rounded-4">
          <div className="flex justify-center items-center w-full h-full">
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

          <div className={`bg-[rgba(244,241,238,1)] flex flex-col gap-[10px] w-full  max-w-[500px] px-[40px]`}>
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

              <Tabs defaultValue="traditional" className="bg-[rgba(236,236,236,1)] flex items-center w-full h-[39px] rounded-[30px]">
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
              <div className="flex justify-between items-center gap-2">
                {mockAdditions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setCardBorder(index)}
                    className={cn(
                      "relative rounded-[15px] flex max-w-[130px] flex-col px-[10px] pt-[12px] pb-[10px] w-full bg-white cursor-pointer",
                      cardBorder === index && "border-2 border-[rgba(254,95,0,1)]"
                    )}
                  >
                    {cardBorder === index && (
                      <Check className="rounded-full border-2 border-[rgba(254,95,0,1)]  aspect-square flex items-center justify-center absolute top-1 right-1 w-[18px] h-[18px] text-[rgba(254,95,0,1)]" />
                    )}
                    <Image src={item.icon} width={110} height={110} alt={item.name} />
                    <span className="text-[12px]">{item.name}</span>
                    <span>{item.price}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`bg-[rgba(254,95,0,1)] mx-auto py-[15px] w-full max-w-[418px] h-[50px] rounded-[18px] my-[34px] text-white text-[16px]`}
              >
                Додай корзину через Ореста
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
