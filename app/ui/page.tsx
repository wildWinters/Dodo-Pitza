import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs"
import { mockTabs } from "@/modules/main-page/mock/mock-tabs"
import { ChevronDown } from "lucide-react"
import { TabLister } from "@/modules/layout/tab-list/tab-list"

export default function Page(){
    return  (   

        <> 
        
    <TabLister> 
        <Tabs  defaultValue="account" className="w-[400px] ">
            <TabsList className="bg-[rgba(250,250,250,1)]">
                {mockTabs.map((value,index) => (  
                    <TabsTrigger className="px-[16px]"   key={value.label} value={value.label}>
                      {value.label} 
                      {index === mockTabs.length-1 ? <ChevronDown className="font-black w-[6px] h-2.5"/> : null}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    </TabLister>

                

    </>
    )
}