"use client"

import { nunito700 } from "@/font/fonts"
import { cn } from "@/lib/utils"
import { inputsData, IInputsData } from "@/modules/main-page/mock/mock-input-data"
import { useIngredients } from "@/modules/main-page/hooks/use-ingredients"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { MainIngredientWrapper } from "../ingredients/main-ingredient-wrapper"
import { FilterOption } from "./components/filter-option"
import { FilteredWrapper } from "./components/filtered-wrapper"
import { RadioFilterBlock } from "./components/radio-filter-description"
import { FC, useState, useEffect } from "react"
import { Slider } from "@/ui/slider"
import { Skeleton } from "@/components/ui/skeleton"

export interface IFiteringData {
  isAvailable: boolean | null
  isNew: boolean | null
  priceFrom: number | string
  priceTo: number | string
  thin: boolean | null
  traditional: boolean | null
  "20cm": boolean | null
  "30cm": boolean | null
  "40cm": boolean | null
}

type LabelType = "thin" | "traditional"
type BooleanKeys = "isAvailable" | "isNew" | "thin" | "traditional" | "20cm" | "30cm" | "40cm"
type PriceKeys = "priceFrom" | "priceTo"

interface IMockRadioGroup {
  id: string
  label: LabelType
}

const mockRadioGroup: IMockRadioGroup[] = [
  { id: "1", label: "thin" },
  { id: "2", label: "traditional" },
]

const sizeOptions: { label: BooleanKeys }[] = [
  { label: "20cm" },
  { label: "30cm" },
  { label: "40cm" },
]

const filterOptions: { label: string; key: BooleanKeys }[] = [
  { label: "Можна збирати", key: "isAvailable" },
  { label: "Новинки", key: "isNew" },
]

