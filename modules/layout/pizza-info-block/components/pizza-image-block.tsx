import { cn } from "@/lib/utils";
import { Settings2 } from "lucide-react";
import Image from "next/image";

export const PizzaImageBlock: React.FC<{
  className?: string;
  src: string;
  alt: string;
}> = ({ className, src, alt }) => (
  <div className={cn("flex items-center justify-center relative bg-[rgba(255,247,238,1)] rounded-[15px]", className)}>
    <Settings2 size={24} className="text-[rgba(254,95,0,1)] absolute top-[24px] right-[24px]" />
    <Image className="rounded-full " src={src} width={211} height={212} alt={alt} />
  </div>
);
