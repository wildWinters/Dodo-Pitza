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