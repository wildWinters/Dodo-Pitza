"use client";
import { useState, useEffect} from "react";
import { nunito800 } from "@/font/fonts";
import { useBasketStore } from "@/store/use-basket-store";
import { inputFields as initialInputFields } from "./mock/mock-input-field";
import { SummaryBlock } from "./widgets/summary-block";
import { PersonalInfoForm } from "./widgets/personal-info-form";
import { CartSection } from "./widgets/cart-section";
import { type InputField } from "./types/type";

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
      <span className={`my-[48px] text-[36px] ${nunito800.className}`}>
        Оформлення Замовлення
      </span>
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
