import { NextResponse } from "next/server";
import { readLeads, writeLeads, type Lead } from "@/lib/db";
import { notifyNewLead } from "@/lib/notify";

type LeadPayload = {
  brand?: string;
  name?: string;
  painPoint?: string;
  phone?: string;
  email?: string;
  source?: string;
};

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as LeadPayload | null;

  const name = normalize(body?.name);
  const phone = normalize(body?.phone);
  const email = normalize(body?.email);
  const brand = normalize(body?.brand);
  const painPoint = normalize(body?.painPoint);
  const source = normalize(body?.source) || "Website";

  if (!name || (!phone && !email)) {
    return NextResponse.json(
      { error: "Name and an email or phone number are required." },
      { status: 400 }
    );
  }

  const lead: Lead = {
    id: `lead-${Date.now()}`,
    name,
    phone,
    email,
    brand,
    painPoint,
    source,
    createdAt: new Date().toISOString()
  };

  // 1) Persist to the backend (this is what the admin Leads panel reads)
  try {
    const leads = await readLeads();
    leads.push(lead);
    await writeLeads(leads);
  } catch (error) {
    console.error("Failed to save lead:", error);
    return NextResponse.json(
      { error: "Could not save your details right now. Please try again." },
      { status: 500 }
    );
  }

  // 2) Fire notifications (owner alert + lead confirmation). Never blocks/breaks.
  await notifyNewLead(lead).catch((error) => console.error("Notification error:", error));

  // 3) Optional: also forward to a Google Sheet if configured
  const sheetWebhook = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (sheetWebhook) {
    fetch(sheetWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp: lead.createdAt, name, phone, email, brand, painPoint, source }),
      cache: "no-store"
    }).catch(() => null);
  }

  return NextResponse.json({ ok: true });
}