export const MainComponentFilteredPanel: FC<{ handleInputClick?: () => void }> = () => {
  const titleClass = cn("text-[22px]", nunito700.className)
  const subtitleClass = cn(nunito700.className, "text-[16px]")
  const { ingredients, loading } = useIngredients()

  const [ingredientsFilters, setIngredientsFilters] = useState<IFiteringData>({
    isAvailable: null,
    isNew: null,
    priceFrom: 0,
    priceTo: 5000,
    thin: null,
    traditional: null,
    "20cm": null,
    "30cm": null,
    "40cm": null,
  })

  const range: [number, number] = [
    typeof ingredientsFilters.priceFrom === "number" ? ingredientsFilters.priceFrom : 0,
    typeof ingredientsFilters.priceTo === "number" ? ingredientsFilters.priceTo : 5000,
  ]

  function handleFilterChange(key: BooleanKeys) {
    setIngredientsFilters((prev) => {
      const current = prev[key]
      return {
        ...prev,
        [key]: current === true ? null : true,
      }
    })
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>, key: PriceKeys) {
    const rawValue = e.target.value
    const value = rawValue === "" ? "" : Math.max(0, Math.min(5000, Number(rawValue)))

    setIngredientsFilters((prev) => {
      const updated = {
        ...prev,
        [key]: value,
      }

      if (typeof updated.priceFrom === "number" && typeof updated.priceTo === "number") {
        if (updated.priceFrom > updated.priceTo) {
          if (key === "priceFrom") {
            updated.priceTo = updated.priceFrom
          } else {
            updated.priceFrom = updated.priceTo
          }
        }
      }

      return updated
    })
  }

  function handleSliderChange(value: number[]) {
    const [from, to] = value
    setIngredientsFilters((prev) => ({
      ...prev,
      priceFrom: from,
      priceTo: to,
    }))
  }

  useEffect(() => {
    console.log("filters updated:", ingredientsFilters)
  }, [ingredientsFilters])

  const filtersParams = new URLSearchParams(
    Object.entries(ingredientsFilters)
      .filter(([key, value]) => {
        if (typeof value === "boolean") return value
        if ((key === "priceFrom" || key === "priceTo") && value === "") return false
        return true
      })
      .map(([key, value]) => [
        key,
        typeof value === "string"
          ? value
          : Array.isArray(value)
          ? value.join(",")
          : String(value),
      ])
  )

  return (
    <FilteredWrapper>

      <section className="flex flex-col gap-[30px] border-b pb-[20px] border-[rgba(246,246,246,1)]">
        <span className={titleClass}>Тип тіста:</span>
        <div className="flex flex-col gap-[15px]">
          {sizeOptions.map(({ label }) => (
            <Skeleton
              key={label}
              className={cn("h-[40px] w-full rounded-md", loading ? "" : "hidden")}
            />
          ))}
          {sizeOptions.map(({ label }) => (
            <FilterOption
              key={label}
              label={label}
              onClick={() => handleFilterChange(label)}
              className={cn(loading ? "hidden" : "")}
            />
          ))}
        </div>
      </section>

      {/* === Додаткові фільтри === */}
      <section className="flex flex-col gap-[30px] border-b pb-[20px] border-[rgba(246,246,246,1)]">
        <span className={titleClass}>Filtering</span>
        <div className="flex flex-col gap-[15px]">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton
              key={i}
              className={cn("h-[40px] w-full rounded-md", loading ? "" : "hidden")}
            />
          ))}
          {filterOptions.map(({ label, key }) => (
            <FilterOption
              key={key}
              label={label}
              onClick={() => handleFilterChange(key)}
              className={cn(loading ? "hidden" : "")}
            />
          ))}
        </div>
      </section>

      {/* === Ціна від і до === */}
      <section className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-[12px]">Ціна від і до:</p>
        <div className="flex gap-3 mb-5">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton
              key={index}
              className={cn(loading ? "" : "hidden", "w-[90px] h-[40px] rounded-md")}
            />
          ))}

          {inputsData.map(({ id, placeholder, name }: IInputsData) => (
            <Input
              key={id}
              type="number"
              className={cn(
                !loading ? "" : "hidden",
                "w-[90px] h-[40px] border border-[rgba(240,240,240,1)]"
              )}
              min={0}
              max={5000}
              placeholder={placeholder}
              value={
                ingredientsFilters[name as keyof IFiteringData] === null ||
                typeof ingredientsFilters[name as keyof IFiteringData] === "boolean"
                  ? ""
                  : ingredientsFilters[name as keyof IFiteringData]
              }
              onChange={(e) => handlePriceChange(e, name as PriceKeys)}
            />
          ))}
        </div>

        <Skeleton
          className={cn(loading ? "" : "hidden", "h-[24px] w-full rounded-md")}
        />
        <Slider
          className={cn(!loading ? "" : "hidden", "bg-orange-400")}
          value={range}
          min={0}
          max={5000}
          step={1}
          onValueChange={handleSliderChange}
        />
      </section>

      {/* === Інгредієнти (Skeleton + Wrapper) === */}
      <div className="flex flex-col gap-2 mt-5">
        {[...Array(5)].map((_, i) => (
          <Skeleton
            key={i}
            className={cn("h-[40px] w-full rounded-md", loading ? "" : "hidden")}
          />
        ))}
      </div>

      <MainIngredientWrapper
        className={cn(!loading ? "" : "hidden")}
        ingredients={ingredients}
      />

      {/* === Тип Теста (Radio блоки) === */}
      <section className="mt-[42px]">
        <span className={subtitleClass}>Тип Теста</span>
        <div className="flex flex-col gap-2 mt-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton
              key={index}
              className={cn("h-[40px] w-full rounded-md", loading ? "" : "hidden")}
            />
          ))}
          {mockRadioGroup.map(({ id, label }) => (
            <RadioFilterBlock
              key={id}
              id={id}
              label={label}
              value={label}
              className={cn(!loading ? "" : "hidden")}
              onClick={() => handleFilterChange(label)}
            />
          ))}
        </div>
      </section>
      
      <Button
        onClick={async () => {
          try {
            const response = await fetch(
              `http://localhost:3000/api/filtering?${filtersParams.toString()}`
            )
            const data = await response.json()
            console.log(data)
          } catch (err) {
            console.error(err)
          }
        }}
        className="bg-[rgba(254,95,0,1)] py-[15px] w-full max-w-[244px] h-[50px] rounded-[18px] my-[34px] text-white text-[16px]"
      >
        Activate
      </Button>
    </FilteredWrapper>
  )
}
