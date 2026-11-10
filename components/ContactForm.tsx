"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { submitContact, type ContactState } from "@/app/actions";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { site } from "@/content/site";
import {
  HONEYPOT_FIELD,
  readContactForm,
  validateContact,
  type ContactField,
  type FieldErrors,
} from "@/lib/validation";

const FIELD_ORDER: ContactField[] = ["name", "email", "company", "topic", "message"];
const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const copy = site.contact.form;
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  // Client-side errors. null = defer to whatever the server returned.
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const [attempted, setAttempted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const errors: FieldErrors = clientErrors ?? (state.status === "invalid" ? state.errors : {});

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status === "invalid") focusFirstError(formRef.current, state.errors);
  }, [state]);

  // With JS, submit manually so React does not reset the fields if the server rejects them.
  // Without JS, the form still posts to the server action through `action`.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    const formData = new FormData(event.currentTarget);
    const { errors: found } = validateContact(readContactForm(formData));
    if (found) {
      setClientErrors(found);
      focusFirstError(event.currentTarget, found);
      return;
    }
    setClientErrors(null);
    startTransition(() => formAction(formData));
  }

  function handleChange() {
    if (!attempted || !formRef.current) return;
    const { errors: found } = validateContact(readContactForm(new FormData(formRef.current)));
    setClientErrors(found ?? {});
  }

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-card border border-line bg-surface-raised p-8 md:p-10">
        <p className="type-mono text-derwent">Received</p>
        <h3 ref={successRef} tabIndex={-1} className="type-heading-1 mt-3">
          {copy.successTitle}
        </h3>
        <p className="mt-3 text-ink-muted">{copy.successText}</p>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;
  const formError =
    state.status === "error"
      ? state.reason === "rate-limited"
        ? copy.rateLimited
        : copy.genericError
      : null;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      onChange={handleChange}
      noValidate
      aria-describedby={hasErrors || formError ? "form-status" : undefined}
      className="relative space-y-6"
    >
      <div id="form-status" aria-live="polite">
        {formError ? (
          <p className="rounded-control border border-copper px-4 py-3 text-[14px] leading-5 text-copper">
            {formError}
          </p>
        ) : hasErrors && attempted ? (
          <p className="text-[14px] leading-5 text-copper">{copy.fixErrors}</p>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field name="name" label={copy.name.label} required autoComplete="name" error={errors.name} />
        <Field
          name="email"
          type="email"
          label={copy.email.label}
          required
          autoComplete="email"
          helper={copy.email.helper}
          error={errors.email}
        />
      </div>
      <Field name="company" label={copy.company.label} optional autoComplete="organization" error={errors.company} />
      <Field
        as="select"
        name="topic"
        label={copy.topic.label}
        required
        placeholder={copy.topic.placeholder}
        options={copy.topic.options}
        error={errors.topic}
      />
      <Field as="textarea" name="message" label={copy.message.label} required helper={copy.message.helper} error={errors.message} />

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="flex flex-col items-start gap-4 pt-2">
        <Button type="submit" disabled={pending} aria-busy={pending}>
          {pending ? copy.submitting : copy.submit}
        </Button>
        <p className="type-small">
          {site.contact.privacyNote}{" "}
          <Link href={site.contact.privacyLink.href} className="text-link">
            {site.contact.privacyLink.label}
          </Link>
        </p>
      </div>
    </form>
  );
}

function focusFirstError(form: HTMLFormElement | null, errors: FieldErrors) {
  const first = FIELD_ORDER.find((field) => errors[field]);
  if (!form || !first) return;
  form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
}
