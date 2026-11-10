/**
 * Palette values for places that cannot read CSS variables
 * (the generated Open Graph image and the browser theme colour).
 * Keep in sync with the raw palette at the top of app/globals.css.
 */
export const palette = {
  mill: {
    surface: "#F4F1EA",
    ink: "#16181A",
    derwent: "#1D4B43",
    onDerwent: "#F4F1EA",
  },
  night: {
    surface: "#0F1112",
    ink: "#EEEAE2",
    inkMuted: "#A39E94",
    line: "#2E3231",
    copper: "#E09264",
  },
} as const;
