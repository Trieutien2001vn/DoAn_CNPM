import React, { useRef, useState } from "react";
import { Avatar, Box, MenuItem, Paper, Stack, Typography } from "@mui/material";
import MenuBase from "../../../menu/MenuBase";
import { AiFillSetting, AiOutlineCaretDown } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { MdSecurity } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import SwitchDarkmode from "../../../switch/SwitchDarkmode";
import { useGlobalTheme } from "../../../../context/themeContext";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../redux/actions/auth.action";

function User() {
  const [darkMode] = useGlobalTheme();
  const [open, setOpen] = useState(false);
  const anchorEl = useRef();
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  // handle logout
  const handleLogout = () => {
    logoutUser(dispatch);
  };

  return (
    <>
      <MenuItem sx={{ height: "52px", borderRadius: "6px", padding: 0 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing="10px"
          sx={{ height: "52px", borderRadius: "6px", padding: 0 }}
          onClick={() => setOpen(true)}
          ref={anchorEl}
        >
          <Avatar
            src="https://plus.unsplash.com/premium_photo-1661634287533-dcfaea921c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
            sx={{
              width: 32,
              height: 32,
              borderRadius: "6px",
              boxShadow: "0 0 0 2px #4ACD8D",
            }}
          />
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 550,
              color: darkMode ? "whitish.pureWhite" : "neutral.text1",
            }}
          >
            Võ Minh Thắng
          </Typography>
          <Box
            sx={{
              color: "neutral.iconColor",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AiOutlineCaretDown fontSize="14px" />
          </Box>
        </Stack>
      </MenuItem>

      <MenuBase
        anchorEl={anchorEl.current}
        open={open}
        handleClose={handleClose}
      >
        <Paper
          sx={{
            width: "280px",
            backgroundColor: darkMode
              ? "darkmode.darkSecondary"
              : "whitish.pureWhite",
          }}
        >
          <Stack sx={{ padding: 2 }} spacing={2}>
            <Paper
              sx={{
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: darkMode
                  ? "darkmode.darkSoft"
                  : "whitish.pureWhite",
              }}
            >
              <MenuItem sx={{ p: 2, display: "flex", gap: 2 }}>
                <Avatar
                  src="https://plus.unsplash.com/premium_photo-1661634287533-dcfaea921c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
                  sx={{ width: 40, height: 40 }}
                />
                <Typography
                  component="p"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: darkMode ? "whitish.pureWhite" : "neutral.text1",
                  }}
                >
                  Vo Minh Thang
                </Typography>
              </MenuItem>
            </Paper>
            <Stack spacing={1}>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: darkMode
                    ? "darkmode.darkSoft"
                    : "whitish.pureWhite",
                }}
              >
                <MenuItem sx={{ padding: 2, width: "100%" }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <SwitchDarkmode />
                    <Typography
                      sx={{
                        color: darkMode ? "whitish.pureWhite" : "neutral.text1",
                      }}
                    >
                      {darkMode ? "Dark mode" : "Light mode"}
                    </Typography>
                  </Stack>
                </MenuItem>
              </Paper>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: darkMode
                    ? "darkmode.darkSoft"
                    : "whitish.pureWhite",
                }}
              >
                <MenuItem sx={{ padding: 2, width: "100%" }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        color: "neutral.iconColor",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AiFillSetting size={20} color="inherit" />
                    </Box>
                    <Typography
                      sx={{
                        color: darkMode ? "whitish.pureWhite" : "neutral.text1",
                      }}
                    >
                      Settings
                    </Typography>
                  </Stack>
                </MenuItem>
              </Paper>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: darkMode
                    ? "darkmode.darkSoft"
                    : "whitish.pureWhite",
                }}
              >
                <MenuItem sx={{ padding: 2, width: "100%" }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        color: "neutral.iconColor",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <BsFillBookmarkFill size={20} color="inherit" />
                    </Box>
                    <Typography
                      sx={{
                        color: darkMode ? "whitish.pureWhite" : "neutral.text1",
                      }}
                    >
                      Privacy
                    </Typography>
                  </Stack>
                </MenuItem>
              </Paper>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: darkMode
                    ? "darkmode.darkSoft"
                    : "whitish.pureWhite",
                }}
              >
                <MenuItem sx={{ padding: 2, width: "100%" }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        color: "neutral.iconColor",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MdSecurity size={20} color="inherit" />
                    </Box>
                    <Typography
                      sx={{
                        color: darkMode ? "whitish.pureWhite" : "neutral.text1",
                      }}
                    >
                      Security
                    </Typography>
                  </Stack>
                </MenuItem>
              </Paper>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: darkMode
                    ? "darkmode.darkSoft"
                    : "whitish.pureWhite",
                }}
              >
                <MenuItem
                  onClick={handleLogout}
                  sx={{ padding: 2, width: "100%" }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        color: "neutral.iconColor",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TbLogout size={20} color="inherit" />
                    </Box>
                    <Typography
                      sx={{
                        color: darkMode ? "whitish.pureWhite" : "neutral.text1",
                      }}
                    >
                      Logout
                    </Typography>
                  </Stack>
                </MenuItem>
              </Paper>
            </Stack>
          </Stack>
        </Paper>
      </MenuBase>
    </>
  );
}

export default User;
