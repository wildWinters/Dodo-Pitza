"use client";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle, XCircle, CircleCheck } from "lucide-react"
import { cn } from "@/lib/utils";
import { nunito700, nunito600 } from "@/font/fonts";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TabList } from "@/components/ui/full-tab-list";
import { mockSizeTabs } from "@/modules/main-page/mock/mock-size-tabs";
import { mockDoughTabs } from "./mock-dough-tabs";
import { mockAdditions } from "@/modules/main-page/mock/mock-addition";
import { IPizzaPriceBlockProps, SizeMode, DoughType } from "@/modules/main-page/types";
import { useBasketStore } from "@/store/use-basket-store";

const showSuccessToast = () =>
  toast.custom((t) => (
    <div className={`flex items-center gap-3 p-4 bg-green-100 border border-green-300 rounded-lg shadow-md text-green-800 ${t.visible ? "animate-enter" : "animate-leave"}`}>
      <CheckCircle className="w-5 h-5 text-green-600" />
      <p className="font-medium">Покупку підтверджено!</p>
    </div>
  ));

const showErrorToast = () =>
  toast.custom((t) => (
    <div className={`flex items-center gap-3 p-4 bg-red-100 border border-red-300 rounded-lg shadow-md text-red-800 ${t.visible ? "animate-enter" : "animate-leave"}`}>
      <XCircle className="w-5 h-5 text-red-600" />
      <p className="font-medium">Оберіть розмір та тісто, будь ласка.</p>
    </div>
  ));


const usePriceCalculator = (basePrice: number, selected: Set<number>) => {
  return useMemo(() => {
    const extras = [...selected].reduce((acc, i) => acc + Number(mockAdditions[i].price), 0);
    return basePrice + extras;
  }, [basePrice, selected]);
};


const PizzaImagePreview = ({ src, sizeMode }: { src: string; sizeMode?: SizeMode }) => (
  <div className="flex mx-[20px] my-[66px] justify-center items-center w-fit h-full">
    <div className="relative w-[450px] h-[450px] rounded-full border-2 border-dashed border-[rgba(222,222,222,1)] flex items-center justify-center">
      <div className="relative w-[375px] h-[375px] rounded-full border-2 border-dashed border-[rgba(222,222,222,1)] flex items-center justify-center">
        <Image
          src={src}
          alt="pizza"
          priority
          width={1000}
          height={1000}
          className={cn(
            "absolute rounded-[50%] min-w-[300px] min-h-[300px] top-1/2 left-[55%] transform -translate-x-1/2 -translate-y-1/2",
            sizeMode === "medium" && "min-w-[458px] min-h-[452px]",
            sizeMode === "big" && "min-w-[550px] min-h-[540px]"
          )}
        />
      </div>
    </div>
  </div>
);


