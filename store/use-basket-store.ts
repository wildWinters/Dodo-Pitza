import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { mockPizzas } from "@/modules/main-page/mock/mock-data-pitza";
export interface IUseBasketStore {
  sortMode: "price" | "order" | "rating";
  price: number;
  count: number;
  pizza: typeof mockPizzas;
  setChosenPriceProducts: (price: number) => void;
  setChosenCountProducts: () => void;
  sortingPizza: () => void;
  setSortMode: (mode: "price" | "order" | "rating") => void;
  setSortModeKey:() => void;
}


export const useBasketStore = create<IUseBasketStore>()(
  devtools(
    (set, get) => ({
      sortMode: "price",
      price: 0,
      count: 0,
      pizza: mockPizzas,
      
      setChosenPriceProducts: (price: number) => {
        set((state) => ({ price: state.price + price }));
      },

      setChosenCountProducts: () => {
        set((state) => ({ count: state.count + 1 }));
      },

      setSortMode: (mode) => {
        set({ sortMode: mode });
        get().sortingPizza();  // одразу сортуємо після зміни режиму
      },

      sortingPizza: () => {
        const { sortMode, pizza } = get();
        const sorted = [...pizza].sort((a, b) => b[sortMode] - a[sortMode]);
        set({ pizza: sorted });
        setTimeout(() => {
          console.log(get().pizza);
        });
      },

      setSortModeKey: () => {
        const modes: ("price" | "order" | "rating")[] = ["price", "order", "rating"];
        const currentMode = get().sortMode;
        const currentIndex = modes.indexOf(currentMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        const nextMode = modes[nextIndex];

        set({ sortMode: nextMode });
        get().sortingPizza(); // сортуємо після зміни режиму
      },
    }),
    { name: "🧺 Basket Store" }
  )
);
