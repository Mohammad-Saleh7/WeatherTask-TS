import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: { main: "#007FFF" },
        background: {
          default: "#f4f6f8",
          lightPaper: "#e1e9ee",
        },
        navbar: {
          default: "#f3fafe",
        },
        text: {
          primary: "#003464",
        },
      },
    },

    dark: {
      palette: {
        mode: "dark",
        background: {
          default: "#151d32",
          darkPaper: "#292f45",
        },
        navbar: {
          dNav: "#151d32",
        },
      },
    },
  },
});

export default theme;
