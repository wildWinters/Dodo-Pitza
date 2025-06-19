export interface IInputsData {
  id: string;
  placeholder: string;
  defaultValue: number;
  name: "priceFrom" | "priceTo";
}

export const inputsData: IInputsData[] = [
  {
    id: "min",
    placeholder: "0",
    defaultValue: 0,
    name: "priceFrom"
  },
  {
    id: "max",
    placeholder: "5000",
    defaultValue: 5000,
    name: "priceTo"
  }
];
