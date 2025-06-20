export interface Ingredient {
  id: string;
  name: string;
  category: "classic" | "meat" | "vegan" | "seafood" | "spicy";
  price: number;
  iconUrl: string;
  isAvailable: boolean;
  isNew: boolean;
  thin: boolean;
  traditional: boolean;
  "20cm": boolean;
  "30cm": boolean;
  "40cm": boolean;
}

export const mockIngredients: Ingredient[] = [
  {
    id: "pizza-tomato-cheese",
    name: "Tomato & Cheese",
    category: "classic",
    price: 8,
    iconUrl: "/free-icon-gravy-3600877.png",
    isAvailable: true,
    isNew: false,
    thin: true,
    traditional: false,
    "20cm": true,
    "30cm": false,
    "40cm": false,
  },
  {
    id: "pizza-double-cheese",
    name: "Double Cheese",
    category: "classic",
    price: 9,
    iconUrl: "/free-icon-cheese-530937.png",
    isAvailable: true,
    isNew: true,
    thin: false,
    traditional: true,
    "20cm": false,
    "30cm": true,
    "40cm": true,
  },
  {
    id: "pizza-classic",
    name: "Classic Pizza",
    category: "classic",
    price: 7,
    iconUrl: "/free-icon-gravy-3600877.png",
    isAvailable: false,
    isNew: false,
    thin: false,
    traditional: true,
    "20cm": true,
    "30cm": false,
    "40cm": false,
  },
  {
    id: "pizza-cheesy-veggie",
    name: "Cheesy Veggie",
    category: "vegan",
    price: 9,
    iconUrl: "/free-icon-cheese-530937.png",
    isAvailable: true,
    isNew: false,
    thin: true,
    traditional: false,
    "20cm": true,
    "30cm": true,
    "40cm": true,
  },
];
