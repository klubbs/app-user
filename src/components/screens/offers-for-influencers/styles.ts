import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';

export const Wrapper = styled.View`
  background-color: ${colors.COLOR_WHITE};
  padding-top: 25%;
  padding-bottom: 25%;
  flex: 1;
`;

export const Header = styled.Text`
  color: ${colors.COLOR_SECUNDARY_BLACK};
  margin-bottom: 20px;
  margin-left: 6%;
  font-size: 14px;
  font-family: 'Nunito_Bold';
`;

export const ItemsSubtitle = styled.Text`
  color: ${colors.COLOR_WHITE};
  font-size: 12px;
  font-family: 'Nunito_Regular';
`;

export const Items = styled.Text`
  color: ${colors.COLOR_WHITE};
  font-size: 12px;
  font-family: 'Nunito_Bold';
`;

export const ContainerItems = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-top: 5%;
  align-items: center;
`;

export const CouponWrapper = styled.View`
  flex-direction: row;
  position: absolute;
  right: 10%;
  top: 100%;
`;

export const FlatComponent = styled.FlatList.attrs((props) => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
}))``;

export const ContainerNotFound = styled.View`
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 150px;
`;

export const EmptyTitle = styled.Text`
  color: ${colors.COLOR_SECUNDARY_BLACK};
  font-size: 12px;
  font-family: 'Nunito_Bold';
  margin-top: 10px;
`;

export const EmptySubtitle = styled.Text`
  color: ${colors.COLOR_BLACK50};
  font-size: 12px;
  font-family: 'Nunito_Regular';
`;
