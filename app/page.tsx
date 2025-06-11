"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  nunito4,
  nunito400,
  nunito600,
  nunito700,
} from "@/font/fonts";
import { cn } from "@/lib/utils";
import { FilterOption } from "@/modules/layout/filtered-panel/components/filter-option";
import { FilteredWrapper } from "@/modules/layout/filtered-panel/components/filtered-wrapper";
import { RadioFilterBlock } from "@/modules/layout/filtered-panel/components/radio-filter-description";
import {
  PizzaDescription,
  PizzaImageBlock,
  PizzaPriceBlock,
  PizzaWrapper,
} from "@/modules/layout/pizza-info-block/components/pizza-wrapper";
import { MainComponentsOfTabList } from "@/modules/layout/tab-list/main-components-of-tab-lists";
import { useMainPageStoreHook } from "@/modules/main-page/hook/use-main-page.hook";
import { mockPizzas } from "@/modules/main-page/mock/mock-data-pitza";
import { mockIngredients } from "@/modules/main-page/mock/mock-filtered-tabs";
import { mockRadioGroup } from "@/modules/main-page/mock/mock-filtered-tabss-radio-group";
import { inputsData } from "@/modules/main-page/mock/mock-input-data";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import {
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useRef } from "react";
import { Element } from "react-scroll";

export default function Home() {
  const {
    defaultCount,
    currentPageIndex,
    incrementCurrentPageIndex,
    decrementCurrentPageIndex,
    isShowAllGradient,
    maxPageIndex,
    toggleBetweenPartAndAllGradients,
    searchElement,
    setEnteredValueSearchedElement,
  } = useMainPageStoreHook();

  const containerRef = useRef<HTMLDivElement | null>(null);


  const filteredIngredients = searchElement
    ? mockIngredients.filter((value) =>
        value.label.toLowerCase().includes(searchElement.trim().toLowerCase())
      )
    : mockIngredients.slice(0, defaultCount);

  return (
    <>

    <MainComponentsOfTabList/>
      <div className="w-full flex mt-[36px] gap-[48px]">
        <div
          ref={containerRef}
          id="scrollContainer"
          className="relative order-2 grid h-[900px] grid-cols-3 auto-rows-auto gap-x-[50px] gap-y-[30px] w-full overflow-auto p-4"
        >
          {mockPizzas.map((pizza, index) => (
            <PizzaWrapper key={index} className="h-full">
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
              <PizzaImageBlock src={pizza.image} alt={pizza.title} />
              <PizzaDescription>
                <span className={`${nunito700.className} text-black text-left`}>
                  {pizza.title}
                </span>
                <span className={`${nunito400.className} text-[14px] text-[rgba(177,177,177,1)]`}>
                  {pizza.description}
                </span>
              </PizzaDescription>
              <PizzaPriceBlock price={pizza.price} mode="button" buttonMode="Додати" />
            </PizzaWrapper>
          ))}
        </div>

        <div className="w-fit h-fit">
          <FilteredWrapper>
            <div className="flex flex-col gap-[30px] border-b pb-[20px] border-[rgba(246,246,246,1)]">
              <span className={cn("text-[22px]", nunito700.className)}>Filtering</span>
              <div className="flex flex-col gap-[15px]">
                <FilterOption className="" label="Можна збирати" />
                <FilterOption className="" label="Новинки" />
              </div>
            </div>

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
              <p className="font-bold mb-[12px]">Ціна від і до:</p>
              <div className="flex gap-3 mb-5">
                {inputsData.map((inputInfo) => (
                  <Input
                    key={inputInfo.id}
                    type="number"
                    className="w-[90px] h-[40px] border border-[rgba(240,240,240,1)]"
                    min={0}
                    max={5000}
                    placeholder={inputInfo.placeholder}
                    defaultValue={inputInfo.defaultValue}
                  />
                ))}
              </div>
            </div>

            <div className={`max-h-[297px] ${isShowAllGradient ? "overflow-auto" : ""}`}>
              <span>Інгредієнти</span>

              {isShowAllGradient && (
                <Input
                  className="border-2 border-gray-600 max-h-[40px] my-[20px]"
                  placeholder="Пошук інгредієнтів..."
                  onChange={(e) => setEnteredValueSearchedElement(e.target.value)}
                />
              )}

              {filteredIngredients.map((value) => (
                <FilterOption
                  key={value.label}
                  className={`my-[15px] ${nunito4.className}`}
                  label={value.label}
                />
              ))}

              <span
                onClick={toggleBetweenPartAndAllGradients}
                className={`text-[rgba(254,95,0,1)] ${nunito4.className} text-[16px] cursor-pointer`}
              >
                {isShowAllGradient ? "Сховати" : "+Показати всі"}
              </span>
            </div>

            <div className="mt-[42px]">
              <span className={`${nunito700.className} text-[16px]`}>Тип Теста</span>
              {mockRadioGroup.map((tab) => (
                <RadioFilterBlock
                  key={tab.label}
                  label={tab.label}
                  value={tab.label}
                  id={tab.id}
                />
              ))}
            </div>

            <Button className="bg-[rgba(254,95,0,1)] py-[15px] max-w-[244px] h-[50px] rounded-[18px] my-[34px] text-white text-[16px]">
              Активувати
            </Button>
          </FilteredWrapper>
        </div>
      </div>



      {/* Пагінація */}
      <div className="flex gap-[40px] w-full mt-[70px] mb-[60px] items-center justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationLink
              className="hover:border-[rgba(254,95,0,1)] hover:bg-white"
              onClick={decrementCurrentPageIndex}
            >
              <ChevronLeft />
            </PaginationLink>
            {Array.from({ length: 2 }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink href="#">{currentPageIndex + index}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationLink
              className="hover:border-[rgba(254,95,0,1)] hover:bg-white"
              onClick={incrementCurrentPageIndex}
            >
              <ChevronRight />
            </PaginationLink>
          </PaginationContent>
        </Pagination>

        <span className={`text-[15px] text-[rgba(136,136,136,1)] ${nunito600.className}`}>
          {currentPageIndex} with {maxPageIndex}
        </span>
      </div>

    </>
  );
}

//  копоенент до 50 рядків коду  має бути 

