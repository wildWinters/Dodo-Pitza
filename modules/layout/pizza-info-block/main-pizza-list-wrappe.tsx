"use client"
import { nunito400, nunito600, nunito700 } from "@/font/fonts";
import { cn } from "@/lib/utils";
import { mockPizzas } from "@/modules/main-page/mock/mock-data-pitza";
import { ReactNode } from "react";
import { Element } from "react-scroll";
import { PizzaDescription } from "./components/pizza-description";
import { PizzaImageBlock } from "./components/pizza-image-block";
import { PizzaPriceBlock } from "./components/pizza-price-block";
import { PizzaWrapper } from "./components/pizza-wrapper";

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
  return (
    <>
      {mockRenderPitza.map((pizza, index) => (
        <PizzaWrapper  className={cn("h-full", className)} key={index} {...props}>
          <Element name={pizza.blockMenuDescriptionFOrTAbs}>
            <span
              className={cn(
                "text-[20px]",
                nunito600.className,
                pizza?.blockMenuDescriptionFOrTAbs ? "block" : "hidden"
              )}
            >
              {pizza.blockMenuDescriptionFOrTAbs}
            </span>
          </Element>
          <PizzaImageBlock
            src={pizza.image}
            alt={pizza.title}
          />
          <PizzaDescription>
            <span className={`${nunito700.className} text-black text-left`}>
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
          />
        </PizzaWrapper>
      ))}
      {children}
    </>
  );
};
