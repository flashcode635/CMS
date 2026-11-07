/**
 * /gallery — redirects to /gallery/images as the default gallery view
 */
import { redirect } from "next/navigation";

export default function GalleryPage() {
  redirect("/gallery/images");
}
