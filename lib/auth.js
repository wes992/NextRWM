// import { SignJWT, jwtVerify } from "jose";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function encrypt(payload) {
  return jwt.sign(
    {
      userId: payload.id,
      username: payload.username,
    },
    process.env.SECRET,
    { expiresIn: "1hr" }
  );
}

export async function decrypt(input) {
  const payload = jwt.verify(input, process.env.SECRET);
  return payload;
}

export async function logout() {
  "use server";
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/rentals");
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 3600 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });

  return res;
}
