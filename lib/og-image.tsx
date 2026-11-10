import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { palette } from "@/lib/tokens";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Cromford — Where work first ran itself.";

/** Shared renderer for the Open Graph and Twitter images. */
export async function renderOgImage() {
  const root = process.cwd();
  const [pagella, inter, interMedium, mark] = await Promise.all([
    readFile(join(root, "app/fonts/TeXGyrePagella-Regular.otf")),
    readFile(join(root, "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff")),
    readFile(join(root, "node_modules/@fontsource/inter/files/inter-latin-600-normal.woff")),
    readFile(join(root, "public/brand/logo/cromford-mark-mill.svg")),
  ]);
  const markSrc = `data:image/svg+xml;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: palette.night.surface }}>
        {/* The mark on derwent */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 420,
            height: "100%",
            background: palette.mill.derwent,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={200} height={200} alt="" />
        </div>

        {/* Headline in Pagella and Inter on Night */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "72px 72px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: "0.14em",
              color: palette.night.inkMuted,
            }}
          >
            {site.hero.eyebrow.toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Pagella",
                fontSize: 84,
                lineHeight: 1.06,
                letterSpacing: "-0.01em",
                color: palette.night.ink,
              }}
            >
              {site.hero.headline}
            </div>
            <div style={{ display: "flex", width: 24, height: 24, marginTop: 40, background: palette.night.copper }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: `1px solid ${palette.night.line}`,
              paddingTop: 24,
              fontFamily: "Inter",
              fontSize: 22,
              color: palette.night.inkMuted,
            }}
          >
            <span>{site.disciplines}</span>
            <span>{site.domain}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Pagella", data: pagella, weight: 400, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
        { name: "Inter", data: interMedium, weight: 600, style: "normal" },
      ],
    },
  );
}
