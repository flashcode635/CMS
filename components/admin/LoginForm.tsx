"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

const SAMPLE_ADMIN = {
  email: "admin@mystudyhub.com",
  password: "MyStudyHub@123",
} as const;

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const isValidAdmin =
        emailRef.current?.value.trim().toLowerCase() === SAMPLE_ADMIN.email &&
        passwordRef.current?.value === SAMPLE_ADMIN.password;

      if (!isValidAdmin) {
        throw new Error("Invalid admin credentials");
      }

      window.location.href = "/admin/dashboard";
    } catch (submitError: unknown) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "An error occurred during admin login",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-brand-sky/60 bg-[#f8fbff] p-8 shadow-xl shadow-brand-blue/10">
      <div className="mb-8 text-center">
        <h1 className="font-['Poppins'] text-2xl font-bold text-brand-navy">Admin Portal</h1>
        <p className="mt-2 font-['Lexend'] text-sm text-slate-500">
          Sign in to access the My Study Hub dashboard
        </p>
      </div>

      {error && (
        <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block text-sm font-medium text-brand-navy">
          Email Address
          <input
            type="email"
            required
            ref={emailRef}
            className="mt-1 w-full rounded-xl border border-brand-sky/80 bg-white px-4 py-3 text-brand-navy outline-none transition placeholder:text-brand-navy/40 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30"
            placeholder={SAMPLE_ADMIN.email}
          />
        </label>

        <label className="block text-sm font-medium text-brand-navy">
          Password
          <input
            type="password"
            required
            ref={passwordRef}
            className="mt-1 w-full rounded-xl border border-brand-sky/80 bg-white px-4 py-3 text-brand-navy outline-none transition placeholder:text-brand-navy/40 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30"
            placeholder="Enter your admin password"
          />
        </label>

        <Button
          type="submit"
          fullWidth
          isLoading={loading}
          size="bare"
          shape="xl"
          className="bg-linear-135 from-brand-green to-brand-blue px-6 py-3.5 active:scale-[0.99]"
        >
          Sign in to admin
        </Button>
      </form>
    </div>
  );
}
