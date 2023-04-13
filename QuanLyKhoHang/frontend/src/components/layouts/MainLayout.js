import { Box } from "@mui/system";
import React from "react";
import { useGlobalTheme } from "../../context/themeContext";
import Header from "./components/header/Header";

function MainLayout({ children }) {
  const [darkMode] = useGlobalTheme();
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: darkMode
          ? "darkmode.darkBG"
          : "whitish.liteBackground",
      }}
    >
      <Header />
      <Box
        id="layout"
        sx={{
          height: "calc(100vh - 65px)",
          overflow: "auto",
          backgroundColor: "whitish.gray",
          padding: "24px 0",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default MainLayout;
