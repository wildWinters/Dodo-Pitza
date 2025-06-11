import { IBasedProps } from "../footer/footer"
import { cn } from "@/lib/utils"
import { DirectionWrapper } from "../wrapper/direction-wrapper"
import { nunito800 } from "@/font/fonts"

export const TabLister:React.FC<IBasedProps> = ({children}) =>{ 

    return ( 
        <DirectionWrapper direction="column" className={cn("direction-wrapper w-full gap-[20px]")}>
            <span className={`text-[clamp(20px,4vw,36px)] ${nunito800.className}`}>Всі Піцци</span>
            {children}
        </DirectionWrapper>
    )
}

export const TabListWrapper = Object.assign(DirectionWrapper,{
    Tabs:null
});