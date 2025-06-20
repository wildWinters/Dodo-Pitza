import { NextRequest, NextResponse } from "next/server";
import { mockIngredients } from "../ingredients/mock-ingredients";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const isAvailable = searchParams.get("isAvailable") === "true" || null;
  const isNew = searchParams.get("isNew") === "true" || null;
  const priceFrom = searchParams.get("priceFrom") ? parseFloat(searchParams.get("priceFrom")) : null;
  const priceTo = searchParams.get("priceTo") ? parseFloat(searchParams.get("priceTo")) : null;
  const thin = searchParams.get("thin") === "true" || null;
  const traditional = searchParams.get("traditional") === "true" || null;
  const twenty = searchParams.get("20cm") === "true" || null;
  const thirty = searchParams.get("30cm") === "true" || null;
  const forty = searchParams.get("40cm") === "true" || null;

  if (!Array.isArray(mockIngredients)) {
    return NextResponse.json([]);
  }

  const filteredIngredients = mockIngredients.filter((ingredient) => {
    return (
      (twenty === null || ingredient["20cm"] === twenty) &&
      (isAvailable === null || ingredient.isAvailable === isAvailable) &&
      (isNew === null || ingredient.isNew === isNew) &&
      (thirty === null || ingredient["30cm"] === thirty) &&
      (forty === null || ingredient["40cm"] === forty) &&
      (traditional === null || ingredient.traditional === traditional) &&
      (thin === null || ingredient.thin === thin) &&
      (priceFrom === null || ingredient.price >= priceFrom) &&
      (priceTo === null || ingredient.price <= priceTo)
    );
  });
  
  return NextResponse.json(filteredIngredients);
}