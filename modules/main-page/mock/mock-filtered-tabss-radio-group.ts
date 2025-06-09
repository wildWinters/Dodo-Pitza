interface IMockRadioGroup {
  label: string;
  value: string;
  id:string
}

export const mockRadioGroup: IMockRadioGroup[] = [
  { label: "Традиційні", value: "traditional",id:"label1" },
  { label: "Тонке", value: "thin",id:"label2" }
];
