import { Autocomplete, Stack, TextField } from "@mui/material";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { useGlobalTheme } from "../../../../context/themeContext";

function SearchBar() {
  const [darkMode] = useGlobalTheme();
  return (
    <Autocomplete
      sx={{ width: "100%", height: "42px" }}
      freeSolo
      open={true}
      clearIcon={false}
      options={["Option 1", "Option 2", "Option 3"]}
      ListboxProps={{
        sx: {
          backgroundColor: darkMode ? "darkmode.darkSoft" : "whitish.pureWhite",
          color: darkMode ? "whitish.pureWhite" : "neutral.text1",
          overFlow: "hidden",
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          sx={{
            width: "100%",
            borderRadius: "6px",
            backgroundColor: darkMode ? "darkmode.darkSoft" : "whitish.gray",
            ".MuiInputBase-root": {
              height: "42px",
            },
            input: {
              py: 0,
              color: darkMode ? "whitish.pureWhite" : "neutral.text1",
              fontSize: "14px",
            },
            fieldset: {
              outline: "none",
              border: "none",
            },
          }}
          InputProps={{
            endAdornment: (
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{ color: "neutral.iconColor" }}
              >
                <CiSearch fontSize="24px" />
              </Stack>
            ),
          }}
          placeholder="Search..."
        />
      )}
    />
  );
}

export default SearchBar;
