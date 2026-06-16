import { NextResponse } from "next/server";

type LeadPayload = {
  brand?: string;
  name?: string;
  painPoint?: string;
  phone?: string;
};

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as LeadPayload | null;

  const name = normalize(body?.name);
  const phone = normalize(body?.phone);
  const brand = normalize(body?.brand);
  const painPoint = normalize(body?.painPoint);

  if (!name || !phone || !painPoint) {
    return NextResponse.json(
      { error: "Name, phone, and pain point are required." },
      { status: 400 }
    );
  }

  const sheetWebhook = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!sheetWebhook) {
    return NextResponse.json(
      {
        error:
          "Contact storage is not configured yet. Add GOOGLE_APPS_SCRIPT_URL to enable submissions."
      },
      { status: 503 }
    );
  }

  const sheetResponse = await fetch(sheetWebhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      name,
      phone,
      brand,
      painPoint
    }),
    cache: "no-store"
  });

  if (!sheetResponse.ok) {
    return NextResponse.json(
      { error: "Lead capture failed. Please try again shortly." },
      { status: 502 }
    );
  }

  const interaktWebhook = process.env.INTERAKT_WEBHOOK_URL;
  if (interaktWebhook) {
    await fetch(interaktWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `🔔 New lead: ${name} | ${phone} | Stuck with: ${painPoint.slice(
          0,
          80
        )}`,
        lead: {
          brand,
          name,
          painPoint,
          phone
        }
      }),
      cache: "no-store"
    }).catch(() => null);
  }

  return NextResponse.json({ ok: true });
}
