import { FC } from "react";
import Link from "next/link";
import { IIngredient } from "./input-container";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface IBasedProps {
  ingredients: IIngredient[];
  className?: string;
  [key: string]: any;
}

interface ISearchElement extends IBasedProps {
  ingredients: IIngredient[];
  isModalOpen: boolean;
  isLoading: boolean;
}

export const SearchElement: FC<ISearchElement> = ({
  isLoading,
  ingredients,
  isModalOpen,
  className,
  ...props
}) => {
  if (ingredients.length === 0)
    return (
      <div
        className={cn(
          "absolute bottom-[-50px] bg-white h-[40px] flex items-center left-0 w-full",
          isModalOpen ? "block" : "hidden",
          className
        )}
      >
        <span>Nothing found</span>
      </div>
    );

  return (
    <div
      className={cn(
        "absolute top-[71px] rounded-[40px] left-0 flex flex-col w-full",
        ingredients.length > 0 && isModalOpen ? "block" : "hidden",
        isLoading ? "" : "hidden",
        className
      )}
    >
      {ingredients.map((ingredient) => (
        <div key={ingredient.id}>
          <div className="flex w-full hover:bg-[rgb(243,146,146)] bg-white gap-[20px] items-center px-4 py-2">
            <Image
              src={ingredient.iconUrl}
              alt={ingredient.name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <Link
              href="#"
              className={cn("py-1 h-[40px] flex items-center", className)}
              {...props}
            >
              {ingredient.name}
            </Link>
          </div>
          <Skeleton
            className={cn(
              isLoading ? "hidden" : "",
              "w-full flex flex-1"
            )}
          />
        </div>
      ))}
    </div>
  );
};
