import React, { createContext, useContext } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import useLocalStorage from "../../hooks/useLocalStorage";
const theme = createTheme({
  palette: {
    primary: {
      main: "#1DC071",
      second: "#4ACD8D",
      third: "#77D9AA",
      four: "#A5E6C6",
      fif: "#D2F2E3",
    },
    secondary: {
      main: "#6F49FD",
      second: "#8C6DFD",
      third: "#A992FE",
      four: "#C5B6FE",
      fif: "#E2DBFF",
    },
    error: {
      main: "#EB5757",
    },
    darkmode: {
      darkBG: "#13131A",
      darkSecondary: "#1C1C24",
      softDark: "#22222C",
      darkSoft: "#24242C",
      darkStrokeColor: "#3A3A43",
      red: "#422C32",
    },
    neutral: {
      text1: "#171725",
      text2: "#4B5264",
      text3: "#808191",
      iconColor: "#A2A2A8",
      text4: "#B2B3BD",
    },
    whitish: {
      pureWhite: "#FFFFFF",
      whiteSoft: "#FCFBFF",
      graySoft: "#FCFCFC",
      gray: "#F0EEED",
      strockColor: "#F1F1F3",
      liteBackground: "#FCFCFD",
    },
  },
  typography: {
    h1: {
      color: "#171725",
    },
    h2: {
      color: "#171725",
    },
    h3: {
      color: "#171725",
    },
    h4: {
      color: "#171725",
    },
    h5: {
      color: "#171725",
    },
    h6: {
      color: "#171725",
    },
    subtitle1: {
      color: "#171725",
    },
    subtitle2: {
      color: "#171725",
    },
    body1: {
      color: "#171725",
    },
    body2: {
      color: "#171725",
    },
    fontFamily: ["Poppins", "sans-serif"].join(", "),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
});

const ThemeContext = createContext();

function GlobalThemProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorage("darkmode", false);

  return (
    <ThemeContext.Provider value={[darkMode, setDarkMode]}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useGlobalTheme = () => {
  const value = useContext(ThemeContext);
  if (!value)
    throw new Error("ThemeContext must be use inside ThemeContextProvider");
  return value;
};

export default GlobalThemProvider;
