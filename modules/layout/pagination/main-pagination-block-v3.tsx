import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { IBasedProps } from "../footer/main-footer-wrapper";

// Новий інтерфейс для пропсів пагінації
interface IPaginationProps extends IBasedProps {
  currentPageIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

export const MainPaginationBlock: React.FC<IPaginationProps> = ({
  className,
  currentPageIndex,
  onNext,
  onPrev,
  ...props
}) => {
  return (
    <div
      className={cn("flex justify-center my-[50px] mx-auto items-center", className)}
      {...props}
    >
      <Pagination>
        <PaginationContent className="flex gap-[3px]">
          <PaginationLink
            className="hover:border-[rgba(254,95,0,1)] hover:bg-white"
            onClick={onPrev}
          >
            <ChevronLeft />
          </PaginationLink>

          {/* Хардкод лишається — 2 сторінки */}
          {Array.from({ length: 2 }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink href="#">
                {currentPageIndex + index}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationLink
            className="hover:border-[rgba(254,95,0,1)] hover:bg-white"
            onClick={onNext}
          >
            <ChevronRight />
          </PaginationLink>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
