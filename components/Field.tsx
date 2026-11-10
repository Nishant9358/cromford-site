import type { ChangeEventHandler } from "react";

type BaseProps = {
  name: string;
  label: string;
  error?: string;
  helper?: string;
  required?: boolean;
  optional?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
};

type InputProps = BaseProps & {
  as?: "input";
  type?: "text" | "email";
  autoComplete?: string;
};
type TextareaProps = BaseProps & { as: "textarea"; rows?: number };
type SelectProps = BaseProps & {
  as: "select";
  options: readonly string[];
  placeholder: string;
};

type FieldProps = InputProps | TextareaProps | SelectProps;

const control =
  "block w-full rounded-control border bg-surface-raised px-4 text-[16px] leading-6 text-ink transition-colors duration-150 placeholder:text-ink-muted hover:border-ink-muted";

/** Labelled form control with helper text and an inline, linked error message. */
export function Field(props: FieldProps) {
  const { name, label, error, helper, required, optional, onChange } = props;
  const id = `field-${name}`;
  const helperId = helper ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;
  const border = error ? "border-copper" : "border-line";

  const shared = {
    id,
    name,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    onChange,
  };

  let input;
  if (props.as === "textarea") {
    input = (
      <textarea {...shared} rows={props.rows ?? 5} className={`${control} ${border} min-h-32 resize-y py-3`} />
    );
  } else if (props.as === "select") {
    input = (
      <div className="relative">
        <select {...shared} defaultValue="" className={`${control} ${border} h-12 appearance-none pr-12`}>
          <option value="" disabled>
            {props.placeholder}
          </option>
          {props.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3.5 6 8 10.5 12.5 6" />
        </svg>
      </div>
    );
  } else {
    input = (
      <input
        {...shared}
        type={props.type ?? "text"}
        autoComplete={props.autoComplete}
        className={`${control} ${border} h-12`}
      />
    );
  }

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[15px] leading-5 font-medium text-ink">
        {label}
        {optional ? <span className="font-normal text-ink-muted"> (optional)</span> : null}
      </label>
      {input}
      {error ? (
        <p id={errorId} className="mt-2 text-[14px] leading-5 text-copper">
          {error}
        </p>
      ) : null}
      {helper ? (
        <p id={helperId} className="type-mono mt-2 text-ink-muted">
          {helper}
        </p>
      ) : null}
    </div>
  );
}
