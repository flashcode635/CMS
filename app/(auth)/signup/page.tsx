import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Create account | Study Palace",
  description: "Create your Study Palace account.",
};

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}
