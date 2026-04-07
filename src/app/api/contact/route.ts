import { NextResponse, type NextRequest } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export const runtime = "nodejs";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  if (!trimmed) return null;
  if (trimmed.length > max) return null;
  return trimmed;
}

export async function POST(req: NextRequest) {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Server is not configured to accept messages." },
      { status: 500 }
    );
  }

  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = asString(body.name, 120);
  const email = asString(body.email, 200);
  const service = asString(body.service, 120);
  const message = asString(body.message, 5000);
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 40) : "";

  if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!email || !EMAIL_RE.test(email))
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  if (!service) return NextResponse.json({ error: "Please select a service." }, { status: 400 });
  if (!message) return NextResponse.json({ error: "Message is required." }, { status: 400 });

  try {
    await writeClient.create({
      _type: "contactMessage",
      name,
      email,
      phone: phone || undefined,
      service,
      message,
      submittedAt: new Date().toISOString(),
      status: "new",
    });
  } catch (err) {
    console.error("Failed to save contact message:", err);
    return NextResponse.json(
      { error: "Something went wrong saving your message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
