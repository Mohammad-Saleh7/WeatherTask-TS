import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    navbar?: {
      default?: string;
      dNav?: string;
    };
    background: Palette["background"] & {
      lightPaper?: string;
      darkPaper?: string;
    };
  }

  interface PaletteOptions {
    navbar?: {
      default?: string;
      dNav?: string;
    };
    background?: PaletteOptions["background"] & {
      lightPaper?: string;
      darkPaper?: string;
    };
  }
}
