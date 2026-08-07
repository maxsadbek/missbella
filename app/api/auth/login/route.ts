import { NextRequest, NextResponse } from "next/server";
import { findByEmail, setAuthCookie, verifyPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const password = body.password ?? "";

  if (!email || !password) {
    return NextResponse.json({ error: "invalidCredentials" }, { status: 400 });
  }

  const user = await findByEmail(email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ error: "invalidCredentials" }, { status: 401 });
  }

  await setAuthCookie(user.id);
  const { passwordHash: _ph, ...safe } = user;
  return NextResponse.json({ user: safe });
}
