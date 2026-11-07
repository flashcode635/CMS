/* ---------- types ---------- */
export type ContentType = "universities" | "countries";
export type Status = "draft" | "published";
export type Entry = {
  id: string;
  type: ContentType;
  slug: string;
  title: string;
  status: Status;
  data: Record<string, unknown>;
  updatedAt?: string;
};
export type Section = {
  id: string;
  type: string;
  label: string;
  visible: boolean;
  data: Record<string, unknown>;
};
export type Pane = "list" | "form" | "preview";
export type Toast = { text: string; kind: "success" | "error" } | null;
export type RussiaBannerProps = {
  sectionLabel?: string;
  title?: string;
  subtitle?: string;
  rating?: string;
  ratingLabel?: string;
  yellowStarSrc?: string;
  greyStarSrc?: string;
  consultationHref?: string| URL;
  consultationLabel?: string;
  languagesLabel?: string;
  languages?: string;
  currencyLabel?: string;
  currency?: string;
};