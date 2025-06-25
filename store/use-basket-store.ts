import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { mockPizzas } from "@/modules/main-page/mock/mock-data-pitza";
interface IBasketItem {
  src: string;
  title: string;
  description: string;
  price: number;
  counts: number;
}

export interface IUseBasketStore {
  basketItem: IBasketItem[];
  sortMode: "price" | "order" | "rating";
  isClickedOnSortButton: boolean;
  price: number;
  count: number;
  pizza: typeof mockPizzas;
  setChosenPriceProducts: (price: number) => void;
  setChosenCountProducts: () => void;
  addElementToBasketItem: (item: IBasketItem) => void;
  increaseCount: (title: string, description: string) => void;
  decreaseCount: (title: string, description: string) => void;
  
  sortingPizza: () => void;
  setSortMode: (mode: "price" | "order" | "rating") => void;
  setSortModeKey: () => void;
  setIsClickedOnSortButton: () => void;
}


export const useBasketStore = create<IUseBasketStore>()(
  devtools(
    (set, get) => {
      const modes: ("price" | "order" | "rating")[] = ["price", "order", "rating"];

      const sortPizzas = (
        pizzaList: typeof mockPizzas,
        mode: "price" | "order" | "rating"
      ) => {
        return [...pizzaList].sort((a, b) => b[mode] - a[mode]);
      };

      const updateSortMode = (newMode: "price" | "order" | "rating") => {
        set((state) => ({
          sortMode: newMode,
          pizza: sortPizzas(state.pizza, newMode),
        }));
      };

      return {
        basketItem: [],
        sortMode: "price",
        isClickedOnSortButton: 0,
        price: 0,
        count: 0,
        pizza: mockPizzas,

        setChosenPriceProducts: (price: number) => {
          set((state) => ({ price: state.price + price }));
        },

        setChosenCountProducts: () => {
          set((state) => ({ count: state.count + 1 }));
        },

        setIsClickedOnSortButton: () => {
          set((state) => ({
            isClickedOnSortButton: !state.isClickedOnSortButton,
          }));
        },

        addElementToBasketItem: (item: IBasketItem) => {
          set((state) => {
            const existingIndex = state.basketItem.findIndex(
              (i) =>
                i.title === item.title && i.description === item.description
            );
            if (existingIndex !== -1) {
              const updatedItems = state.basketItem.map((i, idx) =>
                idx === existingIndex
                  ? { ...i, counts: i.counts + 1 }
                  : i
              );
              return {
                basketItem: updatedItems,
                count: state.count + 1,
                price: state.price + item.price,
              };
            } else {
              return {
                basketItem: [...state.basketItem, { ...item, counts: 1 }],
                count: state.count + 1,
                price: state.price + item.price,
              };
            }
          });
        },

        increaseCount: (title: string, description: string) => {
          set((state) => {
            const updatedItems = state.basketItem.map((item) =>
              item.title === title && item.description === description
                ? { ...item, counts: item.counts + 1 }
                : item
            );
            const found = state.basketItem.find(
              (item) =>
                item.title === title && item.description === description
            );
            return {
              basketItem: updatedItems,
              count: state.count + 1,
              price: found ? state.price + found.price : state.price,
            };
          });
        },

        decreaseCount: (title: string, description: string) => {
          set((state) => {
            const found = state.basketItem.find(
              (item) =>
                item.title === title && item.description === description
            );
            if (!found || found.counts === 0) return {};
            let updatedItems = state.basketItem.map((item) =>
              item.title === title && item.description === description
                ? { ...item, counts: item.counts - 1 }
                : item
            );
            updatedItems = updatedItems.filter((item) => item.counts > 0);
            return {
              basketItem: updatedItems,
              count: state.count - 1,
              price: found ? state.price - found.price : state.price,
            };
          });
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
