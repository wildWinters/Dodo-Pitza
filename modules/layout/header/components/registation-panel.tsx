"use client"
import { DirectionWrapper } from "../../wrapper/direction-wrapper";
import { mockMenuItems } from "@/modules/main-page/mock/mock-menu";
import { Button } from "@/ui/button";
import { User } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { nunito600 } from "@/font/fonts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Fragment } from "react";
import { useBasketStore } from "@/store/use-basket-store";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export const RegistrationPanel: React.FC = () => {
  const count = useBasketStore(state => state.count);
  const screenPrice = useBasketStore(state => state.price);

  return (
    <DirectionWrapper direction="row">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`text-[16px] justify-center font-[900] text-[rgba(254,95,0,1)] py-[13px] px-4 max-w-[110px] w-full border-1 border-[rgba(254,95,0,1)] rounded-[5px] flex items-center gap-[10px] ${nunito600.className}`}
        >
          <User className="min-w-[20px] min-h-[20px]" />
          <span className="font-[700]">Увійти</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {mockMenuItems.map((value, index) => (
            <Fragment key={index}>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={`hover:bg-[rgba(255, 250, 246, 1)] min-h-[38px] max-w-[138px] w-full text-black text-[14px] flex text-left hover:text-[rgba(254,95,0,1)] pl-[16px] ${nunito600.className}`}
              >
                {value.label}
              </DropdownMenuItem>
            </Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Sheet>
        <SheetTrigger>
          <Button className="bg-[rgba(254,95,0,1)]  h-[50px] w-fit text-white  rounded-[15px] border-[1px]">
          <span>{screenPrice}$</span>
          <span>|</span>
          <ShoppingCart size={16} className="text-white" />
          <span className="text-[14px]">{count}</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
    </DirectionWrapper>
  );
};
