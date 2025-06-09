"use client";
import { ChevronDown, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import { Input } from "@/ui/input";
import { cn } from "@/lib/utils";
import { nunito400, nunito700, nunito4 } from "@/font/fonts";
import { TabLister } from "@/modules/layout/tab-list/tab-list";
import { FilteredWrapper } from "@/modules/layout/filtered-panel/components/filtered-wrapper";
import { FilterOption } from "@/modules/layout/filtered-panel/components/filter-option";
import { RadioFilterBlock } from "@/modules/layout/filtered-panel/components/radio-filter-description";
import { mockIngredients } from "@/modules/main-page/mock/filtered-tabs";
import { mockRadioGroup } from "@/modules/main-page/mock/filtered-tabss-radio-group";
import { mockTabs } from "@/modules/main-page/mock/mock-tabs";
import { Button } from "@/ui/button";
import { inputsData } from "@/modules/main-page/mock/mock-input-data";
import { useMainPageStore } from "@/modules/main-page/store/use-main-page-store";
import { nunito600 } from "@/font/fonts";
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
  PizzaPriceBlock
} from "@/modules/layout/pizza-info-block/components/pizza-wrapper";

export default function Home() {

  const defaultCount = useMainPageStore(state  => state.defaultCount);
  const currentPageIndex = useMainPageStore(state => state.currentPageIndex);
  const incrementCurrentPageIndex = useMainPageStore(state => state.incrementCurrentPageIndex);
  const decrementCurrentPageIndex = useMainPageStore(state => state.decrementCurrentPageIndex);
  const maxPageIndex = useMainPageStore(state => state.maxPageCount);
  const toggleBetweenPartAndAllGradients = useMainPageStore(state => state.toggleBetweenPartAndAllGradients);
  const isShowAllGradient = useMainPageStore(state => state.isShowAllGradient);
  const searchElement = useMainPageStore(state=>state.searchElement);
  const setEnteredValueSearchedElement = useMainPageStore(state=>state.setEnteredValueSearchedElement);
  console.log(searchElement);

  return (
    <>
      <div className="rounded-[30px] flex items-center justify-between my-[42px] gap-[50px] border-b border-b-[rgba(237,237,237,1)]">
        <TabLister >
          <div className="flex items-center justify-between w-full py-3">
            <Tabs className="bg-[rgba(249,250,251,1)] rounded-2xl" defaultValue="account">
              <TabsList className="flex gap-2 rounded-md px-2 py-1">
                {mockTabs.map((tab, index) => (
                  <TabsTrigger
                    key={`${tab.label}-${index}`}
                    value={tab.label}
                    className="px-[16px] py-[6px] text-black"
                  >
                    {tab.label}
                    {index === mockTabs.length - 1 && (
                      <ChevronDown className="ml-1 w-[10px] h-[10px]" strokeWidth={2.5} />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-[10px] py-[16px] bg-[rgba(250,250,250,1)] rounded-[15px] mr-[100px]">
              <ArrowUpDown className="text-black" size={16} />
              <span className={`text-[16px] ${nunito400.className}`}>Сортування</span>
              <span className="text-[rgba(254,95,0,1)] text-[16px]">рейтингу</span>
            </div>
          </div>
        </TabLister>
      </div>


      <div className="flex gap-[48px]">
        <div className="order-2 grid grid-cols-3 grid-rows-2 gap-x-[50px] gap-y-[50px] w-full">
          {Array.from({ length: 6 }).map((_, index) => (
            <PizzaWrapper key={index}>
              <PizzaImageBlock src="/image 2.png" alt="Сырный цыпленок" />
              <PizzaDescription>
                <span className={`${nunito700.className} text-black text-left`}>Сырный цыпленок</span>
                <span className={`${nunito400.className} text-[14px] text-[rgba(177,177,177,1)]`}>
                  Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок
                </span>
              </PizzaDescription>
              <PizzaPriceBlock
                price="259"
                mode="button"
                buttonMode="Додати" />
            </PizzaWrapper>
          ))}
        </div>


        <div className="w-fit h-fit">
          <FilteredWrapper>
            {/* Заголовок + чекбокси */}
            <div className="flex flex-col gap-[30px] border-b pb-[20px] border-[rgba(246,246,246,1)]">
              <span className={cn("text-[22px]", nunito700.className)}>Фільтрація</span>
              <div className="flex flex-col gap-[15px]">
                <FilterOption className="" label="Можна збирати" />
                <FilterOption className="" label="Новинки" />
              </div>
            </div>

            {/* Ціновий фільтр */}
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
              <p className="font-bold mb-[12px]">Ціна від і до:</p>
              <div className="flex gap-3 mb-5">
                {inputsData.map(inputInfo => (
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

            <div className={`max-h-[297px]  ${isShowAllGradient ? "overflow-auto" : ""}`}>
              <span>Інгредієнти</span>
              {isShowAllGradient &&  <> 
                <Input className="border-2 bord" placeholder="" onChange={setEnteredValueSearchedElement}/>
              </>
              }
              {mockIngredients.slice(0, defaultCount).map((value) => (
                <FilterOption
                  key={value.label}
                  className={`my-[15px] ${nunito4.className}`}
                  label={value.label}
                />
              ))}
              <span onClick={toggleBetweenPartAndAllGradients} className={`text-[rgba(254,95,0,1)] ${nunito4.className} text-[16px] cursor-pointer`}>
                {isShowAllGradient ?  "Сховати" :  "+Показати всі"}
              </span>
            </div>

            {/* Радіо група */}
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
            <Button className={`bg-[rgba(254,95,0,1)] py-[15px] max-w-[244px] h-[50px] rounded-[18px] my-[34px] text-white text-[16px]`}>Активувати</Button>
          </FilteredWrapper>
        </div>
      </div>


      <div className="flex gap-[40px]  w-full mt-[70px] mb-[60px] items-center justify-center ">
        <Pagination>
          <PaginationContent>
            <PaginationLink  className="hover:border-[rgba(254,95,0,1)] hover:bg-white"  onClick={decrementCurrentPageIndex}>
              <ChevronLeft className="hover:border-[rgba(254,95,0,1)]" onClick={decrementCurrentPageIndex} />
            </PaginationLink>

            {Array.from({ length: 2 }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink href="#">{currentPageIndex + index}</PaginationLink>
              </PaginationItem>
            ))}

            <PaginationLink className="hover:border-[rgba(254,95,0,1)] hover:bg-white" onClick={incrementCurrentPageIndex}>
              <ChevronRight className=""/>
            </PaginationLink>
          </PaginationContent>
        </Pagination>

        <span className={`text-[15px]   text-[rgba(136,136,136,1)] ${nunito600.className} `}>{currentPageIndex} with {maxPageIndex}</span>
      </div>
    </>
  );
}


