import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import { Uber as UberIcon } from '../../../../assets/images/others/uber';
import { Feather } from '@expo/vector-icons';

export const RestaurantFlatlist = styled.FlatList``;

export const Uber = styled(UberIcon).attrs(() => ({
  width: '100%',
  height: '100%',
}))``;

export const Instagram = styled(Feather).attrs(() => ({
  name: 'instagram',
  size: 40,
  color: colors.COLOR_SECUNDARY_BLACK,
}))``;

export const Container = styled.View`
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  width: 50px;
  height: 50px;
`;

export const Header = styled.Text`
  color: ${colors.COLOR_SECUNDARY_BLACK};
  font-size: 16px;
  font-family: 'Nunito_Bold';
  margin-bottom: 20px;
`;

export const TouchableContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const GapSpacing = styled.View`
  width: 10px;
`;
