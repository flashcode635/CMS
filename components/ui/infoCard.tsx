import { CARD_GRADIENTS } from "@/lib/constants";
export type InfoCardProps = {
    lgw?: boolean;
    /** extra classes for the root card (mobile: callers pass responsive sizing for the flex-row scroller) */
    className?: string;
    card: {
        number: string;
        title: string;
        description: React.ReactNode;
    };
  };
export default function InfoCard({ card, lgw=true, className="" }: InfoCardProps) {
    return(
        <>
            <div
              className={`w-full ${lgw ? 'lg:w-[calc(50%-12px)]' : ''} ${className} flex flex-col px-4 py-4 sm:px-6 lg:px-8`}
              style={{
                gap: 8,
                backgroundColor: "#ffffff",
                border: "1px solid #EFE9DE",
                borderRadius: 16,
                boxShadow: "0px 1.5px 1.5px rgba(0, 0, 0, 0.05)",
              }}
            >
             
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 0,       // container collapses; children set their own size
                  lineHeight: 0,
                  margin: 0,
                  // Titles may wrap on narrow cards (e.g. the 320–768px step
                  // scroller in stepSection); `nowrap` used to clip them.
                  whiteSpace: "normal",
                  backgroundImage: CARD_GRADIENTS,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <span
                  className="text-[28px] sm:text-[36px] lg:text-[48px]"
                  style={{
                    lineHeight: "normal",
                    fontWeight: 500,
                  }}
                >
                  {card.number}
                </span>
                <span
                  className="text-[15px] sm:text-[19px] lg:text-[24px]"
                  style={{
                    lineHeight: "normal",
                    fontWeight: 500,
                  }}
                >
                  {card.title}
                </span>
              </p>

              {/*
               * Body text: #4A554F (slate-blue) — Inter Regular 16/24
               * Bold spans inside Card 1 keep the same #4A554F colour.
               */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#4A554F",
                  margin: 0,
                  width: "100%",
                }}
              >
                {card.description}
              </p>
            </div>
        </>
    )
}