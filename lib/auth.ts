import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";

export type User = { id: string; name: string; email: string; createdAt: string };
type StoredUser = User & { passwordHash: string };

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const COOKIE_NAME = "s20_token";
const TOKEN_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days
const SECRET = process.env.AUTH_SECRET || "20-maktab-dev-secret-change-me";

function getHmac(data: string) {
  return createHmac("sha256", SECRET).update(data).digest("hex");
}

function toSafeUser(user: StoredUser): User {
  const { passwordHash: _ph, ...safe } = user;
  return safe;
}

async function readUsers(): Promise<StoredUser[]> {
  try {
    const raw = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}

async function writeUsers(users: StoredUser[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return derived.length === expected.length && timingSafeEqual(derived, expected);
}

export async function findByEmail(email: string) {
  const users = await readUsers();
  return users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );
}

export async function createUser(name: string, email: string, password: string) {
  const users = await readUsers();
  const stored: StoredUser = {
    id: randomBytes(8).toString("hex"),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  users.push(stored);
  await writeUsers(users);
  return toSafeUser(stored);
}

export function signToken(userId: string) {
  const payload = `${userId}.${Date.now() + TOKEN_TTL}`;
  return `${payload}.${getHmac(payload)}`;
}

export function verifyToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const [userId, exp, sig] = token.split(".");
  if (!userId || !exp || !sig) return null;
  const expected = getHmac(`${userId}.${exp}`);
  if (sig.length !== expected.length) return null;
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  const expires = Number(exp);
  if (!Number.isFinite(expires) || Date.now() > expires) return null;
  return userId;
}

export async function setAuthCookie(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, signToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TOKEN_TTL / 1000,
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userId = verifyToken(cookieStore.get(COOKIE_NAME)?.value);
  if (!userId) return null;
  const users = await readUsers();
  const user = users.find((u) => u.id === userId);
  return user ? toSafeUser(user) : null;
}
