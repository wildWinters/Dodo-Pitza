import { NextRequest, NextResponse } from "next/server";
import { mockPizzas } from "@/modules/main-page/mock/mock-data-pitza";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const filteredIngredients = mockPizzas.filter(value => {
    return( String(value["20cm"]) === searchParams.get("20cm") &&
    String(value["30cm"]) === searchParams.get("30cm") &&
    String(value["40cm"]) === searchParams.get("40cm")) && 
    String(value["isAvailable"]) ===  searchParams.get("isAvailable") &&
    String(value["isNew"]) === searchParams.get("isNew") && 
    String(value["price"]) >= searchParams.get("priceFrom") &&
    String(value["price"]) <= searchParams.get("priceTo") && 
    String(value["thin"]) === searchParams.get("thin") && 
    String(value["traditional"])  === searchParams.get("traditional")
  })


  console.log( "наруто" ,  filteredIngredients, "uzumaki"   );

  return NextResponse.json(filteredIngredients);
}
