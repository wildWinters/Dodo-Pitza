import { cn } from "@/lib/utils"
import { IBasedProps } from "../../footer/footer"



export const FilteredWrapper:React.FC<IBasedProps> = ({children,className,...props}) => {
    return ( 
        <>
            <div className={cn("max-w-[244px] min-h-[835px] w-full flex flex-col",className)} {...props}> 
                {children}
            </div> 
        </>
    )
}



