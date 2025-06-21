import { useState } from "react";
import Image from "next/image";
import { nunito400, nunito600, nunito700 } from "@/font/fonts";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Nunito } from "next/font/google";

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

export const PizzaPriceBlock: React.FC<PizzaPriceBlockProps> = ({
  className,
  price,
  mode,
  buttonMode,
  src,
}) => {
  const [sizeMode, setSizeMode] = useState<SizeMode>(null);
  const [doughType, setDoughType] = useState<DoughType | null>(null);

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

      <Dialog >
        <DialogTrigger className="px-3 py-1 text-sm rounded-[8px] border-none text-[rgba(254,95,0,1)] bg-[rgba(255,250,244,1)]">
          {buttonMode}
        </DialogTrigger>

        <DialogContent className="flex   min-h-[580px] rounded-4">
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

          <div className={`bg-[rgba(244,241,238,1)] flex flex-col gap-[10px] w-full  max-w-[500px]`}>
              <span className={`text-[24px] font-[700] ${nunito700.className}`}>Паперони фреш</span>
              <span className={`${nunito400.className} font-[400] text-[rgba(119,119,119,1)]`}>25 см, традиционное тесто 25, 380 г</span>
                <div className="flex flex-col gap-[10px]">
                  <Tabs defaultValue="account" className="w-full">
                    <TabsList className="w-full h-[39px] p-0 bg-[rgba(236,236,236,1)] rounded-[30px] flex justify-center gap-2">
                      <TabsTrigger
                        className="px-4 h-[30px] rounded-[30px] text-sm font-medium data-[state=active]:bg-white"
                        value="account"
                      >
                        Account
                      </TabsTrigger>
                      <TabsTrigger
                        className="px-4 h-[30px] rounded-[30px] text-sm font-medium data-[state=active]:bg-white"
                        value="password"
                      >
                        Password
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                <Tabs defaultValue="account" className="bg-[rgba(236,236,236,1)]  w-full h-[39px] rounded-[30px]">
                  <TabsList className="w-full">
                    <TabsTrigger className="rounded-[30px] h-[30px] " value="account">Account</TabsTrigger>
                    <TabsTrigger className="rounded-[30px] h-[30px]" value="password">Password</TabsTrigger>
                  </TabsList>
                </Tabs>
            </div>

            <div className="flex flex-col">
              <span className={`${nunito600.className} font-[600]`}>Добавить по вкусу</span>
                <div className="flex gap-[14px]">
                      {Array.from({ length: 3 }).map((_, index) => ( 
                      <> 
                        <div className="rounded-[15px] flex max-w-[130] flex-col px-[10px] pt-[12px] pb-[10px] w-full bg-white" key={index}>
                          <Image 
                            src="/pitza-icon.png"
                            width={110}
                            height={110}
                            alt="pitza-icon"
                          /> 
                          <span className="text-[12px]">Сирний Ботик</span>
                          <span className="">179P</span>
                        </div>
                      </>
                    ))}
                </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
//! хрінь яку треба рефакторитти скади що там не акт