import { Input } from "@/ui/input"
import { DirectionWrapper } from "../../wrapper/direction-wrapper"
import { Search } from "lucide-react"
import React from "react"
import { Button } from "@/ui/button"
import { User } from "lucide-react"
import { ShoppingCart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

export const RegistrationPanel: React.FC = () => {
     return  ( 
         <DirectionWrapper direction="row"> 
            <Button className="">
                <User />
                Увійти
            </Button>
            
                <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>

            <Button className="h-[50px] w-[50px] rounded-[15px] border-[1px]">
                <ShoppingCart size={16}/>
            </Button>
         </DirectionWrapper>
     )
}