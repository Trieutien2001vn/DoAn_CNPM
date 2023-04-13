import React from "react";
import { SnackbarProvider } from "./snackbarContext.js/index.js";
import { SocketProvider } from "./socketContext/index.js";
import GlobalThemProvider from "./themeContext/index.js";

function ContextProvider({ children }) {
  return (
    <>
      <SnackbarProvider>
        <SocketProvider>
          <GlobalThemProvider>{children}</GlobalThemProvider>
        </SocketProvider>
      </SnackbarProvider>
    </>
  );
}

export default ContextProvider;
