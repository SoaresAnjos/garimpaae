import { Box, Button, Grid, Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fecthProductsAction } from "../../redux/slices/products/productsSlice";
import baseURL from "../../utils/baseURL";

export default function FeaturedProductHome() {
  let [productsList, setprodutcts] = useState(null);

  // redux
  // context
  // state

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthProductsAction({ url: `${baseURL}/products` }));
  }, [dispatch]);

  const { products, error } = useSelector((state) => state?.products);

  useEffect(() => {
    if (products !== null) {
      setprodutcts(products);
    }
  }, [products]);

  if (error) {
    console.log(error);
  }

  return (
    <>
      <Grid
        className="hero"
        container
        spacing={2}
        sx={{
          marginBottom: "2rem",
          height: "60vh",
          background: "linear-gradient(45deg, #F6F6F6, #E6E7E8)",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Container
            fixed
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
                lg: "row",
              },
              justifyContent: {
                xs: "center",
                md: "space-between",
                lg: "space-between",
              },
              alignItems: {
                xs: "center",
                md: "space-between",
                lg: "space-between",
              },
            }}
          >
            <Box
              className="hero-text"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: {
                  xs: "center",
                  md: "flex-start",
                  lg: "flex-start",
                },
                gap: "1rem",
                order: {
                  xs: 2,
                  md: 1,
                },
              }}
            >
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: "600",
                    textAlign: {
                      xs: "center",
                      sm: "center",
                      md: "start",
                      lg: "start",
                    },
                  }}
                >
                  Novidades chegando
                </Typography>
                <Typography
                  variant="body"
                  sx={{
                    display: "flex",
                    justifyContent: {
                      xs: "center",
                      md: "flex-start",
                      lg: "flex-start",
                    },
                  }}
                >
                  Descubra nossa coleção hoje
                </Typography>
              </Box>
              <Box>
                <Button variant="primary">Descobrir agora</Button>
              </Box>
            </Box>
            <Box
              className="hero-img"
              sx={{
                height: 333,
                width: 450,
                maxHeight: { xs: 233, md: 567 },
                maxWidth: { xs: 350, md: 550 },
                zIndex: 100,
                order: {
                  xs: 1,
                  md: 2,
                },
              }}
            >
              <img
                src="https://sneakersul.com.br/cdn/shop/files/nike-sb-dunk-low-ebay-1.webp?v=1711918943"
                alt="The house from the offer."
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
