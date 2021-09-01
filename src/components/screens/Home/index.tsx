import React from 'react';
import HomeProvider from '../../../contexts/homeContext';
import AdvertisementsSlider from "../../componentHeavy/bannerAdvertisements";
import MainCategories from '../../componentHeavy/restaurantsCategories';
import { RestaurantsFlatlist } from '../../componentHeavy/restaurantsFlatlist';
import { Container, ContainerBottom, Wrapper } from './styles';

export const Home: React.FC = () => {

  return (
    <Wrapper>

      <Container>
        <AdvertisementsSlider />
      </Container>
      <HomeProvider>
        <ContainerBottom>
          <MainCategories />
          <RestaurantsFlatlist />
        </ContainerBottom>
      </HomeProvider>
    </Wrapper>
  );
}
