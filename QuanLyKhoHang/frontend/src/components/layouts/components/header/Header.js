import React from "react";
import { Box, Container, Grid, Stack } from "@mui/material";
import Logo from "../../../svgs/Logo";
import {
  AiFillHome,
  AiFillCompass,
  AiFillHeart,
  AiFillWechat,
} from "react-icons/ai";
import { MdGroups } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import SearchBar from "./SearchBar";
import ButtonIcon from "../../../button/ButtonIcon";
import User from "./User";

function Header() {
  return (
    <Box sx={{ width: "100%", height: "65px" }}>
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Grid container height="100%">
          <Grid item xs={2}>
            <Stack sx={{ height: "100%" }} direction="row" alignItems="center">
              <Logo />
            </Stack>
          </Grid>
          <Grid item xs={7}>
            <Stack direction="row" alignItems="center" sx={{ height: "100%" }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ height: "100%", width: "50%", paddingRight: "50px" }}
              >
                <ButtonIcon path="/" Icon={AiFillHome} title="Home" />
                <ButtonIcon
                  path="/location"
                  Icon={AiFillCompass}
                  title="Location"
                />
                <ButtonIcon
                  path="/group"
                  Icon={MdGroups}
                  title="Group"
                  notice
                />
                <ButtonIcon path="/chat" Icon={AiFillWechat} title="Chat" />
                <ButtonIcon path="/date" Icon={AiFillHeart} title="Date" />
              </Stack>
              <Stack
                sx={{ width: "50%", height: "100%" }}
                direction="row"
                alignItems="center"
              >
                <SearchBar />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={'20px'}
              sx={{ height: "100%" }}
            >
              <ButtonIcon notice Icon={IoMdNotifications} />
              <User />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Header;
