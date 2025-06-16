import { useState } from "react";

const useElementActive = () => {
  const [isElementActive, setIsElementActive] = useState<boolean>(false);

  function toggleElementState(value: boolean) {
    setIsElementActive(value);
  }


  return {
    isElementActive,
    setIsElementActive,
    toggleElementState
  }
};

export default useElementActive;
