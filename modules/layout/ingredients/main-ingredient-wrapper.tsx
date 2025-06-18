import { nunito400 } from "@/font/fonts";
import { cn } from "@/lib/utils";
import { Ingredient } from "@/app/api/ingredients/mock-ingredients";
import { useMainPageStore } from "@/modules/main-page/store/use-main-page.store";
import { Input } from "@/ui/input";
import React from "react";
import { FilterOption } from "../aside-filtered-panel/components/filter-option";
import { Skeleton } from "@/components/ui/skeleton";
export type TMainIngredientWrapper = {
  className?: string;
  ingredients: Ingredient[];
};

export const MainIngredientWrapper: React.FC<TMainIngredientWrapper> = ({ className, ingredients }) => {
  const defaultCount = useMainPageStore(state => state.defaultCount);
  const isShowAllGradient = useMainPageStore(state => state.isShowAllGradient);
  const setEnteredValueSearchedElement = useMainPageStore(state => state.setEnteredValueSearchedElement);
  const searchElement = useMainPageStore(state => state.searchElement);
  const toggleBetweenPartAndAllGradients = useMainPageStore(state => state.toggleBetweenPartAndAllGradients);

  const filteredIngredients = searchElement
    ? ingredients.filter((item) =>
        item.name.toLowerCase().includes(searchElement.trim().toLowerCase())
      )
    : ingredients.slice(0, defaultCount);

  return (
    <div
      className={cn(
        "max-h-[360px]",
        isShowAllGradient && "overflow-auto",
        className
      )}
    >
      <span className="text-lg font-semibold mb-2 block">Інгредієнти</span>

      {isShowAllGradient && (
        <Input
          className="border-2 border-gray-600 max-h-[40px] my-5"
          placeholder="Пошук інгредієнтів..."
          onChange={(e) => setEnteredValueSearchedElement(e.target.value)}
        />
      )}

      {filteredIngredients.map((item) => (
        <> 
          <FilterOption
            key={item.id}
            className={cn("my-[15px]", nunito400.className)}
            label={item.name}
          />
          <Skeleton className="flex flex-1 min-h-[30px]"/>
        </>
      ))}

      <span
        onClick={toggleBetweenPartAndAllGradients}
        className={cn(
          "text-[rgba(254,95,0,1)] mt-[60px] text-[16px] cursor-pointer",
          nunito400.className
        )}
      >
        {isShowAllGradient ? "Сховати" : "+Показати всі"}
      </span>
    </div>
  );
};
