import { NextResponse } from "next/server";
import { mockIngredients } from "./mock-ingredients";
export async function GET() {
  return NextResponse.json(mockIngredients);
}
