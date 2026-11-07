import {useState} from "react";
import {Peck,  UnivCardProps} from "./GloballyRecognizedUniversities";
import Image from "next/image";
export default function UnivCard({ univ, visible, index }: UnivCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cutSize = "clamp(20px, 2.2vw, 42px)";
  const cutY = "clamp(25px, 2.2vw, 42px)";

  // Extract actual hex colors from Tailwind arbitrary classes
  const getColor = (className: string) =>
    className.match(/#(?:[0-9a-fA-F]{3,8})/)?.[0] ?? "#ffffff";

  const cardColor = getColor(univ.cardBg);
  const labelColor = getColor(univ.labelBg);

  return (
    <div
      className={`aspect-253/375 min-w-0 flex-1 cursor-pointer
        transform-gpu transition-all duration-700 ease-out
        ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      style={{
        transitionDelay: `${index * 0.07}s`,
        zIndex: isHovered ? 10 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card wrapper */}
      <div
        className={`relative h-full w-full transition-transform duration-300 ease-out ${
          isHovered ? "scale-[1.04]" : "scale-100"
        }`}
      >
          {/* Rounded folded corner / peck */}
        <Peck color={labelColor} show={isHovered} width={cutSize} height={cutY} />

        {/* Main card */}
        <div
          className="relative h-full w-full overflow-hidden
            shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
          style={{
            backgroundColor: cardColor,
            borderRadius: "clamp(12px, 1.25vw, 24px)",
            clipPath: `polygon(
              0 0,
              calc(100% - ${cutSize}) 0,
              100% ${cutY},
              100% 100%,
              0 100%
            )`,
          }}
        >
          {/* Logo */}
          <div
            className="absolute left-1/2 top-[44%]
              -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${((univ.logoSize / 253) * 100).toFixed(1)}%`,
              height: `${((univ.logoSize / 375) * 100).toFixed(1)}%`,
            }}
          >
            <Image
              src={univ.logo}
              alt={univ.name}
              fill
              sizes="200px"
              className="object-contain"
              style={{
                filter:
                  "drop-shadow(0 0 0.6px rgba(0,0,0,0.4))",
              }}
            />
          </div>

          {/* University name label */}
          <div
            className="absolute left-1/2 top-[86.67%]
              flex h-[10.13%] w-[90.5%]
              -translate-x-1/2 items-center justify-center
              overflow-hidden rounded-[clamp(6px,0.63vw,12px)] px-2"
            style={{
              backgroundColor: labelColor,
            }}
          >
            <span
              className="max-w-full truncate text-center
                font-['Inter',sans-serif]
                text-[clamp(7px,0.63vw,12px)]
                font-semibold leading-[1.2] text-white"
            >
              {univ.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}