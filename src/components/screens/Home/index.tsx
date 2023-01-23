import React, { useContext } from 'react';
import { RestaurantsList } from '../../components_heavy/RestaurantsList';
import { ContainerBottom, Wrapper, ContainerDiscountPool, ContainerCommandUserBar } from './styles';
import { DiscountPoolSlider } from '../../components_heavy/DiscountPoolSlider';
import { CommandUserBar } from '../../components_heavy/command-user-bar';
import { RestaurantsCategories } from '../../components_heavy/RestaurantsCategories';
import { HomeContext } from '../../../contexts/home-context';

export const Home: React.FC = () => {
  const { searchIsEnable } = useContext(HomeContext);

  return (
    <Wrapper>
      <ContainerCommandUserBar>
        <CommandUserBar />
      </ContainerCommandUserBar>
      {!searchIsEnable && (
        <ContainerDiscountPool>
          <DiscountPoolSlider />
        </ContainerDiscountPool>
      )}
      <ContainerBottom>
        {!searchIsEnable && <RestaurantsCategories />}
        <RestaurantsList />
      </ContainerBottom>
    </Wrapper>
  );
};
