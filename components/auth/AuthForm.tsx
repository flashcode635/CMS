"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AuthMode = "login" | "signup";

interface AuthFormProps {
  mode: AuthMode;
}

function SparkleMark() {
  return (
    <svg viewBox="0 0 42 42" className="size-10" aria-hidden="true">
      <path d="M21 2.5 24.7 17.3 39.5 21l-14.8 3.7L21 39.5l-3.7-14.8L2.5 21l14.8-3.7L21 2.5Z" fill="#ffffff" />
      <circle cx="21" cy="21" r="5" fill="#0E8F5B" />
    </svg>
  );
}

function AuthIllustration() {
  return (
    <svg viewBox="0 0 520 520" className="absolute -bottom-12 -right-14 hidden w-100 opacity-90 lg:block" aria-hidden="true">
      <defs>
        <linearGradient id="orb" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#D8B26E" />
          <stop offset="1" stopColor="#0B3B2E" />
        </linearGradient>
        <filter id="blur"><feGaussianBlur stdDeviation="18" /></filter>
      </defs>
      <circle cx="260" cy="260" r="190" fill="url(#orb)" opacity=".18" filter="url(#blur)" />
      <circle cx="260" cy="260" r="145" fill="none" stroke="#fff" strokeOpacity=".16" />
      <circle cx="260" cy="260" r="102" fill="none" stroke="#fff" strokeDasharray="5 13" strokeOpacity=".22" />
      <path d="M105 325c48-72 105-108 170-108 62 0 110 31 145 93" fill="none" stroke="#fff" strokeLinecap="round" strokeOpacity=".28" strokeWidth="2" />
      <path d="M184 156 260 111l76 45v92l-76 45-76-45v-92Z" fill="#fff" fillOpacity=".08" stroke="#fff" strokeOpacity=".3" strokeWidth="2" />
      <path d="m225 204 27 27 55-62" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
      <circle cx="110" cy="140" r="5" fill="#D8B26E" /><circle cx="407" cy="128" r="4" fill="#fff" />
    </svg>
  );
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Invalid credentials");
    }

    router.push("/admin/dashboard");
    router.refresh();
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="relative isolate flex min-h-[calc(100vh-7rem)] items-center overflow-hidden bg-[#0B3B2E] px-5 py-12 sm:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(216,178,110,.22),transparent_35%),radial-gradient(circle_at_90%_80%,rgba(216,178,110,.25),transparent_40%)]" />
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-4xl border border-white/10 bg-white/6 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative hidden min-h-156 overflow-hidden p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <AuthIllustration />
          <div className="relative">
            <div className="mb-10 flex items-center gap-3"><SparkleMark /><span className="text-xl font-semibold tracking-tight">Study Palace</span></div>
            <p className="mb-5 max-w-md text-sm font-medium uppercase tracking-[.28em] text-brand-champagne-soft">Your next chapter starts here</p>
            <h1 className="max-w-lg font-serif text-5xl font-semibold leading-[1.05] tracking-[-.02em]">Make space for a brighter future.</h1>
            <p className="mt-6 max-w-md text-base leading-7 text-brand-champagne-soft">A calm, focused place to plan your journey, discover opportunities, and keep moving forward.</p>
          </div>
          <div className="relative flex items-center gap-3 text-xs text-brand-champagne-soft"><span className="size-2 rounded-full bg-brand-emerald shadow-[0_0_16px_#D8B26E]" /> Secure, simple and made for ambitious minds</div>
        </div>

        <div className="bg-[#F7F4EE] p-7 sm:p-12">
          <div className="mb-9 lg:hidden"><span className="inline-flex items-center gap-2 text-lg font-semibold text-[#0B3B2E]"><span className="grid size-9 place-items-center rounded-xl bg-[#0B3B2E]"><SparkleMark /></span>Study Palace</span></div>
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[.22em] text-brand-green">{isSignup ? "Create your account" : "Welcome back"}</p>
            <h2 className="font-serif text-3xl font-semibold tracking-[-.02em] text-[#0B3B2E]">{isSignup ? "Begin your journey." : "Good to see you again."}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{isSignup ? "Join a community building bold futures." : "Sign in to pick up right where you left off."}</p>
          </div>

          {error && <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && <label className="block"><span className="mb-2 block text-sm font-medium text-body">Username</span><input value={username} onChange={(event) => setUsername(event.target.value)} required minLength={3} maxLength={24} autoComplete="username" placeholder="yourname" className="h-12 w-full rounded-xl border border-line bg-white px-4 text-ink outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10" /></label>}
            <label className="block"><span className="mb-2 block text-sm font-medium text-body">Email address</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" placeholder="you@example.com" className="h-12 w-full rounded-xl border border-line bg-white px-4 text-ink outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10" /></label>
            <label className="block"><span className="mb-2 block text-sm font-medium text-body">Password</span><span className="relative block"><input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} autoComplete={isSignup ? "new-password" : "current-password"} placeholder="At least 8 characters" className="h-12 w-full rounded-xl border border-line bg-white px-4 pr-12 text-ink outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10" /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted transition hover:bg-surface-alt hover:text-body"><svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="1.8" aria-hidden="true"><path d={showPassword ? "M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 4.2A10.7 10.7 0 0 1 12 4c5.5 0 9.5 8 9.5 8a17.4 17.4 0 0 1-3.1 3.9M6.5 6.5C3.8 8.3 2.5 12 2.5 12s4 8 9.5 8c1 0 1.9-.2 2.8-.5" : "M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"} /><circle cx="12" cy="12" r="2.5" /></svg></button></span></label>
            <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0B3B2E] px-5 text-sm font-semibold text-white shadow-lg shadow-[#0B3B2E]/20 transition hover:-translate-y-0.5 hover:bg-brand-emerald-deep disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Please wait…" : isSignup ? "Create account" : "Sign in"}<svg viewBox="0 0 20 20" className="size-4 fill-none stroke-current" strokeWidth="2" aria-hidden="true"><path d="M4 10h11m-5-5 5 5-5 5" /></svg></button>
          </form>
          <p className="mt-8 text-center text-sm text-muted">{isSignup ? "Already have an account?" : "New to Study Palace?"} <Link href={isSignup ? "/login" : "/signup"} className="font-semibold text-brand-blue hover:underline">{isSignup ? "Sign in" : "Create one"}</Link></p>
        </div>
      </div>
    </section>
  );
}
