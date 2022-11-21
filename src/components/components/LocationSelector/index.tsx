import React, { useState } from 'react';
import { CityTitle, CityTouchable, Container } from './styles';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../../../assets/constants/colors';

export const LocationSelector: React.FC = () => {
  const [city, setCity] = useState({ id: 0, name: 'LOREM IPSUN' })

  return (
    <Container>
      <CityTitle>{city.name}</CityTitle>
      <CityTouchable>
        <Feather
          name={'chevron-down'}
          size={16}
          color={colors.COLOR_WHITE}
        />
      </CityTouchable>
    </Container>
  );
}
