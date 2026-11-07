import Link from "next/link";
import { ReactNode, ComponentType } from "react";
import LucideIcon, { LucideProps } from "lucide-react";
export interface DropdownItemData {
  href: string;
  icon: ComponentType<LucideProps>;
  label: string;
}

export interface DropdownItemProps extends DropdownItemData {
  onClose?: () => void;
}

export default function DropdownItem({ href, icon: Icon, label, onClose }: DropdownItemProps) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="nd-item group"
      style={{
        display:        "flex",
        alignItems:     "center",
        gap:            12,
        height:         46,
        padding:        "0 12px",
        borderRadius:   11,
        textDecoration: "none",
        fontFamily:     "'Inter',sans-serif",
        fontSize:       14,
        fontWeight:     500,
        flexShrink:     0,
        position:       "relative",
        overflow:       "hidden",
        background:     "rgba(255,255,255,0.07)",
        border:         "1px solid rgba(255,255,255,0.1)",
        color:          "white",
        transition:     "border-color 0.18s",
      }}
    >
      <span
        aria-hidden
        className="nd-grad"
        style={{
          position:        "absolute",
          inset:           0,
          backgroundImage: "linear-gradient(147.53deg,#0E8F5B 12.704%,#0B3B2E 87.17%)",
          opacity:         0,
          transition:      "opacity 0.18s ease",
          borderRadius:    "inherit",
          pointerEvents:   "none",
        }}
      />
      <span
        style={{
          position:       "relative",
          zIndex:         1,
          width:          30,
          height:         30,
          borderRadius:   6,
          background:     "rgba(255,255,255,0.15)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          flexShrink:     0,
        }}
      >
        <Icon size={16} strokeWidth={1.8} />
      </span>
      <span style={{ position:"relative", zIndex:1 }}>{label}</span>
    </Link>
  );
}