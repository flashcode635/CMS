import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium " +
    "transition-all duration-200 cursor-pointer " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 focus-visible:ring-offset-2 " +
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        brand:
          "bg-linear-135 from-brand-green to-brand-blue text-white shadow-md hover:opacity-90 active:scale-[0.98]",
        brandSolid: "bg-brand-green text-white hover:opacity-90 active:scale-[0.98]",
        brandOutline:
          "border border-brand-blue bg-transparent text-brand-blue hover:bg-brand-blue hover:text-white",
        brandWide:
          "bg-linear-90 from-brand-green via-brand-cyan to-brand-blue text-white shadow-lg hover:scale-105 hover:shadow-cyan-500/30",
        brandBorder:
          "border-2 border-transparent text-white hover:bg-cyan-500/20 " +
          "[background:linear-gradient(#061833,#061833)_padding-box,linear-gradient(90deg,#00923F,#00b4d8,#3163FF)_border-box]",
        outline:
          "border border-gray-300 bg-white text-gray-700 hover:border-brand-royal hover:text-brand-royal",
        tab:
          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 " +
          "data-[active=true]:border-transparent data-[active=true]:bg-linear-135 " +
          "data-[active=true]:from-brand-green data-[active=true]:to-brand-blue data-[active=true]:text-white",
        glass: "border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
        dark:
          "border border-cyan-700/90 bg-[#051833]/90 text-white/90 hover:border-cyan-400/60 hover:bg-cyan-700/20",
        ghost: "bg-transparent text-inherit hover:bg-black/5",
        unstyled: "font-normal",
        nav: "bg-transparent text-white",
        link: "text-brand-blue underline-offset-4 hover:underline",
        destructive: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        bare: "",
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base sm:h-16 sm:text-lg",
        icon: "size-10 p-0",
        iconLg: "size-12 p-0",
      },
      shape: {
        none: "rounded-none",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        pill: "rounded-full",
      },
      fullWidth: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "brand", size: "md", shape: "lg", fullWidth: false },
  },
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  active?: boolean;
};

// icon size = aria-label compulsory (type level)
type IconOnly = { size: "icon" | "iconLg"; "aria-label": string };
type WithText = { size?: Exclude<VariantProps<typeof buttonVariants>["size"], "icon" | "iconLg"> };

export type ButtonProps = Omit<React.ComponentProps<"button">, "size"> &
  Omit<CommonProps, "size"> &
  (IconOnly | WithText);

function Spinner() {
  return (
    <svg className="size-[1em] animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export function Button({
  className, variant, size, shape, fullWidth, active, isLoading = false,
  leftIcon, rightIcon, disabled, type = "button", children, ref, ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      data-active={active}
      className={cn(buttonVariants({ variant, size, shape, fullWidth }), className)}
      {...props}
    >
      {isLoading ? <Spinner /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}

// Link jo button jaisa dikhe (46 styled <Link>/<a> ko migrate karne ke liye)
export function ButtonLink({
  className, variant, size, shape, fullWidth, ...props
}: React.ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>) {
  return <Link className={cn(buttonVariants({ variant, size, shape, fullWidth }), className)} {...props} />;
}

export default Button;

