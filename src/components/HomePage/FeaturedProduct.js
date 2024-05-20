import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fecthProductsAction } from "../../redux/slices/products/productsSlice";
import baseURL from "../../utils/baseURL";

export default function FeaturedProductHome() {
  let [productsList, setprodutcts] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthProductsAction({ url: `${baseURL}/products` }));
  }, [dispatch]);

  const { products, error, loading } = useSelector((state) => state?.products);

  useEffect(() => {
    if (products !== null) {
      setprodutcts(products);
    }
  }, [products]);

  if (error) {
    console.log(error);
  }
  return (
    <Grid
      container
      spacing={1}
      sx={{
        paddingLeft: "2rem",
        backgroundColor: "background.default",
        height: {
          xs: "auto", // Definindo a altura para ocupar toda a viewport em dispositivos móveis
          sm: "auto",
          md: "auto", // Altura menor para telas maiores
          lg: "auto",
          xl: "auto",
        },
        display: "flex", // Usando flexbox para alinhar verticalmente os itens
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          justifyContent: "center",
          alignItems: "flex-start",
          order: { xs: 2, sm: 2, md: 1, lg: 1, xl: 1 },
        }}
      >
        <Typography variant="h1">Nike Dunk Low 6</Typography>
        <Typography variant="body1">
          Uma nova forma de fechar seu look com o mais novo da Nike
        </Typography>
        <Button variant="primary" sx={{ marginTop: "1rem" }}>
          Comprar agora
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        sx={{
          textAlign: "center",
          position: "relative",
          order: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2 },
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={
              productsList && productsList?.data
                ? productsList?.data[0]?.images[0]
                : null
            }
            alt={
              productsList && productsList?.data
                ? productsList?.data[0]?.name
                : null
            }
            style={
              {
                // maxWidth: "100%",
                // maxHeight: "100%",
              }
            }
          />
        </div>
      </Grid>
    </Grid>
  );
}
