import React from 'react';
import { HomeProvider } from '../../../contexts/homeContext';
import AdvertisementsSlider from "../../organisms/BannerAdvertisements";
import MainCategories from '../../organisms/RestaurantsCategories';
import { RestaurantsList } from '../../organisms/RestaurantsList';
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
