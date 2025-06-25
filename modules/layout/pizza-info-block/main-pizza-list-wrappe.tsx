"use client"
import { nunito400, nunito600, nunito700 } from "@/font/fonts";
import { cn } from "@/lib/utils";
import { mockPizzas } from "@/modules/main-page/mock/mock-data-pitza";
import { Fragment, ReactNode, useState } from "react";
import { Element } from "react-scroll";
import { PizzaDescription } from "./components/pizza-description";
import { PizzaImageBlock } from "./components/pizza-image-block";
import { PizzaPriceBlock } from "./components/pizza-price-block";
import { PizzaWrapper } from "./components/pizza-wrapper";
import { useBasketStore } from "@/store/use-basket-store";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

export type TypeMainPizzaListWrapper = { 
  children?: ReactNode;
  className?: string;
  mockRenderPitza: typeof mockPizzas;
};

export const MainPizzaListWrapper: React.FC<TypeMainPizzaListWrapper> = ({
  children,
  className,
  mockRenderPitza,
  ...props
}) => {
  const isClickedOnSortButton = useBasketStore(state => state.isClickedOnSortButton);
  const [isLoading, setIslaading] = useState<boolean>(false);
  useEffect(() => { 
    const id = setTimeout(() => { 
      setIslaading(true);
    }, 400);
  return () =>  clearTimeout(id);
  }, []);

   return (
    <>
      {mockRenderPitza.map((pizza) => (
        <Fragment key={pizza.title}>  
        <div className="flex flex-col gap-[10px]"> 
        <Element name={pizza.blockMenuDescriptionFOrTAbs}>
              <div
                className={cn(
                  "w-full text-[20px] my-[20px] h-[20px]",
                  nunito600.className,
                  isClickedOnSortButton ? "hidden" : "",
                  !isLoading && "opacity-0"
                )}
              >
                {pizza.blockMenuDescriptionFOrTAbs}
              </div>
              <Skeleton
                className={cn(
                  "w-full h-[30px] mb-2",
                  isLoading && "hidden"
                )}
              />
            </Element>

          <PizzaWrapper  className={cn("h-full", className)} {...props}>
            <PizzaImageBlock
              src={pizza.image}
              alt={pizza.title}
            />
            <PizzaDescription>
              <Skeleton
               className={cn("w-full h-[44px] mb-1", isLoading && "hidden")}
              />
              <span
                  className={cn(
                    `${nunito700.className} text-black text-left`,
                    !isLoading && "opacity-0"
                  )}
                >
                  {pizza.title}
                </span>
              <span className={`${nunito400.className} text-[14px] text-[rgba(177,177,177,1)]`}>
                {pizza.description}
              </span>
            </PizzaDescription>
            <PizzaPriceBlock
              src={pizza.image}
              price={pizza.price}
              mode="button"
              buttonMode="Додати"
              name={pizza.title}
              description={pizza.description}
            />
          </PizzaWrapper>
        </div>
        </Fragment>
      ))}
      {children}
    </>
  );
};
