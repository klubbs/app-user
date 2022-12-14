import { Feather } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { color } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import { ShopIcon } from '../../../../assets/icons/shop_icon';

const { width } = Dimensions.get('window');

export const Wrapper = styled.View`
  flex: 1;
`;

export const Code = styled.Text`
  font-size: 20;
  color: ${colors.COLOR_WHITE};
  font-family: 'Nunito_Bold';
`;

export const ContainerTop = styled.View`
  background-color: ${colors.COLOR_YELLOW};
  flex: 0.4;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 20;
  border-bottom-right-radius: 20;
`;

export const ContainerBottom = styled.View`
  background-color: ${colors.COLOR_WHITE};
  flex: 1;
`;

export const ItemContainer = styled.View`
  width: ${width};
  height: 80px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding-horizontal: 10px;
`;

export const Store = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 12;
  color: ${colors.COLOR_SECUNDARY_BLACK};
  font-family: 'Nunito_Regular';
  left: 10px;
`;

export const ValidAt = styled.Text<{ isValid: boolean }>`
  font-size: 11;
  color: ${(props) => (props.isValid ? colors.COLOR_GREEN : colors.COLOR_RED)};
  font-family: 'Nunito_SemiBold';
`;

export const EmptyText = styled.Text`
  font-size: 12;
  color: ${colors.COLOR_BLACK50};
  font-family: 'Nunito_Regular';
  top: 10px;
  text-align: center;
  margin-bottom: 10px;
`;

export const SeparatorComponet = styled.View`
  /* height: 40px ; */
  align-self: center;
  width: ${width * 0.8};
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom-color: ${colors.COLOR_BLACK20};
  border-bottom-width: 1px;
`;

export const ContainerSubtitleOffers = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 0.9;
`;
export const ContainerStoreOffers = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const DisableActionContainer = styled.TouchableOpacity.attrs((props) => ({
  activeOpacity: 0.5,
}))`
  justify-content: center;
  align-items: center;
  border-top-left-radius: 8;
  border-bottom-left-radius: 8;
  height: 100%;
  width: 20%;
`;

export const StoreImage = styled.Image`
  width: 30px;
  height: 30px;
`;

export const ContainerStoreImage = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
export const EmptyShopIcon = styled(ShopIcon).attrs((props) => ({
  width: 12,
  height: 12,
  fill: colors.COLOR_BLACK40,
}))``;
