import { nunito700 } from "@/font/fonts";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
type buttonDescription = "Собрать" | "Додати";
type mode = "button" | "counter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export const PizzaPriceBlock: React.FC<{
  className?: string;
  price: string | number;
  mode: mode;
  buttonMode: buttonDescription;
}> = ({ className, price, buttonMode }) => {

  return (
    <div className={cn("flex items-center justify-between rounded-[15px] w-full  py-2", className)}>
      <span className={nunito700.className}>
        від {price} <span className="text-[20px]">$</span>
      </span>
      <Dialog>
        <DialogTrigger className="px-3 py-1 text-sm rounded-[8px] border-none text-[rgba(254,95,0,1)] bg-[rgba(255,250,244,1)]">{buttonMode}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
    </div>
  );
};
