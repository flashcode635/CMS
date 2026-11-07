import {LucideIcon} from 'lucide-react';
import { CARD_GRADIENTS } from "@/lib/constants";
export type EligibilityCardProps = {
    key: number;
    img: LucideIcon;
    title: string;
  };

export const EligibilityCards = ({key,img:Icon,title}:EligibilityCardProps)=>{
    const size= "6";
    return (
        <>
             <div
              key={key}
              className="w-full flex justify-center items-center
              px-4 py-4 sm:px-6 lg:px-8"
              style={{
                gap: 8,
                backgroundColor: "#ffffff",
                border: "1px solid #e6eef8",
                borderRadius: 16,
                boxShadow: "0px 1.5px 1.5px rgba(0, 0, 0, 0.05)",
              }}
            >
            
              <p 
              className=" flex justify-center items-center leading-0 m-0
              font-['Hanken_Grotesk',sans-serif]  gap-3 font-medium
               md:text-transparent  whitespace-nowrap 
               bg-clip-text text-transparent [-webkit-text-fill-color:transparent]"
                style={{
                  backgroundImage: CARD_GRADIENTS,
                }}
              >
                <span className="flex items-center justify-center bg-brand-sky/20 p-2 rounded-xl ring-1">
                    <Icon className={`h-${size} w-${size}  text-brand-navy `} />

                </span>
                <span
                  className="text-xs sm:text-sm "
                  style={{
                    lineHeight: "normal",
                    fontWeight: 500,
                  }}
                >
                  {title}
                </span>
              </p>

             
            </div>
        </>
    )
}