import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import { ShopIcon } from '../../../../assets/icons/shop_icon';
import { Platform } from 'react-native';
import { isBiggerAndroid } from '../../../utils/dimensions';

export const Wrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.85,
})`
  width: 200px;
  height: ${Platform.select({
    ios: 120,
    android: isBiggerAndroid() ? 120 : 100,
  })};
`;

export const EstablishmentImage = styled.Image`
  align-items: flex-start;
  flex: 2;
  border-radius: 5px;
  width: 100%;
  bottom: 5px;
`;

export const EmptyImage = styled.View`
  align-items: center;
  justify-content: center;
  flex: 2;
  border-radius: 5px;
  width: 100%;
  bottom: 5px;
  background-color: ${colors.COLOR_BLACK10};
`;

export const EmptyIcon = styled(ShopIcon).attrs((props) => ({
  fill: colors.COLOR_BLACK40,
  width: 40,
  height: 40,
}))``;

export const ContainerToolbar = styled.View`
  flex: 0.65;
  width: 100%;
  background-color: ${colors.COLOR_BLACK};
  border-radius: 5px;
  justify-content: flex-start;
  padding-horizontal: 5px;
  align-items: center;
  flex-direction: row;
`;

const ToolbarBadgeDefault = styled.View`
  width: 30%;
  height: 80%;
  margin-right: 8px;
`;

export const ContainerOff = styled(ToolbarBadgeDefault)`
  background-color: ${colors.COLOR_SECUNDARY_BLACK};
  border-radius: 8px;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
`;

export const OffCoupon = styled.Text`
  color: ${colors.COLOR_YELLOW};
  font-size: 11px;
  font-family: 'Nunito_Bold';
`;
