import { Container, Grid } from "@mui/material";
import React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import privateRoute from "../../routes/PrivateRoute";

function HomePage() {
  return (
    <MainLayout>
      <Container maxWidth="xl" sx={{ width: "100%", height: "100%" }}>
        <Grid sx={{ height: "100%" }} container>
          <Grid item xs={2}></Grid>
          <Grid item xs={7}></Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
}

export default privateRoute(HomePage);
