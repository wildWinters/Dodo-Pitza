import { Button } from "@/ui/button";
import { nunito800 } from "@/font/fonts";
import { infoItems } from "../mock/mock-info-items";
import { FC } from "react";

export const SummaryBlock: FC<{ total: number }> = ({ total }) => {
  const prices = [total, total  / 100 * 5, "chidori nagashi"];
  
  return (
    <section className="px-[44px] py-[40px] bg-white rounded-[30px] max-h-[490px] max-w-[450px] w-full">
      <div className="flex flex-col gap-[20px]">
        <span className="text-[22px]">Итого:</span>
        <span className={`text-[34px] ${nunito800.className}`}>{total}$</span>
      </div>

      <div className="flex flex-col gap-[15px] my-[30px]">
        {infoItems.map(({ label, icon: Icon }, index) => (
          <div key={label} className="flex items-center justify-between text-[17px] font-medium text-black">
            <span className="flex items-center gap-2">
              {Icon && <Icon className="w-4 h-4" />}
              {label}
            </span>
            <span className="font-bold">{prices[index]}</span>
          </div>
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
