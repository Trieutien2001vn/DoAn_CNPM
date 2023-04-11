import {
  Avatar,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export default function Login() {
  return (
    <Paper
      elevation={10}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        height: "70vh",
        width: "80vw",
        backgroundColor: "white",
      }}
    >
      <Grid>{"Hello"}</Grid>
      <Grid>{"Hi"}</Grid>
    </Paper>
  );
}
