"use client";
import { FC, useState, useEffect } from "react";
import { Input } from "@/ui/input";
import { Search } from "lucide-react";
import { DirectionWrapper } from "../../wrapper/direction-wrapper";
import { useModalStore } from "@/modules/main-page/store/use-active-modal-store";
import { SearchElement } from "./search-element";    

export interface IIngredient {
  id: number;
  name: string;
  category:string,
  price:number;
  iconUrl:string;
}
export const InputContainer: FC = () => {
  const openModal = useModalStore(state => state.openModal);
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const isModalOpen = useModalStore(state => state.isModalOpen);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchIngredients() {
      
      try {
        const response = await fetch(`http://localhost:3000/api/ingredients`);
        const data = await response.json();
        setIngredients(data);
        setIsLoading(true);
      } catch (err) {
        console.error(err);
      }
    }

    fetchIngredients();
  }, []);

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(enteredValue.toLowerCase())
  );

  return (
    <>
      <DirectionWrapper
        direction="row"
        className="relative max-w-[764px] min-w-[200px] w-full min-h-[50px] bg-[rgba(249,249,249,1)] rounded-[15px] pl-[20px]  z-[1000]"
      >
        <Search className="text-[rgba(173,173,173,1)]" size={17} />
        <Input
          value={enteredValue}
          onChange={(e) => setEnteredValue(e.target.value)}
          onClick={openModal}
          className="w-full border-none outline-none"
          placeholder="Пошук Піци"
          suppressHydrationWarning
        />

        <SearchElement
          ingredients={filteredIngredients}
          isModalOpen={isModalOpen}
          className=""
          isLoading={isLoading}
          />
          
      </DirectionWrapper>
    </>
  );
};
