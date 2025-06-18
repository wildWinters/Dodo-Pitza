import { nunito700 } from "@/font/fonts";
import { cn } from "@/lib/utils";
import { mockRadioGroup } from "@/modules/main-page/mock/mock-filtered-tabss-radio-group";
import { inputsData } from "@/modules/main-page/mock/mock-input-data";
import { useIngredients } from "@/modules/main-page/hooks/use-ingredients";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { MainIngredientWrapper } from "../ingredients/main-ingredient-wrapper";
import { FilterOption } from "./components/filter-option";
import { FilteredWrapper } from "./components/filtered-wrapper";
import { RadioFilterBlock } from "./components/radio-filter-description";
import { FC, Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const MainComponentFilteredPanel: FC<{ handleInputClick?: () => void }> = () => {
  const titleClass = cn("text-[22px]", nunito700.className);
  const subtitleClass = cn(nunito700.className, "text-[16px]");
  const { ingredients, loading, error } = useIngredients();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <FilteredWrapper>
      <section className="flex flex-col gap-[30px] border-b pb-[20px] border-[rgba(246,246,246,1)]">
        <span className={titleClass}>Filtering</span>
        <div className="flex flex-col gap-[15px]">
          <FilterOption label="Можна збирати" />
          <FilterOption label="Новинки" />

          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton
              key={index}
              className="flex flex-1 w-full min-h-[20px]"
            />
          ))}
        </div>
      </section>
      
      <section className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-[12px]">Ціна від і до:</p>

        <div className="flex gap-3 mb-5">
          {inputsData.map(({ id, placeholder, defaultValue }) => (
            <Input
              key={id}
              type="number"
              className="w-[90px] h-[40px] border border-[rgba(240,240,240,1)]"
              min={0}
              max={5000}
              placeholder={placeholder}
              defaultValue={defaultValue}
            />
          ))}
        </div>
                <Skeleton className="flex flex-1 min-h-[40px]" /> 
      </section>

      <MainIngredientWrapper ingredients={ingredients} />
      <section className="mt-[42px]">
        <span className={subtitleClass}>Тип Теста</span>
        {mockRadioGroup.map(({ id, label }) => (
          <Fragment key={id}> 
            <RadioFilterBlock key={id} id={id} label={label} value={label} />
            <Skeleton className="flex flex-1 w-full min-h-[20px]"/>
          </Fragment>
        ))}
      </section>

      <Button className="bg-[rgba(254,95,0,1)] py-[15px] max-w-[244px] h-[50px] rounded-[18px] my-[34px] text-white text-[16px]">
        Активувати
      </Button>
    </FilteredWrapper>
  );
};
