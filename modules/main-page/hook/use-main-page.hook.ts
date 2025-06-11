import { useMainPageStore } from "../store/use-main-page.store";
 
//  
export function useMainPageStoreHook() {
  const defaultCount = useMainPageStore((state) => state.defaultCount);
  const currentPageIndex = useMainPageStore((state) => state.currentPageIndex);
  const selectedPageIndex = useMainPageStore((state) => state.selectedPageIndex);
  const maxPageCount = useMainPageStore((state) => state.maxPageCount);
  const searchElement = useMainPageStore((state) => state.searchElement);
  const isShowAllGradient = useMainPageStore((state) => state.isShowAllGradient);
  const maxPageIndex = useMainPageStore((state) => state.maxPageCount);
  const decrementCurrentPageIndex = useMainPageStore((state) => state.decrementCurrentPageIndex);
  const incrementCurrentPageIndex = useMainPageStore((state) => state.incrementCurrentPageIndex);
  const toggleBetweenPartAndAllGradients = useMainPageStore((state) => state.toggleBetweenPartAndAllGradients);
  const setEnteredValueSearchedElement = useMainPageStore((state) => state.setEnteredValueSearchedElement);
  const setSelectedPageIndex = useMainPageStore((state) => state.setSelectedPageIndex);
  const scrollId = useMainPageStore(state=>state.scrollId);
  const setScrollId = useMainPageStore(state=>state.setScrollId);

  return {
    scrollId,
    setScrollId,
    defaultCount,
    currentPageIndex,
    selectedPageIndex,
    maxPageCount,
    searchElement,
    maxPageIndex,
    isShowAllGradient,
    decrementCurrentPageIndex,
    incrementCurrentPageIndex,
    toggleBetweenPartAndAllGradients,
    setEnteredValueSearchedElement,
    setSelectedPageIndex,
  };
}
