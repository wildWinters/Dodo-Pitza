import { useMainPageStoreHook } from "@/modules/main-page/hook/use-main-page.hook";
import { FilterOption } from "./components/filter-option";
import { FilteredWrapper } from "./components/filtered-wrapper";
import { FilterRadio } from "./components/radio-filter";
import { RadioFilterBlock } from "./components/radio-filter-description";


export function MainComponentFilteredPOanel(){
        const  { 
      defaultCount,
      currentPageIndex,
      incrementCurrentPageIndex,
      decrementCurrentPageIndex,
      isShowAllGradient,
      maxPageIndex,
      toggleBetweenPartAndAllGradients,
      searchElement,
      setEnteredValueSearchedElement,
    } = useMainPageStoreHook();
    
    return ( 
        <>

        </>
    )
    
}