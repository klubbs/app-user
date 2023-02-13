import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import { Feather } from '@expo/vector-icons';
import { ShopIcon } from '../../../../assets/icons/shop_icon';

export const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
`;

export const Divider = styled.View`
  height: 1px;
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: ${colors.COLOR_BLACK10};
`;

export const Container = styled.TouchableOpacity.attrs((props) => ({
  activeOpacity: 0.8,
}))`
  background-color: ${colors.COLOR_BLACK10};
  flex-direction: row;
  border-radius: 10px;
  margin-bottom: 15px;
  width: 100%;
  height: 60px;
  justify-content: space-evenly;
  align-items: center;
`;

export const Code = styled.Text`
  color: ${colors.COLOR_BLACK};
  font-family: 'Nunito_Bold';
  font-size: 14px;
`;

export const ContainerPressable = styled.View`
  flex: 0.2;
`;

export const ContainerShop = styled.View`
  flex: 0.2;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  right: 20px;
`;

export const ContainerCouponInformation = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

export const Copy = styled(Feather).attrs((props) => ({
  name: 'copy',
  size: 20,
  color: colors.COLOR_BLACK40,
}))``;

export const ShopSubtitleIcon = styled(ShopIcon).attrs((props) => ({
  width: 12,
  height: 12,
  fill: colors.COLOR_YELLOW,
}))`
  margin-left: 5px;
`;

export const ShopSubtitle = styled.Text`
  font-size: 12;
  color: ${colors.COLOR_YELLOW};
  font-family: 'Nunito_Bold';
`;
