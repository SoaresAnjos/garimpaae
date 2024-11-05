import React from "react";
import Card from "../../Card/Card";
import { Grid } from "@mui/material";

const Products = ({ products }) => {
  return (
    <>
      <Grid
        spacing={1}
        direction="row"
        container
        item
        xs={12}
        lg={12}
        sx={{ alignItems: "flex-start" }}
      >
        {products?.map((product) => (
          <>
            <Card
              key={product.id}
              name={product?.name}
              image={product.images[0]}
              price={product.price}
              id={product.id}
            />
          </>
        ))}
      </Grid>
    </>
  );
};

export default Products;
