// ProductCarousel.js
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa os estilos do carrossel
import { CardMedia, Typography, Grid, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fecthProductsAction } from "../../redux/slices/products/productsSlice";

const products = [
  {
    id: 1,
    name: "Produto 1",
    description: "Descrição do Produto 1",
    image: "https://via.placeholder.com/300",
    price: "R$ 100,00",
  },
  {
    id: 2,
    name: "Produto 2",
    description: "Descrição do Produto 2",
    image: "https://via.placeholder.com/300",
    price: "R$ 200,00",
  },
  {
    id: 3,
    name: "Produto 3",
    description: "Descrição do Produto 3",
    image: "https://via.placeholder.com/300",
    price: "R$ 300,00",
  },
  {
    id: 4,
    name: "Produto 4",
    description: "Descrição do Produto 4",
    image: "https://via.placeholder.com/300",
    price: "R$ 400,00",
  },
  // Adicione mais produtos conforme necessário
];

// Função para agrupar produtos em conjuntos de três
const chunkArray = (arr, size) => {
  const results = [];
  while (arr.length) {
    results.push(arr.splice(0, size));
  }
  return results;
};

const ProductCarousel = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthProductsAction());
  }, [dispatch]);

  const [listProducts, setListProducts] = useState([]);

  const { products } = useSelector((state) => state?.products);

  useEffect(() => {
    if (products) {
      setListProducts(products?.data);
    }
  }, [products]);

  console.log(listProducts);

  const productChunks = listProducts ? chunkArray([...listProducts], 3) : [];

  return (
    <>
      <Container sx={{ marginTop: "4rem", marginBottom: "2rem" }}>
        <Typography variant="h1">Sneakers</Typography>
      </Container>
      <Container container space={2}>
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
        >
          {productChunks.map((chunk, index) => {
            return (
              <Grid container spacing={2} key={index}>
                {chunk?.map((product) => {
                  return (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      <Link to="/">
                        <CardMedia
                          sx={{ height: 340 }}
                          image={product?.images[0]}
                          title="green iguana"
                        />
                      </Link>

                      <Box sx={{ marginY: "2rem" }}>
                        <Link to="/">
                          <Typography variant="h4" sx={{ textAlign: "start" }}>
                            {product?.name}
                          </Typography>
                          <Typography
                            sx={{ textAlign: "start", marginTop: "1rem" }}
                          >
                            {product?.description}
                          </Typography>
                          <Typography sx={{ textAlign: "start" }}>
                            R$ {product?.price}
                          </Typography>
                        </Link>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            );
          })}
        </Carousel>
      </Container>
    </>
  );
};

export default ProductCarousel;
