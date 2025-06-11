import { nunito800 } from "@/font/fonts"
import { cn } from "@/lib/utils"
import { IBasedProps } from "../footer/main-footer-wrapper"
import { DirectionWrapper } from "../wrapper/direction-wrapper"

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


//! коменент до 70 рядків коду максимум максимум 70 рядків коду максимум 70 рядків коду максимум 
//! максимум 70 рядків коду компоеннт максимум максимуум на а70 рядків коду максимум 70 рядків кооду максимуму на 70  ряжжків коду 
// ! максимум 70 рядків коду максимум 70 рядків  коду максиммумм 70 ряддків коду максимум 70 яркдів коду 
//! максимум 70 рядків коду ну максимум 70 рядків коду 
// ! максимум 70 яркдів коду 