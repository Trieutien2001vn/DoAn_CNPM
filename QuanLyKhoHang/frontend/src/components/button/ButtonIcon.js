import { Box, Tooltip } from "@mui/material";
import React from "react";
import { NavLink, useMatch } from "react-router-dom";

function ButtonIcon({ path, notice, Icon, title }) {
  const match = useMatch(path || "/");

  if (path) {
    return (
      <Tooltip arrow placement="bottom" title={title}>
        <Box
          component={NavLink}
          to={path}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "6px",
            backgroundColor: !!match ? "primary.main" : "",
            color: !!match ? "whitish.pureWhite" : "neutral.iconColor",
            position: "relative",
            "&:hover": {
              backgroundColor: !!match ? "primary.main" : "",
            },
          }}
        >
          <Icon style={{ fontSize: "20px" }} />
          {notice && (
            <Box
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "error.main",
              }}
            ></Box>
          )}
        </Box>
      </Tooltip>
    );
  }
  return (
    <Box
      sx={{
        width: 32,
        height: 32,
        color: "neutral.iconColor",
        backgroundColor: "whitish.gray",
        borderRadius: "6px",
        fontSize: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <Icon fontSize="20px" />
      {notice && (
        <Box
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "error.main",
          }}
        ></Box>
      )}
    </Box>
  );
}

export default ButtonIcon;