const AdditionSelector = ({
  selectedAdditions,
  toggle
}: {
  selectedAdditions: Set<number>;
  toggle: (index: number, name: string) => void;
}) => (
  <div className="flex flex-wrap justify-center items-center gap-3">
    {mockAdditions.map((item, index) => {
      const isSelected = selectedAdditions.has(index);
      return (
        <div
          key={item.name}
          onClick={() => toggle(index, item.name)}
          className={cn(
            "relative rounded-[15px] flex max-w-[130px] flex-col px-[10px] pt-[12px] pb-[10px] w-full bg-white cursor-pointer",
            isSelected && "border-2 border-[rgba(254,95,0,1)]"
          )}
        >
          {isSelected && (
            <CircleCheck className="absolute top-1 right-1 w-[28px] h-[28px] text-[rgba(254,95,0,1)]" />
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
      );
    })}
  </div>
);



const AddToBasketButton = ({
  canAdd,
  price,
  onAdd
}: {
  canAdd: boolean;
  price: number;
  onAdd: () => void;
}) => {
  const handleClick = () => {
    if (!canAdd) {
      showErrorToast();
    } else {
      onAdd();
      showSuccessToast();
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="bg-[rgba(254,95,0,1)] mx-auto py-[15px] w-full max-w-[418px] h-[50px] rounded-[18px] my-[34px] text-white text-[16px]"
    >
      Додай корзину {price}
    </Button>
  );
};
import { Skeleton } from "@/components/ui/skeleton";


export const PizzaPriceBlock: React.FC<IPizzaPriceBlockProps> = ({
  className,
  price,
  buttonMode,
  src,
  name,
  description = "",
}) => {
  const [sizeMode, setSizeMode] = useState<SizeMode>();
  const [doughType, setDoughType] = useState<DoughType>();
  const [selectedAdditions, setSelectedAdditions] = useState<Set<number>>(new Set());
  const [chosenTopics, setChosenTopics] = useState<Set<string>>(new Set());
  const [isImitationLoading, setIsImitaionLoading] = useState<boolean>(false);

  const addToBasket = useBasketStore((state) => state.addElementToBasketItem);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsImitaionLoading(true);
    }, 500); // імітація завантаження
    return () => clearTimeout(id);
  }, []);

  const totalPrice = usePriceCalculator(price, selectedAdditions);
  const canAdd = !!sizeMode && !!doughType;
  const sizeLabel = sizeMode ? { small: "20cm", medium: "30cm", big: "40cm" }[sizeMode] : "";

  const toggleAddition = (index: number, name: string) => {
    setSelectedAdditions((prev) => {
      const newSet = new Set(prev);
      newSet.has(index) ? newSet.delete(index) : newSet.add(index);
      return newSet;
    });

    setChosenTopics((prev) => {
      const newSet = new Set(prev);
      newSet.has(name) ? newSet.delete(name) : newSet.add(name);
      return newSet;
    });
  };

  const handleAdd = () => {
    const desc = `${sizeLabel} ${doughType} піца${
      chosenTopics.size > 0 ? ` з: ${Array.from(chosenTopics).join(", ")}` : ""
    }`;

    addToBasket({
      src,
      title: name,
      description: desc,
      price: totalPrice,
      counts: 1,
    });
  };

  return (
    <div className={cn("flex items-center justify-between rounded-[15px] w-full py-2", className)}>
      <Skeleton className={cn("w-[30%] h-[36px] mb-2", isImitationLoading && "hidden")} />
      <span className={cn(nunito700.className, !isImitationLoading && "opacity-0")}>
        від {price} <span className="text-[20px]">$</span>
      </span>

      <Dialog>
        <Skeleton className={cn("w-[120px] h-[36px] rounded-[8px]", isImitationLoading && "hidden")} />
        <DialogTrigger
          className={cn(
            "px-3 py-1 text-sm rounded-[8px] border-none text-[rgba(254,95,0,1)] bg-[rgba(255,250,244,1)]",
            !isImitationLoading && "hidden"
          )}
        >
          {buttonMode}
        </DialogTrigger>

        <DialogContent className="flex rounded-[30px] min-h-[580px] w-fit">
          <PizzaImagePreview src={src} sizeMode={sizeMode} />

          <div className="bg-[rgba(244,241,238,1)] flex flex-col gap-[10px] w-[500px] rounded-r-[30px] min-h-[100%] px-[40px]">


            <div>
              <Skeleton className={cn("w-[80%] h-[24px] mb-2", isImitationLoading && "hidden")} />
              <span
                className={cn(
                  "text-base text-gray-600 font-normal",
                  !isImitationLoading && "opacity-0"
                )}
              >
                <span className="text-black text-[25px] font-[800]">{name}</span> {sizeLabel} {doughType}
                {chosenTopics.size > 0 && ` з: ${Array.from(chosenTopics).join(", ")}`}
              </span>
            </div>


            <div>
              <Skeleton className={cn("w-full h-[36px] mb-2", isImitationLoading && "hidden")} />
              <TabList setState={setSizeMode} mock={mockSizeTabs} />
            </div>

            <div>
              <Skeleton className={cn("w-full h-[36px] mb-2", isImitationLoading && "hidden")} />
              <TabList setState={setDoughType} mock={mockDoughTabs} />
            </div>


            <div className="flex flex-col">
              <Skeleton className={cn("w-[40%] h-[20px] mb-2", isImitationLoading && "hidden")} />
              <span
                className={cn(nunito600.className, "font-[600]", !isImitationLoading && "opacity-0")}
              >
                Додати по смаку
              </span>

              <Skeleton className={cn("w-full h-[100px] mb-4", isImitationLoading && "hidden")} />
              <AdditionSelector selectedAdditions={selectedAdditions} toggle={toggleAddition} />

              <Skeleton className={cn("w-full h-[40px] mb-2", isImitationLoading && "hidden")} />
              <AddToBasketButton canAdd={canAdd} price={totalPrice} onAdd={handleAdd} />
              <Toaster />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
