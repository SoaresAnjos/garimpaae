import React, { useState } from "react";
import { Grid, Card, CardMedia, IconButton, Box } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import useIsMobile from "../../hooks/useIsMobile";

// Dados das fotos
const photos = [
  {
    src: "https://sneakersul.com.br/cdn/shop/files/nike-sb-dunk-low-ebay-1.webp?v=1711918943",
    alt: "After Rain (Jeshu John - designerspics.com)",
  },
  {
    src: "https://sneakersul.com.br/cdn/shop/files/nike-sb-dunk-low-ebay-1.webp?v=1711918943",
    alt: "Boats (Jeshu John - designerspics.com)",
  },
];

const GallerySlider = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Índice da imagem selecionada
  const isMobile = useIsMobile();
  // Navega para a próxima imagem
  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  // Navega para a imagem anterior
  const handlePrev = () => {
    setSelectedIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };

  return (
    <div>
      {/* Slider de imagens */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        sx={{
          width: "80%",
          height: "auto",
          maxHeight: "80vh",
          margin: "auto",
          backgroundColor: "grey",
        }}
      >
        {/* Botão para voltar (seta para a esquerda) */}
        <IconButton
          onClick={handlePrev}
          color="primary"
          sx={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            color: "black",
          }}
        >
          <ArrowBack />
        </IconButton>

        {/* Exibe a imagem selecionada */}
        <Card sx={{ width: "100%", maxHeight: "40vh" }}>
          <CardMedia
            component="img"
            image={photos[selectedIndex].src}
            alt={photos[selectedIndex].alt}
            sx={{
              objectFit: "contain",
              height: "100%",
              borderRadius: "none",
              boxShadow: "none",
              backgroundColor: "#F6F6F6",
            }}
          />
        </Card>

        {/* Botão para avançar (seta para a direita) */}
        <IconButton
          onClick={handleNext}
          color="primary"
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            color: "black",
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>

      {/* Exibe miniaturas de todas as imagens */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "0.5rem", display: isMobile && "none" }}
      >
        {photos.map((photo, index) => (
          <Grid item xs={3} key={index}>
            <Card
              onClick={() => setSelectedIndex(index)}
              style={{ cursor: "pointer" }}
            >
              <CardMedia
                component="img"
                height="100"
                image={photo.src}
                alt={photo.alt}
                style={{ objectFit: "cover", backgroundColor: "#F6F6F6" }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default GallerySlider;
