import { cn } from "@/lib/utils";
import { Settings2 } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

interface PizzaImageBlockProps {
  className?: string;
  src: string;
  alt: string;
}

export const PizzaImageBlock: React.FC<PizzaImageBlockProps> = ({
  className,
  src,
  alt,
  ...props
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsImageLoaded(true);
    }, 300); // 300ms для імітації завантаження

    return () => clearTimeout(timerId);
  }, []);

  return (
    <>
      {!isImageLoaded && <Skeleton className=" w-[220px] mx-auto aspect-square  rounded-full" />}
      {isImageLoaded && (
        <div
          className={cn(
            "flex items-center justify-center relative bg-[rgba(255,247,238,1)] rounded-[15px]",
            className
          )}
          {...props}
        >
          <Settings2
            size={24}
            className="text-[rgba(254,95,0,1)] absolute top-[24px] right-[24px]"
          />
          <Image
            className="rounded-full"
            src={src}
            width={211}
            height={212}
            alt={alt}
          />
        </div>
      )}
    </>
  );
};
