import React from 'react';
import { View } from 'react-native'
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
        {/* <ContainerBottom> */}
        <View style={{ flex: 1 }}>
          <MainCategories />
        </View>
        <View style={{ flex: 5, paddingLeft: '2%', paddingRight: '2%' }}>
          <RestaurantsList />
        </View>
        {/* </ContainerBottom> */}
      </Wrapper>
    </HomeProvider>
  );
}
