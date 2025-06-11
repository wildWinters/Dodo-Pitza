import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useMainPageStoreHook } from "@/modules/main-page/hook/use-main-page.hook";
import { IBasedProps } from "../footer/footer";

// хук пропса чи store 

export const MainPaginationBlock: React.FC<IBasedProps> = ({ className, ...props }) => {
  const {
    decrementCurrentPageIndex,
    incrementCurrentPageIndex,
    currentPageIndex
  } = useMainPageStoreHook();


  return (
    <div className={cn("flex justify-center  my-[50px] mx-auto items-center", className)} {...props}>
      <Pagination>
        <PaginationContent className="flex gap-[3px]">
          <PaginationLink
            className="hover:border-[rgba(254,95,0,1)] hover:bg-white"
            onClick={decrementCurrentPageIndex}
          >
            <ChevronLeft />
          </PaginationLink>
          {/* Увага Хардкод  */}
          {Array.from({ length: 2 }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink href="#">
                {currentPageIndex + index}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationLink
            className="hover:border-[rgba(254,95,0,1)] hover:bg-white"
            onClick={incrementCurrentPageIndex}
          >
            <ChevronRight />
          </PaginationLink>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
