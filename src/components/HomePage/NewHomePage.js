import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography, Button } from "@mui/material";
import FeaturedProductHome from "./FeaturedProduct";

export default function NewHomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <FeaturedProductHome />
      {/* <Container className="featured-products" fixed>
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
      </Container> */}
    </Box>
  );
}
