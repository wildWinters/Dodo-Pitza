import { cn } from "@/lib/utils"; // додай цей імпорт, якщо він є в тебе
import { mockTabs } from "@/modules/main-page/mock/mock-tabs";
import { nunito400 } from "@/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Link } from "react-scroll";
import { TabLister } from "./main-tab-list";
import { useBasketStore } from "@/store/use-basket-store";

type TMainComponentsOfTabList = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const MainComponentsOfTabList: React.FC<TMainComponentsOfTabList> = ({
  className,
  ...props
}) => {
  const pizza = useBasketStore(state => state.pizza)
  const sortMode  = useBasketStore(state => state.sortMode);
  const setSortModeKey = useBasketStore(state => state.setSortModeKey);

  console.log(pizza);


  return (
    <div
      className={cn(
        "sticky top-0 z-10 bg-white rounded-[30px] flex items-center w-full justify-between my-[42px] gap-[50px] border-b border-b-[rgba(237,237,237,1)]",
        className
      )}
      {...props}
    >
      <TabLister>
        <div className="flex items-center justify-between w-full py-3">
          <Tabs
            className="bg-[rgba(249,250,251,1)] rounded-2xl"
            defaultValue="all"
          >
            <TabsList className="flex gap-2 rounded-md px-2 py-1">
              {mockTabs.map((tab, index) => (
                <Link
                  key={tab.id}
                  to={tab.label}
                  containerId="scrollContainer"
                  smooth={true}
                  duration={500}
                >
                  <TabsTrigger
                    value={tab.value}
                    className="px-[16px] py-[6px] text-black"
                  >
                    {tab.label}
                    {index === mockTabs.length - 1 && (
                      <ChevronDown
                        className="ml-1 w-[10px] h-[10px]"
                        strokeWidth={2.5}
                      />
                    )}
                  </TabsTrigger>
                </Link>
              ))}
            </TabsList>
          </Tabs>

          <div 
            onClick={setSortModeKey}
            className="flex items-center gap-[10px] py-[16px] bg-[rgba(250,250,250,1)] rounded-[15px]"
          >
            <ArrowUpDown className="text-black" size={16} />
            <span className={`text-[16px] ${nunito400.className}`}>
              Sorting by
            </span>
            <span className="text-[rgba(254,95,0,1)] text-[16px]">
              {sortMode}
            </span>
          </div>
        </div>
      </TabLister>
    </div>
  );
};
