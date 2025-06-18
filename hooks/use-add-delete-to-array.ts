import { Dispatch, SetStateAction } from "react";
export function useAddOrRemoveFromArray<T>(
  value: T,
  setArray: Dispatch<SetStateAction<T[]>>
) {
  setArray(current => current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value]
  );
}
