import React from "react";
import { ThemeProvider } from "styled-components";

const deviceSizes = {
  desktop: "1024px",
  largeDesktop: "1200px",
  hdDesktop: "2560px",
};
const theme = {
  colors: {
    primary: "#04abff",
    secondary: "#FFAE03",
    // secondary: "#57D9a3",
    dark0: "#111418",
    dark1: "#222831",
    dark2: "#3b4454",
    dark3: "#353945",
    lightest: "#fff",
    light: "#f1f1f1",
    lightGrey: "#EBEBEB",
    lightGrey2: "#c6c6c6",
  },
  fonts: {
    body: '"Commissioner", sans-serif',
  },
  device: {
    desktop: `(min-width: ${deviceSizes.desktop})`,
    largeDesktop: `(min-width: ${deviceSizes.largeDesktop})`,
    hdDesktop: `(min-width: ${deviceSizes.hdDesktop})`,
  },
};
const Theme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default Theme;
export { theme };
