import { Typography, Container, Grid, Box } from "@mui/material";
import { Truck, ShieldCheck, Trophy } from "lucide-react";

const advantages = [
  {
    icon: (color, strokeWidth) => {
      return <Truck size={30} color={color} strokeWidth={strokeWidth} />;
    },
    colorIcon: "black",
    strokeWidth: 1,
    title: "Frete grátis",
    text: "Atualize seu estilo e obtenha frete GRÁTIS em todos os pedidos",
  },
  {
    icon: (color, strokeWidth) => {
      return <ShieldCheck size={30} color={color} strokeWidth={strokeWidth} />;
    },
    colorIcon: "black",
    strokeWidth: 1,
    title: "Pagamento seguro",
    text: "Sua segurança é nossa prioridade. Seu pagamento está seguro com a gente",
  },
  {
    icon: (color, strokeWidth) => {
      return <Trophy size={30} color={color} strokeWidth={strokeWidth} />;
    },
    colorIcon: "black",
    strokeWidth: 1,
    title: "Satisfação garantida",
    text: "Ame nossos produtos ou tenha seu dinheiro de volta",
  },
];

export default function Advantages() {
  return (
    <Container
      className="advantages"
      fixed
      sx={{
        backgroundColor: "white",
        height: { xs: "100vh", sm: "100vh", md: "40vh", xl: "40vh" },
        //border: "1px solid black",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "2rem",
          height: "30vh",
          backgroundColor: "white",
        }}
      >
        {advantages.map((advantage, index) => (
          <Grid
            key={index}
            item
            xs={12}
            md={4}
            sx={{
              marginBottom: { md: "2rem" },
              height: "30vh",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", sm: "center", md: "center" },
              gap: 1,
            }}
          >
            <Box
              sx={{
                borderRadius: "50%",
                width: "3rem",
                height: "3rem",
                backgroundColor: "#E6E7E8",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              {advantage.icon(advantage.colorIcon, advantage.strokeWidth)}
            </Box>

            <Typography variant="h6">{advantage.title}</Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#474B57",
                textAlign: { xs: "center", sm: "center", md: "center" },
              }}
            >
              {advantage.text}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
