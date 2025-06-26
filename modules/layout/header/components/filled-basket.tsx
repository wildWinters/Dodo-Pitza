import { useBasketStore } from "@/store/use-basket-store";
import { FC } from "react";
import { cn } from "@/lib/utils";
import { PizzazPurchaseBlock } from "./pizza-purchase-block";
import { Button } from "@/ui/button";
import { ChevronRight } from "lucide-react";
import { IBasedProps } from "../../footer/main-footer-wrapper";

export interface IFilledBasket extends IBasedProps {
  price?: number;
  tax?: number;
}

export const FilledBasket: FC<IFilledBasket> = ({ className, price, tax, ...props }) => {
  const priceFromBasket = useBasketStore(state => state.price);
  const basketItem = useBasketStore(state => state.basketItem);
  console.log(basketItem);
  const paymentTax = typeof priceFromBasket === "number"
    ? (priceFromBasket * 0.05).toFixed(2)
    : "0.00";
  const summaryItems = [
    {
      label: "Total summary",
      value: price !== undefined ? `${price} $` : `${priceFromBasket} $`,
    },
    {
      label: "Payment 5%",
      value: tax !== undefined ? `${tax} $` : `${paymentTax} $`,
    },
  ];
  
  return (
    <div className={cn("flex mx-[30px]", className)} {...props}>
      <div className="flex flex-col justify-between max-w-[400px] w-full">
        {basketItem.map(item => (
          <PizzazPurchaseBlock
            key={item.title + item.description}
            title={item.title}
            description={item.description}
            price={item.price}
            src={item.src}
            count={item.counts}
          />
        ))}

        <div className="min-h-[207px] pt-[38px] pb-[30px] flex flex-col gap-6">
          {summaryItems.map(item => (
            <div
              key={item.label}
              className="flex items-center justify-between w-full gap-3"
            >
              <span className="text-[16px] font-medium whitespace-nowrap">{item.label}</span>
              <div className="flex-grow border-t-2 border-dashed border-[rgba(223,223,223,1)] h-0" />
              <span className="text-[16px] font-semibold whitespace-nowrap">{item.value}</span>
            </div>
          ))}

          <Button
            className="mx-auto bg-[rgba(254,95,0,1)] flex items-center justify-center gap-[20px] py-[15px] w-full max-w-[325px] h-[50px] rounded-[18px] mt-[34px] text-white text-[16px]"
          >
            Оформити замовлення <ChevronRight size={40} />
          </Button>
        </div>
      </div>
    </div>
  );
};
