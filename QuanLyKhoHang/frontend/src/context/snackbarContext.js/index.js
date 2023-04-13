import { createContext, useState } from "react";
import SnackBarBase from "../../components/snackbar/SnackBarBase";

const SnackbarContext = createContext();

function SnackbarProvider({ children }) {
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [typeSnackbar, setTypeSnackbar] = useState("error"); // success, warning, info, error
  return (
    <SnackbarContext.Provider
      value={{
        message: [messageSnackbar, setMessageSnackbar],
        type: [typeSnackbar, setTypeSnackbar],
      }}
    >
      <SnackBarBase
        open={!!messageSnackbar}
        handleClose={() => setMessageSnackbar("")}
        type={typeSnackbar}
        message={messageSnackbar}
      />
      {children}
    </SnackbarContext.Provider>
  );
}

export { SnackbarProvider, SnackbarContext };
