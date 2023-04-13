import * as React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import MenuBase from "../../../menu/MenuBase";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import NightlightIcon from "@mui/icons-material/Nightlight";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../redux/reducrers/auth.reducer";
import { useNavigate } from "react-router-dom";
import { clearRoom } from "../../../../redux/reducrers/room.reducer";
import { clearMessage } from "../../../../redux/reducrers/message.reducer";

export default function MenuUser() {
  const userInfo = useSelector((state) => state.auth.login);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearRoom());
    dispatch(clearMessage());
    navigate("/");
  };

  return (
    <div>
      <Avatar
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          width: 40,
          height: 40,
          marginLeft: "10px",
          cursor: "pointer",
        }}
        src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
      />
      <MenuBase open={open} anchorEl={anchorEl} handleClose={handleClose}>
        <Box sx={{ p: 2, width: "343px", height: "auto" }}>
          <Paper
            className="user-board-top"
            sx={{
              width: "100%",
              p: 1,
              boxShadow: 10,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack spacing={"4px"}>
              <Stack
                sx={{
                  padding: "8px",
                  cursor: "pointer",
                  borderRadius: "6px",
                  "&:hover": { backgroundColor: "#f3f3f3" },
                }}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                  }}
                  src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
                />
                <Typography
                  sx={{ fontWeight: 550, fontSize: "16px" }}
                  variant="body1"
                >
                  {userInfo?.user?.user?.username}
                </Typography>
              </Stack>
              <Box
                sx={{ width: "100%", height: "1px", backgroundColor: "#ccc" }}
              ></Box>
              <Stack
                sx={{
                  padding: "8px",
                  cursor: "pointer",
                  borderRadius: "6px",

                  "&:hover": { backgroundColor: "#f3f3f3" },
                }}
                direction="row"
                justifyContent="space-between"
              >
                <Typography
                  sx={{ color: "#1876f2", fontSize: "15px", fontWeight: 550 }}
                >
                  Xem tất cả trang cá nhân
                </Typography>
                <Box
                  sx={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#FA383E",
                    color: "#fff",
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  2
                </Box>
              </Stack>
            </Stack>
          </Paper>
          <Stack
            spacing={1}
            sx={{ marginTop: "20px" }}
            className="user-board-bottom"
          >
            <Stack
              sx={{
                cursor: "pointer",
                borderRadius: "6px",
                padding: "5px",
                "&:hover": { backgroundColor: "#f3f3f3" },
              }}
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <IconButton
                sx={{
                  backgroundColor: "#e4e6eb",
                  "&:hover": { backgroundColor: "#e4e6eb" },
                }}
              >
                <SettingsIcon />
              </IconButton>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 550 }}
                variant="body1"
              >
                Cài đặt & quyền riêng tư
              </Typography>
            </Stack>
            <Stack
              sx={{
                cursor: "pointer",
                borderRadius: "6px",
                padding: "5px",
                "&:hover": { backgroundColor: "#f3f3f3" },
              }}
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <IconButton
                sx={{
                  backgroundColor: "#e4e6eb",
                  "&:hover": { backgroundColor: "#e4e6eb" },
                }}
              >
                <HelpIcon />
              </IconButton>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 550 }}
                variant="body1"
              >
                Trợ giúp và hỗ trợ
              </Typography>
            </Stack>
            <Stack
              sx={{
                cursor: "pointer",
                borderRadius: "6px",
                padding: "5px",
                "&:hover": { backgroundColor: "#f3f3f3" },
              }}
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <IconButton
                sx={{
                  backgroundColor: "#e4e6eb",
                  "&:hover": { backgroundColor: "#e4e6eb" },
                }}
              >
                <NightlightIcon />
              </IconButton>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 550 }}
                variant="body1"
              >
                Màn hình và trợ năng
              </Typography>
            </Stack>
            <Stack
              sx={{
                cursor: "pointer",
                borderRadius: "6px",
                padding: "5px",
                "&:hover": { backgroundColor: "#f3f3f3" },
              }}
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <IconButton
                sx={{
                  backgroundColor: "#e4e6eb",
                  "&:hover": { backgroundColor: "#e4e6eb" },
                }}
              >
                <AnnouncementIcon />
              </IconButton>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 550 }}
                variant="body1"
              >
                Đóng góp ý kiến
              </Typography>
            </Stack>
            <Stack
              sx={{
                cursor: "pointer",
                borderRadius: "6px",
                padding: "5px",
                "&:hover": { backgroundColor: "#f3f3f3" },
              }}
              direction="row"
              spacing={1}
              alignItems="center"
              onClick={handleLogout}
            >
              <IconButton
                sx={{
                  backgroundColor: "#e4e6eb",
                  "&:hover": { backgroundColor: "#e4e6eb" },
                }}
              >
                <LogoutIcon />
              </IconButton>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 550 }}
                variant="body1"
              >
                Đăng xuất
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </MenuBase>
    </div>
  );
}
