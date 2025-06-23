export type ButtonDescription = "Собрать" | "Додати";
export type Mode = "button" | "counter";
export type SizeMode = "small" | "medium" | "big" | null;
export type DoughType = "thin" | "traditional";
export type  cardBorder = number |  null;
export type  priceProduct =  number | null;

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
  