// Hero.js
import React from "react";
import styled from "styled-components";

const Hero = () => {
  return (
    <HeroContainer>
      <TextContainer>
        <h1>Bem-vindo à Nossa Loja</h1>
        <p>Descubra produtos incríveis com descontos especiais!</p>
        <HeroButton>Ver Produtos</HeroButton>
      </TextContainer>
    </HeroContainer>
  );
};

export default Hero;

// Styled-components
const HeroContainer = styled.div`
  background-image: url("https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"); /* Imagem de fundo de um tênis */
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Alinhamento à esquerda */

  /* Ajuste responsivo */
  @media (max-width: 768px) {
    height: 300px; /* Altura menor para tablet */
  }

  @media (max-width: 480px) {
    height: 200px; /* Altura menor para mobile */
  }
`;

const TextContainer = styled.div`
  color: #ffc107; /* Cor do texto */
  max-width: 400px; /* Limitar a largura do texto */
  margin-left: 12px; /* Margem à esquerda */

  h1 {
    font-size: 32px;
    margin: 0;
  }

  p {
    font-size: 18px;
    margin: 10px 0;
  }
`;

const HeroButton = styled.button`
  background-color: #000; /* Cor de fundo do botão */
  color: #ffc107; /* Cor do texto do botão */
  border: none;
  padding: 12px 24px; /* Padding do botão */
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ffc107; /* Cor de fundo ao passar o mouse */
    color: #000; /* Cor do texto ao passar o mouse */
  }
`;
