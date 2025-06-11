// types.ts

export type ModeTabs = 
  | "All"
  | "Meat"
  | "Spicy"
  | "Sweet"
  | "Vegetarian"
  | "Chicken"
  | "More";

export const mockTabs: { id: string; label: string; value: ModeTabs }[] = [
  { id: "all", label: "All", value: "All" },
  { id: "meat", label: "Meat", value: "Meat" },
  { id: "spicy", label: "Spicy", value: "Spicy" },
  { id: "sweet", label: "Sweet", value: "Sweet" },
  { id: "vegetarian", label: "Vegetarian", value: "Vegetarian" },
  { id: "chicken", label: "Chicken", value: "Chicken" },
  { id: "more", label: "More", value: "More" },
];
