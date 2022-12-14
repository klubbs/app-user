import React from 'react';
import { HomeProvider } from '../../../contexts/home-context';
import MainCategories from '../../components_heavy/RestaurantsCategories';
import { RestaurantsList } from '../../components_heavy/RestaurantsList';
import {
  ContainerBottom,
  Wrapper,
  ContainerCategories,
  ContainerDiscountPool,
  ContainerLocation,
} from './styles';
import { DiscountPoolSlider } from '../../components_heavy/DiscountPoolSlider';
import { LocationSelector } from '../../components/LocationSelector';

export const Home: React.FC = () => {
  return (
    <Wrapper>
      <ContainerLocation>
        <LocationSelector />
      </ContainerLocation>
      <ContainerDiscountPool>
        <DiscountPoolSlider />
      </ContainerDiscountPool>
      <ContainerCategories>
        <MainCategories />
      </ContainerCategories>
      <ContainerBottom>
        <RestaurantsList />
      </ContainerBottom>
    </Wrapper>
  );
};
