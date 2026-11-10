import { redirect } from "next/navigation";

export default function OldPage() {
  redirect("/admin/login");
}