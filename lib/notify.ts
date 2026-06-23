import type { Lead } from "./db";

/*
 * Lead notifications. Everything here is OPTIONAL and env-gated — if the env
 * vars aren't set, these are no-ops and lead submission still succeeds. Nothing
 * in here ever throws out (failures are logged), so the form never breaks.
 *
 * Configure in .env.local (see .env.example):
 *   RESEND_API_KEY, LEAD_NOTIFY_TO, LEAD_NOTIFY_FROM   -> owner email alert
 *   INTERAKT_API_KEY, INTERAKT_OWNER_TEMPLATE, OWNER_WHATSAPP -> owner WhatsApp
 *   INTERAKT_API_KEY, INTERAKT_LEAD_TEMPLATE           -> lead WhatsApp confirmation
 */

const SITE = "Ads of Stupid";

async function sendOwnerEmail(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_TO;
  const from = process.env.LEAD_NOTIFY_FROM;
  if (!key || !to || !from) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      subject: `🔔 New lead: ${lead.name} — ${lead.source}`,
      html: `
        <h2>New lead on ${SITE}</h2>
        <table style="font-size:15px;line-height:1.7">
          <tr><td><b>Name</b></td><td>${lead.name}</td></tr>
          <tr><td><b>Email</b></td><td>${lead.email || "—"}</td></tr>
          <tr><td><b>Phone</b></td><td>${lead.phone || "—"}</td></tr>
          <tr><td><b>Brand</b></td><td>${lead.brand || "—"}</td></tr>
          <tr><td><b>Source</b></td><td>${lead.source}</td></tr>
          <tr><td><b>Message</b></td><td>${lead.painPoint || "—"}</td></tr>
          <tr><td><b>Time</b></td><td>${new Date(lead.createdAt).toLocaleString()}</td></tr>
        </table>`
    })
  });
}

// Confirmation email to the lead (when they gave an email).
async function sendLeadEmail(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_NOTIFY_FROM;
  if (!key || !from || !lead.email) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: lead.email,
      subject: `Thanks, ${lead.name} — your free brand strategy is on the way`,
      html: `
        <p>Hi ${lead.name},</p>
        <p>Thanks for reaching out to <b>${SITE}</b>. We've got your details and we'll review your brand and email you a free, no-pressure strategy within 24 hours.</p>
        <p>— Team Ads of Stupid</p>`
    })
  });
}

// Interakt WhatsApp Business message via an approved template.
async function sendInteraktWhatsApp(phone: string, templateName: string, bodyValues: string[]) {
  const key = process.env.INTERAKT_API_KEY;
  if (!key || !templateName || !phone) return;

  const digits = phone.replace(/\D/g, "");
  const local = digits.length > 10 ? digits.slice(-10) : digits;

  await fetch("https://api.interakt.ai/v1/public/message/", {
    method: "POST",
    headers: { Authorization: `Basic ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      countryCode: "+91",
      phoneNumber: local,
      type: "Template",
      template: { name: templateName, languageCode: "en", bodyValues }
    })
  });
}

export async function notifyNewLead(lead: Lead) {
  const tasks: Promise<unknown>[] = [];

  // 1) Notify the owner by email
  tasks.push(sendOwnerEmail(lead));

  // 2) Notify the owner on WhatsApp
  const ownerPhone = process.env.OWNER_WHATSAPP;
  const ownerTemplate = process.env.INTERAKT_OWNER_TEMPLATE;
  if (ownerPhone && ownerTemplate) {
    tasks.push(sendInteraktWhatsApp(ownerPhone, ownerTemplate, [lead.name, lead.phone, lead.source]));
  }

  // 3) Confirm to the lead — email if they gave one, else WhatsApp
  if (lead.email) {
    tasks.push(sendLeadEmail(lead));
  } else {
    const leadTemplate = process.env.INTERAKT_LEAD_TEMPLATE;
    if (leadTemplate && lead.phone) {
      tasks.push(sendInteraktWhatsApp(lead.phone, leadTemplate, [lead.name]));
    }
  }

  const results = await Promise.allSettled(tasks);
  for (const r of results) {
    if (r.status === "rejected") console.error("Lead notification failed:", r.reason);
  }
}
