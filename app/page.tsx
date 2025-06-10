"use client";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import { Input } from "@/ui/input";
import { cn } from "@/lib/utils";
import { 
  nunito400,
  nunito700,
  nunito4,
  nunito600,
} from "@/font/fonts";
import { TabLister } from "@/modules/layout/tab-list/tab-list";
import { FilteredWrapper } from "@/modules/layout/filtered-panel/components/filtered-wrapper";
import { FilterOption } from "@/modules/layout/filtered-panel/components/filter-option";
import { RadioFilterBlock } from "@/modules/layout/filtered-panel/components/radio-filter-description";
import { mockIngredients } from "@/modules/main-page/mock/mock-filtered-tabs";
import { mockRadioGroup } from "@/modules/main-page/mock/mock-filtered-tabss-radio-group";
import { mockTabs } from "@/modules/main-page/mock/mock-tabs";
import { Button } from "@/ui/button";
import { inputsData } from "@/modules/main-page/mock/mock-input-data";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  PizzaWrapper,
  PizzaImageBlock,
  PizzaDescription,
  PizzaPriceBlock,
} from "@/modules/layout/pizza-info-block/components/pizza-wrapper";
import { useRef } from "react";
import { useMainPageStoreHook } from "@/modules/main-page/hook/use-main-page.hook";
import { useEffect } from "react";

export default function Home() {
  const pitzaBlockRef = useRef<(HTMLDivElement | null)[]>([]);
    const  { 
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

useEffect(() => { 
  console.log("комопннет ззмонтований");
},);

const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <div className="rounded-[30px] flex items-center w-full justify-between my-[42px] gap-[50px] border-b border-b-[rgba(237,237,237,1)]">
        <TabLister>
          <div className="flex items-center justify-between w-full py-3">
            <Tabs className="bg-[rgba(249,250,251,1)] rounded-2xl" defaultValue="account">
              <TabsList className="flex gap-2 rounded-md px-2 py-1">
                {mockTabs.map((tab, index) => (
                <TabsTrigger
                  key={tab.label}
                  value={tab.label}
                  className="px-[16px] py-[6px] text-black"
                  onClick={() =>
                    pitzaBlockRef.current[index*5]?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  {tab.label}
                  {index === mockTabs.length - 1 && (
                    <ChevronDown className="ml-1 w-[10px] h-[10px]" strokeWidth={2.5} />
                  )}
                </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-[10px] py-[16px] bg-[rgba(250,250,250,1)] rounded-[15px]">
              <ArrowUpDown className="text-black" size={16} />
              <span className={`text-[16px] ${nunito400.className}`}>Сортування</span>
              <span className="text-[rgba(254,95,0,1)] text-[16px]">рейтингу</span>
            </div>
          </div>
        </TabLister>
      </div>

      <div className="flex mt-[36px] gap-[48px]">
          <div
            ref={containerRef}
            id="scrollContainer"
            className="relative order-2 grid h-[900px] grid-cols-3 auto-rows-auto gap-x-[50px] gap-y-[30px] w-full overflow-auto p-4"
          >
          {Array.from({ length: 35 }).map((_, index) => (
            <PizzaWrapper
              key={index}
              ref={(el) => {
                if (el) pitzaBlockRef.current[index] = el;
              }}
              className="h-full"
            >
              <PizzaImageBlock src="/image 2.png" alt="Сырный цыпленок" />
              <PizzaDescription>
                <span className={`${nunito700.className} text-black text-left`}>
                  Cheesy Chicken
                </span>
                <span className={`${nunito400.className} text-[14px] text-[rgba(177,177,177,1)]`}>
                  Chicken, mozzarella, cheddar and parmesan cheeses, cheese sauce, tomatoes, Alfredo sauce, garlic
                </span>
              </PizzaDescription>
              <PizzaPriceBlock price="259" mode="button" buttonMode="Додати" />
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
              {!searchElement &&
                mockIngredients.slice(0, defaultCount).map((value) => (
                  <FilterOption
                    key={value.label}
                    className={`my-[15px] ${nunito4.className}`}
                    label={value.label}
                  />
                ))}
              {searchElement &&
                mockIngredients
                  .filter((value) =>
                    value.label.toLowerCase().includes(searchElement.trim().toLowerCase())
                  )
                  .map((value) => (
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
