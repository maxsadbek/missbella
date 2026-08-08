"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type StoredUser = AuthUser & { passwordHash: string };

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const USERS_KEY = "s20_users";
const SESSION_KEY = "s20_session";
const PBKDF2_ITERATIONS = 100_000;

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full / blocked — ignore
  }
}

function removeKey(key: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

function readUsers(): StoredUser[] {
  const users = readJSON<unknown>(USERS_KEY, []);
  return Array.isArray(users) ? (users as StoredUser[]) : [];
}

function writeUsers(users: StoredUser[]) {
  writeJSON(USERS_KEY, users);
}

function getSessionUser(): AuthUser | null {
  return readJSON<AuthUser | null>(SESSION_KEY, null);
}

function saveSession(user: AuthUser) {
  writeJSON(SESSION_KEY, user);
}

function clearSession() {
  removeKey(SESSION_KEY);
}

function randomId() {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(hex: string): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(new ArrayBuffer(hex.length / 2));
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

async function hashPassword(password: string, saltHex?: string) {
  if (typeof crypto === "undefined" || !crypto.subtle) {
    throw new Error("secureContext");
  }
  const salt = saltHex ?? bytesToHex(crypto.getRandomValues(new Uint8Array(16)));
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: hexToBytes(salt),
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    key,
    256
  );
  return `${salt}:${bytesToHex(new Uint8Array(bits))}`;
}

async function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = await hashPassword(password, salt);
  const [, derivedHash] = derived.split(":");
  return Boolean(derivedHash) && derivedHash === hash;
}

function toSafeUser(user: StoredUser): AuthUser {
  const { passwordHash: _ph, ...safe } = user;
  return safe;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore the session from localStorage right after mount.
  useEffect(() => {
    setUser(getSessionUser());
    setLoading(false);
  }, []);

  // Keep the session in sync across tabs (login/logout in one tab updates others).
  useEffect(() => {
    const onStorage = (ev: StorageEvent) => {
      if (ev.key === SESSION_KEY) setUser(getSessionUser());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const normalized = email.trim().toLowerCase();
    const found = readUsers().find((u) => u.email === normalized);
    if (!found || !(await verifyPassword(password, found.passwordHash))) {
      throw new Error("invalidCredentials");
    }
    const safe = toSafeUser(found);
    saveSession(safe);
    setUser(safe);
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const normalized = email.trim().toLowerCase();
      const users = readUsers();
      if (users.some((u) => u.email === normalized)) {
        throw new Error("emailExists");
      }
      const stored: StoredUser = {
        id: randomId(),
        name: name.trim(),
        email: normalized,
        passwordHash: await hashPassword(password),
        createdAt: new Date().toISOString(),
      };
      users.push(stored);
      writeUsers(users);
      const safe = toSafeUser(stored);
      saveSession(safe);
      setUser(safe);
    },
    []
  );

  const logout = useCallback(async () => {
    clearSession();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
