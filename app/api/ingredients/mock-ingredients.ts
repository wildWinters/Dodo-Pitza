// types/ingredient.ts

export interface Ingredient {
  id: string;
  name: string;
  category: "classic" | "meat" | "vegan" | "seafood" | "spicy";
  price: number;
  iconUrl: string;
}

export const mockIngredients: Ingredient[] = [
  {
    id: "pizza-tomato-cheese",
    name: "Tomato & Cheese",
    category: "classic",
    price: 8,
    iconUrl: "/free-icon-gravy-3600877.png",
  },
  {
    id: "pizza-double-cheese",
    name: "Double Cheese",
    category: "classic",
    price: 9,
    iconUrl: "/free-icon-cheese-530937.png",
  },
  {
    id: "pizza-classic",
    name: "Classic Pizza",
    category: "classic",
    price: 7,
    iconUrl: "/free-icon-gravy-3600877.png",
  },
  {
    id: "pizza-cheesy-veggie",
    name: "Cheesy Veggie",
    category: "vegan",
    price: 9,
    iconUrl: "/free-icon-cheese-530937.png",
  },
];
