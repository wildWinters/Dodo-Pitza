import Image from "next/image";
import { useBasketStore } from "@/store/use-basket-store";
import { nunito700 } from "@/font/fonts";
import { FC } from "react";
import { Minus, Plus} from "lucide-react";

export interface IPizzazPurchaseBlockProps {
  src?: string;
  title: string;
  description: string;
  price: number | string;
  count: number;
}

export const PizzazPurchaseBlock: FC<IPizzazPurchaseBlockProps> = ({
  src,
  title,
  description,
  price,
  count,
}) => {
  const increaseCount = useBasketStore(state => state.increaseCount);
  const decreaseCount = useBasketStore(state => state.decreaseCount);
  
  return (
    <div className="flex flex-col w-full h-[139px] items-center justify-center">
      <div className="gap-[24px] w-full flex flex-1 basis-[349px]">
        <Image
          className="rounded-full"
          src={src || "/0194d4f6904975a5a6427e297591980d.avif"}
          height={50}
          width={145}
          alt="image-pizza"
        />

        <div className="flex flex-col w-full">
          <div className="flex flex-col">
            <span className={`${nunito700.className} text-[16px]`}>{title}</span>
            <span className="text-[rgba(161,161,161,1)]">{description}</span>
          </div>

          <div className="max-w-[260px] h-[1px] bg-[rgba(237,237,237,1)] my-[12px]" />

          <div className="flex justify-between items-center">
            <div className="flex gap-[9px] items-center">
              <div
                className="border-2 border-[rgba(254,95,0,1)] flex items-center justify-center w-[30px] h-[30px] rounded-[10px]"
                onClick={() => decreaseCount(title)}
              >
                <Minus className="text-[rgba(254,95,0,1)]" size={15} />
              </div>

              <span className={`text-[16px] ${nunito700.className}`}>{count}</span>

              <div
                className="border-2 border-[rgba(254,95,0,1)] flex items-center justify-center w-[30px] h-[30px] rounded-[10px]"
                onClick={() => increaseCount(title)}
              >
                <Plus className="text-[rgba(254,95,0,1)]" size={15} />
              </div>
            </div>

            <span className={`${nunito700.className} text-[16px]`}>
              {price} ₴
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};