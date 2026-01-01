/// <reference types="vite/client" />

import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    lightPaper: string;
    darkPaper: string;
  }

  interface Palette {
    navbar: {
      default: string;
      dNav: string;
    };
  }

  interface PaletteOptions {
    navbar: {
      default: string;
      dNav: string;
    };
  }
}

export {};
