import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Sign in | Study Palace",
  description: "Sign in to your Study Palace account.",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}