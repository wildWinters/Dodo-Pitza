export interface mockIngredientss{
    label: string;
    checked: boolean;
  }
  
  export interface IFiteringData {
    isAvailable: boolean;
    isNew: boolean;
    priceFrom: number |  null;
    priceTo: number | null;
    thin: boolean;
    traditional: boolean;
}

export type  cardBorder = number |  null;
export type  priceProduct =  number;
export type ButtonDescription = "Собрать" | "Додати";
export type Mode = "button" | "counter";
export type SizeMode = "small" | "medium" | "big" | null;
export type DoughType = "thin" | "traditional" | null;

export interface IPizzaPriceBlockProps {
    className?: string;
    price: string | number;
    mode: Mode;
    buttonMode: ButtonDescription;
    src?: string;
}

export interface IAdditionItem {
  name: string;
  price: string;
  icon: string;
}
  

export const mockDoughTabs = [
  { label: "Traditional", value: "traditional" },
  { label: "Thin", value: "thin" },
];

