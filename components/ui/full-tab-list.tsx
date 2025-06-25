import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import { mockSizeTabs } from "@/modules/main-page/mock/mock-size-tabs";
import { SizeMode } from "@/modules/main-page/types";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

interface TabListProps {
  className?: string;
  setState: Dispatch<SetStateAction<any>>;
  defaultValue?: SizeMode;
  mock:any[];
}

export const TabList: React.FC<TabListProps> = ({
  className,
  setState,
  mock,
  defaultValue = "small",
  ...props
}) => {
  return (
    <Tabs defaultValue={defaultValue} className={cn("w-full", className)} {...props}>
      <TabsList className="w-full items-center max-h-[35px] bg-[rgba(236,236,236,1)] rounded-[30px] flex justify-center gap-2">
        {mock.map(({ label, value }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="px-3 rounded-[30px] min-h-[26px] h-[26px] text-xs font-medium data-[state=active]:bg-white"
            onClick={() => setState(value as SizeMode)}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
