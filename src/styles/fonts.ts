import { css } from "styled-components";

type FontFormat = string;
type WeightMap = Record<number, [FontFormat, FontFormat]>;

interface FontFamily {
  name: string;
  normal: WeightMap;
  italic: WeightMap;
}

const calibreNormalWeights: WeightMap = {
  400: ["/fonts/Calibre/Calibre-Regular.woff", "/fonts/Calibre/Calibre-Regular.woff2"],
  500: ["/fonts/Calibre/Calibre-Medium.woff", "/fonts/Calibre/Calibre-Medium.woff2"],
  600: ["/fonts/Calibre/Calibre-Semibold.woff", "/fonts/Calibre/Calibre-Semibold.woff2"],
};

const calibreItalicWeights: WeightMap = {
  400: ["/fonts/Calibre/Calibre-RegularItalic.woff", "/fonts/Calibre/Calibre-RegularItalic.woff2"],
  500: ["/fonts/Calibre/Calibre-MediumItalic.woff", "/fonts/Calibre/Calibre-MediumItalic.woff2"],
  600: ["/fonts/Calibre/Calibre-SemiboldItalic.woff", "/fonts/Calibre/Calibre-SemiboldItalic.woff2"],
};

const sfMonoNormalWeights: WeightMap = {
  400: ["/fonts/SFMono/SFMono-Regular.woff", "/fonts/SFMono/SFMono-Regular.woff2"],
  600: ["/fonts/SFMono/SFMono-Semibold.woff", "/fonts/SFMono/SFMono-Semibold.woff2"],
};

const sfMonoItalicWeights: WeightMap = {
  400: ["/fonts/SFMono/SFMono-RegularItalic.woff", "/fonts/SFMono/SFMono-RegularItalic.woff2"],
  600: ["/fonts/SFMono/SFMono-SemiboldItalic.woff", "/fonts/SFMono/SFMono-SemiboldItalic.woff2"],
};

const calibre: FontFamily = {
  name: "Calibre",
  normal: calibreNormalWeights,
  italic: calibreItalicWeights,
};

const sfMono: FontFamily = {
  name: "SF Mono",
  normal: sfMonoNormalWeights,
  italic: sfMonoItalicWeights,
};

function createFontFaces(family: FontFamily, style: "normal" | "italic" = "normal") {
  let styles = "";

  for (const [weight, formats] of Object.entries(family[style])) {
    const [woff, woff2] = formats;

    styles += `
      @font-face {
        font-family: '${family.name}';
        src: url(${woff2}) format('woff2'),
             url(${woff}) format('woff');
        font-weight: ${weight};
        font-style: ${style};
        font-display: auto;
      }
    `;
  }

  return styles;
}

const Fonts = css`
  ${createFontFaces(calibre)}
  ${createFontFaces(calibre, "italic")}
  ${createFontFaces(sfMono)}
  ${createFontFaces(sfMono, "italic")}
`;

export default Fonts;
