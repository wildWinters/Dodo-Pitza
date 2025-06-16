import { cn } from "@/lib/utils"
import { IBasedProps } from "../footer/main-footer-wrapper"

export  const  userListWrapper:React.FC<IBasedProps> =  ({className,children,...props}) => {

    return (
        <div className={cn("flex flex-col gap-[15px]",className)} {...props}>
            {children}
        </div>
    )
}


export const userListData :React.FC<IBasedProps> = ({className,children,...props}) => {
     
    return (
        <div className={cn(className)} {...props}>{children}</div>
    )
}
