import React from 'react';
import { HomeProvider } from '../../../contexts/home-context';
import { RestaurantsList } from '../../components_heavy/RestaurantsList';
import {
  ContainerBottom,
  Wrapper,
  ContainerCategories,
  ContainerDiscountPool,
  ContainerCommandUserBar,
  ContainerSearch,
} from './styles';
import { DiscountPoolSlider } from '../../components_heavy/DiscountPoolSlider';
import { LocationSelector } from '../../components/LocationSelector';
import { SearchBar } from '../../components/search-bar';
import { ScrollView } from 'react-native-gesture-handler';
import { CommandUserBar } from '../../components_heavy/command-user-bar';

export const Home: React.FC = () => {
  return (
    <Wrapper>
      <ContainerCommandUserBar>
        <CommandUserBar />
      </ContainerCommandUserBar>
      <ContainerDiscountPool>
        <DiscountPoolSlider />
      </ContainerDiscountPool>
      {/* <ContainerCategories>
          <MainCategories />
        </ContainerCategories> */}
      <ContainerBottom>
        <RestaurantsList />
      </ContainerBottom>
    </Wrapper>
  );
};
