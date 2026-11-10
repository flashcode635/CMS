import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { randomBytes, randomUUID, scrypt, timingSafeEqual, createHmac } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const usersFile = ".data/users.json";
const sessionCookie = "study_palace_session";
const sessionLifetimeSeconds = 60 * 60 * 24 * 30;

export interface AuthUser {
  id: string;
  username: string;
  email: string;
}

interface StoredUser extends AuthUser {
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
}

interface SessionPayload {
  userId: string;
  expiresAt: number;
}

function getAuthSecret(): string {
  if (process.env.AUTH_SECRET) {
    return process.env.AUTH_SECRET;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be set in production");
  }

  return "local-development-only-study-palace-secret";
}

async function readUsers(): Promise<StoredUser[]> {
  try {
    return JSON.parse(await readFile(usersFile, "utf8")) as StoredUser[];
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeUsers(users: StoredUser[]): Promise<void> {
  await mkdir(".data", { recursive: true });
  const temporaryFile = `${usersFile}.${randomUUID()}.tmp`;
  await writeFile(temporaryFile, JSON.stringify(users, null, 2), "utf8");
  await rename(temporaryFile, usersFile);
}

function publicUser(user: StoredUser): AuthUser {
  const { id, username, email } = user;
  return { id, username, email };
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validateCredentials(input: {
  username?: unknown;
  email?: unknown;
  password?: unknown;
}): { username: string; email: string; password: string } {
  const username = typeof input.username === "string" ? input.username.trim() : "";
  const email = typeof input.email === "string" ? normalizeEmail(input.email) : "";
  const password = typeof input.password === "string" ? input.password : "";

  if (!username || username.length < 3 || username.length > 24 || !/^[a-zA-Z0-9_]+$/.test(username)) {
    throw new Error("Username must be 3–24 characters using letters, numbers, or underscores.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Enter a valid email address.");
  }
  if (password.length < 8 || password.length > 128) {
    throw new Error("Password must be between 8 and 128 characters.");
  }

  return { username, email, password };
}

async function hashPassword(password: string, salt: Buffer): Promise<Buffer> {
  return (await scryptAsync(password, salt, 64)) as Buffer;
}

export async function createUser(input: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthUser> {
  const users = await readUsers();
  if (users.some((user) => user.email === input.email || user.username.toLowerCase() === input.username.toLowerCase())) {
    throw new Error("That username or email is already in use.");
  }

  const salt = randomBytes(16);
  const passwordHash = await hashPassword(input.password, salt);
  const user: StoredUser = {
    id: randomUUID(),
    username: input.username,
    email: input.email,
    passwordHash: passwordHash.toString("base64"),
    passwordSalt: salt.toString("base64"),
    createdAt: new Date().toISOString(),
  };

  await writeUsers([...users, user]);
  return publicUser(user);
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser> {
  const users = await readUsers();
  const user = users.find((candidate) => candidate.email === normalizeEmail(email));
  if (!user) {
    throw new Error("Email or password is incorrect.");
  }

  const actualHash = await hashPassword(password, Buffer.from(user.passwordSalt, "base64"));
  const expectedHash = Buffer.from(user.passwordHash, "base64");
  if (actualHash.length !== expectedHash.length || !timingSafeEqual(actualHash, expectedHash)) {
    throw new Error("Email or password is incorrect.");
  }

  return publicUser(user);
}

function encodeSession(payload: SessionPayload): string {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", getAuthSecret()).update(encodedPayload).digest("base64url");
  return `${encodedPayload}.${signature}`;
}

function decodeSession(token: string): SessionPayload | null {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = createHmac("sha256", getAuthSecret()).update(encodedPayload).digest();
  const receivedSignature = Buffer.from(signature, "base64url");
  if (expectedSignature.length !== receivedSignature.length || !timingSafeEqual(expectedSignature, receivedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as SessionPayload;
    return payload.expiresAt > Date.now() ? payload : null;
  } catch {
    return null;
  }
}

export async function createSession(user: AuthUser): Promise<string> {
  return encodeSession({
    userId: user.id,
    expiresAt: Date.now() + sessionLifetimeSeconds * 1000,
  });
}

export async function getUserFromSession(token: string | undefined): Promise<AuthUser | null> {
  if (!token) {
    return null;
  }
  const payload = decodeSession(token);
  if (!payload) {
    return null;
  }
  const user = (await readUsers()).find((candidate) => candidate.id === payload.userId);
  return user ? publicUser(user) : null;
}

export { sessionCookie, sessionLifetimeSeconds };
