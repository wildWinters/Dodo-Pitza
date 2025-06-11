import { DirectionWrapper } from "../../wrapper/direction-wrapper";
import Image from "next/image";
import { nunito400 } from "@/font/fonts";

export const LogoPanel: React.FC = () => {
  return (
    <DirectionWrapper direction="row">
      <Image
        src="/icons8-пицца-96 1 (2).png"
        width={35}
        height={35}
        alt="logo-pizza"
      />
      <div className="flex flex-col font-[900]">
        <span className={`text-[clamp(10px,4vw,24px)] uppercase ${nunito400.className} text-black`}>
          NEXT PIZZA
        </span>
        <span className={`text-[rgba(123,123,123,1)] text-[clamp(10px,2vw,16px)] ${nunito400.className}`}>
          вкусней уже некуда 
        </span>
      </div>
    </DirectionWrapper>
  );
};
 