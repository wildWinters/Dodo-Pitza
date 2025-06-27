"use client";

import { useState, useEffect, Fragment } from "react";
import { Trash } from "lucide-react";
import { nunito800 } from "@/font/fonts";
import { useBasketStore } from "@/store/use-basket-store";
import { PizzazPurchaseBlock } from "../layout/header/components/pizza-purchase-block";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/ui/input";
import { Label } from "@/components/ui/label";
import { inputFields as initialInputFields } from "./mock/mock-input-field";
import { infoItems } from "./mock/mock-info-items";
import { Button } from "@/ui/button";

type InputField = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  hasError: boolean;
  errorText: string;
  value: string;
};

const CartSection = ({ isLoading }: { isLoading: boolean }) => {
  const basketItem = useBasketStore((state) => state.basketItem);

  return (
    <section className="bg-white rounded-[30px] flex-1 px-[35px] py-[30px] flex flex-col gap-[45px]">
      <div className="flex items-center justify-between ">
        <h2 className={`text-[30px] ${nunito800.className}`}>1. Корзина</h2>
        <span className="text-gray-300 flex items-center gap-[10px] cursor-pointer hover:opacity-80 transition">
          <Trash size={20} />
          Очистити корзину
        </span>
      </div>

      {isLoading
        ? Array.from({ length: 2 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-full h-[40px] rounded-[20px] animate-pulse"
            />
          ))
        : basketItem.map((item) => (
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
    </section>
  );
};

const PersonalInfoForm = ({
  inputFields,
  onChange,
}: {
  inputFields: InputField[];
  onChange: (name: string, value: string) => void;
}) => {
  return (
    <form className="bg-white rounded-[30px] px-[35px] py-[30px] w-full max-w-[752px]">
      <h2 className={`text-[30px] mb-4 ${nunito800.className}`}>
        2. Персональна інформація
      </h2>
      <div className="grid grid-cols-2 gap-[26px]">
        {inputFields.map((field) => (
          <div
            key={field.name}
            className="flex flex-col gap-[5px] max-w-[328px] w-full"
          >
            <Label htmlFor={field.name} className="text-[14px] font-semibold">
              {field.label}
            </Label>
            <Input
              id={field.name}
              type={field.type}
              name={field.name}
              value={field.value}
              placeholder={field.placeholder}
              className={`w-full h-[48px] px-3 rounded-[10px] border-2 ${
                field.hasError ? "border-red-500" : "border-[#EFEFEF]"
              }`}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
            {field.hasError && (
              <span className="text-red-500 text-[14px]">{field.errorText}</span>
            )}
          </div>
        ))}
      </div>
    </form>
  );
};

const SummaryBlock = ({ total }: { total: number }) => {
  return (
    <section className="px-[44px] py-[40px] bg-white rounded-[30px] max-w-[450px] w-full">
      <div className="flex flex-col gap-[20px]">
        <span className="text-[22px]">Итого:</span>
        <span className={`text-[34px] ${nunito800.className}`}>{total}$</span>
      </div>

      <div className="flex flex-col gap-[15px] my-[30px]">
        {infoItems.map(({ label, icon: Icon }) => (
          <span key={label} className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4" />}
            {label}
          </span>
        ))}
      </div>

      <div className="w-full h-[2px] bg-gray-500" />
      <span className="text-[18px] text-[rgba(119,119,119,1)] mt-[17px] mb-[27px]">
        В мене є промокод
      </span>

      <Button className="mx-auto bg-[rgba(254,95,0,1)] py-[15px] w-full max-w-[360px] h-[60px] rounded-[18px] my-[34px] text-white text-[16px]">
        Перейти до оплати
      </Button>
    </section>
  );
};

export default function CheckoutPage() {
  const basketItem = useBasketStore((state) => state.basketItem);
  const [isLoading, setIsLoading] = useState(true);
  const [inputFields, setInputFields] = useState<InputField[]>(initialInputFields);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setInputFields((prev) =>
      prev.map((field) =>
        field.name === name
          ? { ...field, value, hasError: value.trim() === "" }
          : field
      )
    );
  };

  const total = basketItem.reduce(
    (sum, item) => sum + item.price * item.counts,
    0
  );

  return (
    <main className="flex flex-col gap-[45px] px-4">
      <h1 className={`my-[48px] text-[36px] ${nunito800.className}`}>
        Оформлення Замовлення
      </h1>
      <div className="flex w-full flex-wrap lg:flex-nowrap  gap-[45px]">
        <div className="flex flex-col gap-[20px] w-full max-w-[752px]">
          <CartSection isLoading={isLoading} />
          <PersonalInfoForm inputFields={inputFields} onChange={handleInputChange} />
        </div>
        <SummaryBlock total={total} />
      </div>
    </main>
  );
}
