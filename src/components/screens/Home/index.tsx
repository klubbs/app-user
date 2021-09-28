import React from 'react';
import { HomeProvider } from '../../../contexts/homeContext';
import AdvertisementsSlider from "../../organisms/bannerAdvertisements";
import MainCategories from '../../organisms/restaurantsCategories';
import { RestaurantsList } from '../../organisms/restaurantsList';
import { Container, ContainerBottom, Wrapper } from './styles';

export const Home: React.FC = () => {


  return (
    <HomeProvider>
      <Wrapper>

        {/* <Container>
          <AdvertisementsSlider />
        </Container> */}
        <ContainerBottom>
          <MainCategories />
          <RestaurantsList />
        </ContainerBottom>
      </Wrapper>
    </HomeProvider>
  );
}
