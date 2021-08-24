import React from 'react';
import AdvertisementsSlider from "../../component_heavy/advertisements_banner";
import BarHome from "../../component_heavy/bar_top_home";
import MainCategories from '../../component_heavy/restaurants_categories';
import Restaurants from '../../component_heavy/restaurants_flatlist';
import { Container, ContainerBottom, Wrapper } from './styles';

const example = [
  { text: "Todos", id: "1", icon: "" },
  { text: "Churrascaria", id: "2", icon: "" },
  { text: "Italiana", id: "3", icon: "" },
  { text: "Japonesa", id: "4", icon: "" },
  { text: "Japonesa", id: "5", icon: "" },
  { text: "Mexicana", id: "6", icon: "" },
  { text: "Alemã", id: "7", icon: "" }]

export const Home: React.FC = () => {

  return (
    <Wrapper>
      <BarHome />

      <Container>
        <AdvertisementsSlider />
      </Container>

      <ContainerBottom>
        <MainCategories categories={example} />
        <Restaurants />
      </ContainerBottom>

    </Wrapper>
  );
}
