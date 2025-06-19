import { nunito700 } from "@/font/fonts";
import { cn } from "@/lib/utils";
import { inputsData, IInputsData } from "@/modules/main-page/mock/mock-input-data";
import { useIngredients } from "@/modules/main-page/hooks/use-ingredients";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { MainIngredientWrapper } from "../ingredients/main-ingredient-wrapper";
import { FilterOption } from "./components/filter-option";
import { FilteredWrapper } from "./components/filtered-wrapper";
import { RadioFilterBlock } from "./components/radio-filter-description";
import { FC, Fragment, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface IFiteringData {
  isAvailable: boolean;
  isNew: boolean;
  priceFrom: number | string;
  priceTo: number | string;
  thin: boolean;
  traditional: boolean;
}

type LabelType = "thin" | "traditional";
type BooleanKeys = "isAvailable" | "isNew" | "thin" | "traditional";
type PriceKeys = "priceFrom" | "priceTo";

interface IMockRadioGroup {
  id: string;
  label: LabelType;
}

const mockRadioGroup: IMockRadioGroup[] = [
  { id: "1", label: "thin" },
  { id: "2", label: "traditional" },
];

export const MainComponentFilteredPanel: FC<{ handleInputClick?: () => void }> = () => {
  const titleClass = cn("text-[22px]", nunito700.className);
  const subtitleClass = cn(nunito700.className, "text-[16px]");
  const { ingredients, loading, error } = useIngredients();

  const [ingredientsFilters, setIngredientsFilters] = useState<IFiteringData>({
    isAvailable: false,
    isNew: false,
    priceFrom: 0,
    priceTo: 5000,
    thin: false,
    traditional: false,
  });

  function handleFilterChange(key: BooleanKeys) {
    setIngredientsFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function handlePriceChange(
    e: React.ChangeEvent<HTMLInputElement>,
    key: PriceKeys
  ) {
    const rawValue = e.target.value;

    if (rawValue === "") {
      setIngredientsFilters((prev) => ({
        ...prev,
        [key]: "",
      }));
      return;
    }

    let value = Number(rawValue);
    if (isNaN(value) || value < 0) value = 0;
    if (value > 5000) value = 5000;

    setIngredientsFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  useEffect(() => {
    console.log("filters updated:", ingredientsFilters);
  }, [ingredientsFilters]);

  return (
    <>
      <div className={loading && !error ? "block" : "hidden"}> Loading... </div>
      <div className={error ? "block" : "hidden"}> Error: {error} </div>

      <FilteredWrapper className={loading ? "hidden" : "block"}>
        <section className="flex flex-col gap-[30px] border-b pb-[20px] border-[rgba(246,246,246,1)]">
          <span className={titleClass}>Filtering</span>
          <div className="flex flex-col gap-[15px]">
            <FilterOption
              label="Можна збирати"
              onClick={() => handleFilterChange("isAvailable")}
            />
            <FilterOption
              label="Новинки"
              onClick={() => handleFilterChange("isNew")}
            />

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
            {inputsData.map(({ id, placeholder, name }: IInputsData) => (
              <Input
                key={id}
                type="number"
                className="w-[90px] h-[40px] border border-[rgba(240,240,240,1)]"
                min={0}
                max={5000}
                placeholder={placeholder}
                value={ingredientsFilters[name]}
                onChange={(e) => handlePriceChange(e, name)}
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
              <RadioFilterBlock
                id={id}
                label={label}
                value={label}
                onClick={() => handleFilterChange(label)}
              />
              <Skeleton className="flex flex-1 w-full min-h-[20px]" />
            </Fragment>
          ))}
        </section>

        <Button className="bg-[rgba(254,95,0,1)] py-[15px] w-full max-w-[244px] h-[50px] rounded-[18px] my-[34px] text-white text-[16px]">
          Активувати
        </Button>
      </FilteredWrapper>
    </>
  );
};
