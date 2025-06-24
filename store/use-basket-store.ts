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
  setSortModeKey: () => void;
}

export const useBasketStore = create<IUseBasketStore>()(
  devtools(
    (set, get) => {

      const modes: ("price" | "order" | "rating")[] = ["price", "order", "rating"];

      const sortPizzas = (pizzaList: typeof mockPizzas, mode: "price" | "order" | "rating") => {
        return [...pizzaList].sort((a, b) => b[mode] - a[mode]);
      };

      const updateSortMode = (newMode: "price" | "order" | "rating") => {
        set((state) => {
          const sortedPizza = sortPizzas(state.pizza, newMode);
          return {
            sortMode: newMode,
            pizza: sortedPizza,
          };
        });
      };

      return {
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
          updateSortMode(mode);
        },

        setSortModeKey: () => {
          const currentMode = get().sortMode;
          const currentIndex = modes.indexOf(currentMode);
          const nextIndex = (currentIndex + 1) % modes.length;
          const nextMode = modes[nextIndex];

          updateSortMode(nextMode);
        },


        sortingPizza: () => {
          const { sortMode, pizza } = get();
          const sorted = sortPizzas(pizza, sortMode);
          set({ pizza: sorted });

          setTimeout(() => {
            console.log(get().pizza);
          });
        },
      };
    },
    { name: "🧺 Basket Store" }
  )
);
