import { nunito800 } from "@/font/fonts"
import { cn } from "@/lib/utils"
import { IBasedProps } from "../footer/main-footer-wrapper"
import { DirectionWrapper } from "../wrapper/direction-wrapper"

export const TabLister:React.FC<IBasedProps> = ({children}) =>{ 

    return ( 
        <DirectionWrapper  
         direction="column" 
         className={cn(" sticky top-0 direction-wrapper w-full gap-[20px]")}>
            <span className={`text-[clamp(20px,4vw,36px)] ${nunito800.className}`}>Всі Піцци</span>
            {children}
        </DirectionWrapper>
    )
}

export const TabListWrapper = Object.assign(DirectionWrapper,{
    Tabs:null
});


