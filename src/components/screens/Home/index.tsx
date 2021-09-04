import React from 'react';
import { HomeProvider } from '../../../contexts/homeContext';
import AdvertisementsSlider from "../../componentHeavy/bannerAdvertisements";
import MainCategories from '../../componentHeavy/restaurantsCategories';
import { RestaurantsList } from '../../componentHeavy/restaurantsList';
import { Container, ContainerBottom, Wrapper } from './styles';

export const Home: React.FC = () => {


  return (
    <HomeProvider>
      <Wrapper>

        <Container>
          <AdvertisementsSlider />
        </Container>
        <ContainerBottom>
          <MainCategories />
          <RestaurantsList />
        </ContainerBottom>
      </Wrapper>
    </HomeProvider>
  );
}
