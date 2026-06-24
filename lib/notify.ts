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

/* Lead fields are attacker-controlled (public form). Escape before placing
 * them into any email HTML to prevent injected markup / phishing content. */
function esc(value: string | undefined) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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
          <tr><td><b>Name</b></td><td>${esc(lead.name)}</td></tr>
          <tr><td><b>Email</b></td><td>${esc(lead.email) || "—"}</td></tr>
          <tr><td><b>Phone</b></td><td>${esc(lead.phone) || "—"}</td></tr>
          <tr><td><b>Brand</b></td><td>${esc(lead.brand) || "—"}</td></tr>
          <tr><td><b>Source</b></td><td>${esc(lead.source)}</td></tr>
          <tr><td><b>Message</b></td><td>${esc(lead.painPoint) || "—"}</td></tr>
          <tr><td><b>Time</b></td><td>${esc(new Date(lead.createdAt).toLocaleString())}</td></tr>
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
        <p>Hi ${esc(lead.name)},</p>
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

// FREE owner WhatsApp alert via CallMeBot (https://www.callmebot.com).
// No business account / template approval needed — only messages the owner's
// own opted-in number. Env: CALLMEBOT_PHONE (with country code) + CALLMEBOT_APIKEY.
async function sendOwnerWhatsAppFree(lead: Lead) {
  const phone = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apikey) return;

  const lines = [
    `🔔 New lead on ${SITE}`,
    `Name: ${lead.name}`,
    lead.email ? `Email: ${lead.email}` : `Phone: ${lead.phone}`,
    lead.brand ? `Brand: ${lead.brand}` : null,
    `Source: ${lead.source}`
  ]
    .filter(Boolean)
    .join("\n");

  const url =
    `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}` +
    `&apikey=${encodeURIComponent(apikey)}&text=${encodeURIComponent(lines)}`;

  await fetch(url, { cache: "no-store" });
}

// FREE official WhatsApp confirmation to the LEAD via Meta's WhatsApp Cloud API.
// This is the only no-cost way to message a lead who hasn't messaged you first.
// Needs a Meta WhatsApp app + an APPROVED template. Env:
//   WHATSAPP_CLOUD_TOKEN, WHATSAPP_CLOUD_PHONE_ID, WHATSAPP_CLOUD_LEAD_TEMPLATE
async function sendLeadWhatsAppCloud(lead: Lead) {
  const token = process.env.WHATSAPP_CLOUD_TOKEN;
  const phoneId = process.env.WHATSAPP_CLOUD_PHONE_ID;
  const template = process.env.WHATSAPP_CLOUD_LEAD_TEMPLATE;
  if (!token || !phoneId || !template || !lead.phone) return;

  const digits = lead.phone.replace(/\D/g, "");
  // Default bare 10-digit Indian numbers to +91.
  const to = digits.length === 10 ? `91${digits}` : digits;

  await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: template,
        language: { code: process.env.WHATSAPP_CLOUD_LANG || "en" },
        // Template body should use one {{1}} variable for the lead's name.
        components: [{ type: "body", parameters: [{ type: "text", text: lead.name }] }]
      }
    })
  });
}

export async function notifyNewLead(lead: Lead) {
  const tasks: Promise<unknown>[] = [];

  // 1) Notify the owner by email
  tasks.push(sendOwnerEmail(lead));

  // 2) Notify the owner on WhatsApp — free (CallMeBot) and/or Interakt
  tasks.push(sendOwnerWhatsAppFree(lead));

  const ownerPhone = process.env.OWNER_WHATSAPP;
  const ownerTemplate = process.env.INTERAKT_OWNER_TEMPLATE;
  if (ownerPhone && ownerTemplate) {
    tasks.push(sendInteraktWhatsApp(ownerPhone, ownerTemplate, [lead.name, lead.phone, lead.source]));
  }

  // 3) Confirm to the lead — email (if they gave one) AND WhatsApp (if phone)
  if (lead.email) {
    tasks.push(sendLeadEmail(lead));
  }
  if (lead.phone) {
    // free official path (Meta Cloud API) and/or paid (Interakt) — both env-gated
    tasks.push(sendLeadWhatsAppCloud(lead));
    const leadTemplate = process.env.INTERAKT_LEAD_TEMPLATE;
    if (leadTemplate) {
      tasks.push(sendInteraktWhatsApp(lead.phone, leadTemplate, [lead.name]));
    }
  }

  const results = await Promise.allSettled(tasks);
  for (const r of results) {
    if (r.status === "rejected") console.error("Lead notification failed:", r.reason);
  }
}
