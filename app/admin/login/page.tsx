import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin login | Study Palace",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section className="flex min-h-[calc(100vh-7rem)] items-center
     justify-center bg-surface px-5 py-12">
      <LoginForm />
    </section>
  );
}
