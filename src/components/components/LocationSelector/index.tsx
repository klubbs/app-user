import React, { useContext } from 'react';
import { CityTitle, CityTouchable, Container } from './styles';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../../../assets/constants/colors';
import { HomeContext } from '../../../contexts/home-context';

export const LocationSelector: React.FC = () => {
  const { location } = useContext(HomeContext);

  return (
    <Container>
      <CityTitle>{location.city}</CityTitle>
      <CityTouchable>
        <Feather name={'chevron-down'} size={16} color={colors.COLOR_WHITE} />
      </CityTouchable>
    </Container>
  );
};
