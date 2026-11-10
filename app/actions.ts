"use server";

import { headers } from "next/headers";
import { sendContactEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import {
  HONEYPOT_FIELD,
  readContactForm,
  validateContact,
  type FieldErrors,
} from "@/lib/validation";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; errors: FieldErrors }
  | { status: "error"; reason: "server" | "rate-limited" };

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: bots fill every field. Pretend it worked and drop it.
  const trap = formData.get(HONEYPOT_FIELD);
  if (typeof trap === "string" && trap.trim() !== "") {
    console.info("[contact] Honeypot field filled. Submission discarded.");
    return { status: "success" };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(`contact:${ip}`).ok) {
    return { status: "error", reason: "rate-limited" };
  }

  const { data, errors } = validateContact(readContactForm(formData));
  if (!data) return { status: "invalid", errors };

  try {
    const result = await sendContactEmail(data);
    return result.ok ? { status: "success" } : { status: "error", reason: "server" };
  } catch (error) {
    console.error("[contact] Failed to send:", error);
    return { status: "error", reason: "server" };
  }
}
