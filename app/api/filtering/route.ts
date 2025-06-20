import { NextRequest, NextResponse } from "next/server";
import { mockPizzas } from "@/modules/main-page/mock/mock-data-pitza";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const getBooleanParam = (key: string): boolean | null => {
    const value = searchParams.get(key);
    return value === "true" ? true : value === "false" ? false : null;
  };

  const getNumberParam = (key: string): number | null => {
    const value = searchParams.get(key);
    const num = Number(value);
    return isNaN(num) ? null : num;
  };

  const filters = {
    isAvailable: getBooleanParam("isAvailable"),
    isNew: getBooleanParam("isNew"),
    thin: getBooleanParam("thin"),
    traditional: getBooleanParam("traditional"),
    "20cm": getBooleanParam("20cm"),
    "30cm": getBooleanParam("30cm"),
    "40cm": getBooleanParam("40cm"),
    priceFrom: getNumberParam("priceFrom") ?? 0,
    priceTo: getNumberParam("priceTo") ?? 5000,
  };

  const filteredIngredients = mockPizzas.filter((value) => {
    return (
      (filters["20cm"] === null || value["20cm"] === filters["20cm"]) &&
      (filters["30cm"] === null || value["30cm"] === filters["30cm"]) &&
      (filters["40cm"] === null || value["40cm"] === filters["40cm"]) &&
      (filters.isAvailable === null || value.isAvailable === filters.isAvailable) &&
      (filters.isNew === null || value.isNew === filters.isNew) &&
      (filters.thin === null || value.thin === filters.thin) &&
      (filters.traditional === null || value.traditional === filters.traditional) &&
      Number(value.price) >= filters.priceFrom &&
      Number(value.price) <= filters.priceTo
    );
  });

  console.log("наруто", filteredIngredients, "uzumaki");

  return NextResponse.json(filteredIngredients);
}
