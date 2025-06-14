import { Input } from "@/ui/input"
import { Search } from "lucide-react"
import React from "react"
import { DirectionWrapper } from "../../wrapper/direction-wrapper"

export const InputContainer:React.FC = () =>{ 
    return ( 
         <DirectionWrapper
           direction="row"
           className="max-w-[764px] min-w-[200px] w-full min-h-[50px]  bg-[rgba(249,249,249,1)] rounded-[15px] pl-[20px]"> 
            <Search className="text-[rgba(173,173,173,1)]" size={17}/> 
            <Input className="w-full border-none  outline-none" placeholder="Пошук Піци"/>
         </DirectionWrapper>
    )
}

