import { z } from "zod";
import { topicOptions } from "@/content/site";

/** Shared by the client form and the server action. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(120, "Please keep your name under 120 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your business email.")
    .max(200, "Please keep your email under 200 characters.")
    .pipe(z.email("Please enter a valid email address, like name@company.com.")),
  company: z.string().trim().max(160, "Please keep the company name under 160 characters."),
  topic: z.enum(topicOptions, "Please choose what you need help with."),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters so we understand the problem.")
    .max(5000, "Please keep your message under 5,000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type FieldErrors = Partial<Record<ContactField, string>>;

/** Name of the hidden honeypot input. Real visitors never fill it. */
export const HONEYPOT_FIELD = "website";

export function readContactForm(formData: FormData) {
  const get = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };
  return {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    topic: get("topic"),
    message: get("message"),
  };
}

/** Returns the first error message per field. */
export function validateContact(raw: Record<string, string>) {
  const result = contactSchema.safeParse(raw);
  if (result.success) return { data: result.data, errors: null };

  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ContactField | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return { data: null, errors };
}
