import { useBasketStore } from "@/store/use-basket-store";
import { nunito800 } from "@/font/fonts";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash } from "lucide-react";
import { Fragment } from "react";
import { PizzazPurchaseBlock } from "@/modules/layout/header/components/pizza-purchase-block";

export const CartSection: React.FC<{isLoading:boolean}> = ({ isLoading }) => {
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
              className={`w-full h-[40px] rounded-[20px] animate-pulse ${isLoading ? true : false}`}
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