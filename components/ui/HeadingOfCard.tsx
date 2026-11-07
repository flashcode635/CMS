import { JSX } from "react/jsx-runtime";

export type HeadingOfCardProps = {
  title: string;
  italic?: boolean;
  description?: JSX.Element;
  prefix?: string; // ← normal-weight text before the gradient title
  type: "bold" | "normal";
};

export default function HeadingOfCard({
  title,
  description,
  prefix,
  italic,
  type = "bold",
}: HeadingOfCardProps) {
  const gradientStyle = {
    fontFamily: "Inter, sans-serif",
    backgroundImage: "linear-gradient(169deg, #0E8F5B 12.704%, #0B3B2E 87.17%)",
  };

const size = "text-3xl lg:text-[40px]";

  return (
    <section className="w-full px-6 sm:px-10 lg:px-20 xl:px-32 py-4 lg:py-10">
      <div className="max-w-300 mx-auto flex flex-col gap-2">

        {/* ── Gradient heading ── */}
        <h2
          className={`leading-tight lg:leading-[1.2] bg-clip-text text-transparent`}
          style={gradientStyle}
        >
          {/* Normal-weight prefix (e.g. "Top Countries for ") */}
          {prefix && (
            <span
              className={`font-normal
                 ${size}

                   `
            }
            >
              {prefix}
            </span>
          )}

          {/* Bold gradient title (e.g. "Study/MBBS in Abroad") */}
          {type === "bold" && (
            <span
              className={`font-bold
                 ${size}
                 ${
                italic ? "italic" : "not-italic"
              }`}
            >
              {title}
            </span>
          )}

          {/* Normal-weight full title (fallback when type="normal") */}
          {type === "normal" && (
            <span
              className={`font-normal text-4xl lg:text-[50px] ${
                italic ? "italic" : "not-italic"
              }`}
            >
              {title}
            </span>
          )}
        </h2>

        {/* ── Body copy ─ */}
        {description}
      </div>
    </section>
  );
}