import React from 'react';
import { View } from 'react-native';
import { Container, Input } from './styles';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../../../assets/constants/colors';
// import { Container } from './styles';

const SearchBar: React.FC = () => {
  return (
    <Container>
      <Feather name={'search'} size={16} color={colors.COLOR_YELLOW} />
    </Container>
  );
};

export { SearchBar };
