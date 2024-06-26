import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.COLOR_WHITE};
`;

export const IconLogout = styled(Feather).attrs((props) => ({
  name: 'log-out',
  size: 16,
  colors: colors.COLOR_BLACK40,
}))``;

export const ContainerPoints = styled.View`
  border-left-width: 0.8px;
  border-left-color: ${colors.COLOR_BLACK20};
  flex: 1;
  height: 20%;
  margin-left: 5%;
  justify-content: center;
  padding-left: 10%;
`;

export const UserImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 70px;
  height: 70px;
  z-index: 10px;
`;

export const ContainerImage = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const WrapperTop = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const PointValues = styled.Text`
  color: ${colors.COLOR_BLACK40};
  font-size: 14px;
  font-family: 'Nunito_Light';
`;

export const Point = styled.Text`
  color: ${colors.COLOR_BLACK80};
  font-size: 14px;
  font-family: 'Nunito_Regular';
`;

export const MenuTextContainer = styled.View`
  flex: 1;
  align-items: flex-start;
  padding-left: 5%;
`;

export const MenuLogoutContainer = styled.TouchableOpacity.attrs((props) => ({
  activeOpacity: 0.8,
}))`
  margin-top: 50px;
  padding-left: 2%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 15%;
`;

export const MenuTextLogout = styled.Text`
  color: ${colors.COLOR_BLACK40};
  font-size: 16px;
  font-family: 'Nunito_Regular';
`;

export const ContainerScroll = styled.ScrollView`
  padding: 20px;
`;
