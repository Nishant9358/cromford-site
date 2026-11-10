type SocialIconProps = { name: "LinkedIn" | "Instagram" | "X"; className?: string };

/** Simple 1.5px-stroke outline icons. */
export function SocialIcon({ name, className = "size-5" }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={className}
    >
      {name === "LinkedIn" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <path d="M8 10.5V17M8 7.25v.5M12 17v-6.5M12 13.5c0-1.8 1-3 2.5-3S17 11.5 17 13v4" />
        </>
      ) : null}
      {name === "Instagram" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.25 6.75v.01" />
        </>
      ) : null}
      {name === "X" ? <path d="M4.5 4h4.25L19.5 20h-4.25zM19 4l-5.9 6.7M10.9 13.3 5 20" /> : null}
    </svg>
  );
}
