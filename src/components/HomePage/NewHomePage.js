import * as React from "react";
import Box from "@mui/material/Box";
import FeaturedProductHome from "./FeaturedProduct";
import Advantages from "./Advantages";

export default function NewHomePage() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "white" }}>
      <FeaturedProductHome />
      <Advantages />

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
