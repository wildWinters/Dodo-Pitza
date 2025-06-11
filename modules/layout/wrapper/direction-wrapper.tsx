import { cn } from "@/lib/utils";
// import { IBasedProps } from "../footer/footer";
import { ReactNode } from "react";
export interface IDirectionWrapper{
  direction: 'row' | 'column';
  children?:ReactNode,
  className?:string,
}

export const DirectionWrapper: React.FC<IDirectionWrapper> = ({
  children,
  className,
  direction,
}) => {
  return (
    <div
      className={cn(
        `flex  ${direction === 'row' ? 'flex-row gap-[15px] items-center' : 'flex-col justify-center'}`,
        className
      )}
    >
      {children}
    </div>
  );
};