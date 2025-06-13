
import { useState } from "react";
import { Counter } from "./pizza-counter";


export const CounterBlock: React.FC = () => {
  const [count, setCount] = useState<number>(1);

  return (
    <div className="flex items-center gap-[14px]">
      <Counter sign="minus" onClick={() => setCount((prev) => Math.max(1, prev - 1))} />
      <span>{count}</span>
      <Counter sign="plus" onClick={() => setCount((prev) => prev + 1)} />
    </div>
  );
};

