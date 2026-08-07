import { NextRequest, NextResponse } from "next/server";
import { createUser, findByEmail, setAuthCookie } from "@/lib/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();
  const password = body.password ?? "";

  if (name.length < 2) {
    return NextResponse.json({ error: "nameShort" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "emailInvalid" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "passwordShort" }, { status: 400 });
  }

  const existing = await findByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "emailExists" }, { status: 409 });
  }

  const user = await createUser(name, email, password);
  await setAuthCookie(user.id);
  return NextResponse.json({ user }, { status: 201 });
}
