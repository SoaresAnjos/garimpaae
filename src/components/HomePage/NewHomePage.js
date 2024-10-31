import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        className="navbar"
        container
        spacing={2}
        sx={{ height: "10vh", backgroundColor: "yellow" }}
      >
        <Grid item xs={12}>
          <Container fixed>Menu</Container>
        </Grid>
      </Grid>

      <Grid
        className="hero"
        container
        spacing={2}
        sx={{ marginBottom: "2rem", height: "60vh", backgroundColor: "grey" }}
      >
        <Grid item xs={12}>
          <Container fixed>Hello</Container>
        </Grid>
      </Grid>

      <Container className="featured-products" fixed>
        <Grid
          container
          spacing={2}
          sx={{ marginBottom: "2rem", height: "60vh", backgroundColor: "grey" }}
        >
          <Grid item xs={4}>
            Product
          </Grid>
          <Grid item xs={4}>
            Product
          </Grid>
          <Grid item xs={4}>
            Product
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
