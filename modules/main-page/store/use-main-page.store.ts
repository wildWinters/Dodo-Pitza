import { create } from "zustand";
import { mockIngredients } from "../mock/mock-filtered-tabs";

interface MainPageStore {
  defaultCount: number;
  currentPageIndex: number;
  selectedPageIndex: number | null;
  maxPageCount: number;
  isShowAllGradient: boolean;
  searchElement: string;
  setEnteredValueSearchedElement: (value: string) => void;
  setSelectedPageIndex: (index: number) => void;
  incrementSelectedPageIndex: () => void;
  decrementSelectedPageIndex: () => void;
  incrementCurrentPageIndex: () => void;
  decrementCurrentPageIndex: () => void;
  toggleBetweenPartAndAllGradients: () => void;
}

export const useMainPageStore = create<MainPageStore>((set, get) => ({
  defaultCount: 6,
  currentPageIndex: 1,
  maxPageCount: 65,
  selectedPageIndex: null,
  isShowAllGradient: false,
  searchElement: "",

  setEnteredValueSearchedElement: (value) => {
    set({
      searchElement: value,
    });
  },

  setSelectedPageIndex: (index) => set({ selectedPageIndex: index }),

  incrementSelectedPageIndex: () =>
    set((state) => ({
      selectedPageIndex: (state.selectedPageIndex ?? -1) + 1,
    })),

  decrementSelectedPageIndex: () =>
    set((state) => ({
      selectedPageIndex: Math.max((state.selectedPageIndex ?? 1) - 1, 0),
    })),

  incrementCurrentPageIndex: () => {
    if (get().currentPageIndex < get().maxPageCount - 1) {
      set({ currentPageIndex: get().currentPageIndex + 1 });
    }
  },

  decrementCurrentPageIndex: () => {
    const prev = Math.max(get().currentPageIndex - 1, 1);
    set({ currentPageIndex: prev });
  },

  toggleBetweenPartAndAllGradients: () => {
    const current = get().isShowAllGradient;
    const newDefaultCount = current ? 6 : mockIngredients.length;

    set({
      isShowAllGradient: !current,
      defaultCount: newDefaultCount,
    });
  },
}));
