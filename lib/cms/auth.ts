import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";

type Session = { sub: string; exp: number };
function verify(token: string | undefined): Session | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  const secret = process.env.CMS_SESSION_SECRET;
  if (!payload || !signature || !secret || secret.length < 32) return null;
  const expected = createHmac("sha256", secret).update(payload).digest();
  const actual = Buffer.from(signature, "base64url");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as Session;
    return typeof session.sub === "string" && typeof session.exp === "number" && session.exp > Date.now() ? session : null;
  } catch { return null; }
}
export async function verifyAdmin() {
  const jar = await cookies();
  const session = verify(jar.get("sp_admin_session")?.value);
  if (!session || session.sub !== process.env.CMS_ADMIN_EMAIL?.trim().toLowerCase()) return null;
  return { email: session.sub };
}
export async function requireAdmin() { return verifyAdmin(); }

export function originIsValid(request: Request) {
  const origin = request.headers.get("origin");
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (!origin || !site) return false;
  try { return new URL(origin).origin === new URL(site).origin; }
  catch { return false; }
}


// zod schema for validating signup data
export const signupSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
  // optional username field-> used only for signup, not for login.
  username: z.string().optional(), 
  role: z.enum(['ADMIN', 'USER', 'GUEST']),
});
