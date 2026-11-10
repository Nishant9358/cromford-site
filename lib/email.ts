import "server-only";
import type { ContactInput } from "@/lib/validation";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Sends the contact submission through Resend's HTTP API.
 * If RESEND_API_KEY or CONTACT_TO_EMAIL is missing, the submission is logged
 * on the server instead (useful in development). See README.
 */
export async function sendContactEmail(input: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Cromford website <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.info(
      "[contact] RESEND_API_KEY or CONTACT_TO_EMAIL not set. Logging submission instead of sending:\n" +
        JSON.stringify(input, null, 2),
    );
    return { ok: true as const, delivered: false };
  }

  const lines: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Company", input.company || "—"],
    ["Needs help with", input.topic],
  ];

  const text =
    lines.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${input.message}\n`;

  const html =
    `<table cellpadding="4">` +
    lines
      .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`)
      .join("") +
    `</table><p><strong>Message</strong></p><p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>`;

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      reply_to: input.email,
      subject: `New enquiry: ${input.topic} — ${input.name}`,
      text,
      html,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error(`[contact] Resend responded ${response.status}: ${detail}`);
    return { ok: false as const, delivered: false };
  }

  return { ok: true as const, delivered: true };
}
