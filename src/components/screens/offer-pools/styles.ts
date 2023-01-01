import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import { ShopIcon } from '../../../../assets/icons/shop_icon';

export const ScreenContainer = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

export const ItemWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-self: center;
  flex-direction: row;
  align-items: center;
  width: 90%;
  height: 100px;
`;

export const StoreImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  border-width: 5px;
  border-color: ${colors.COLOR_BLACK20};
`;

export const EmptyShopContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  border-width: 3px;
  justify-content: center;
  align-items: center;
  border-color: ${colors.COLOR_BLACK10};
`;

export const EmptyShopIcon = styled(ShopIcon).attrs({
  width: 20,
  height: 20,
  fill: colors.COLOR_BLACK20,
})``;

export const ContainerDescriptions = styled.View`
  padding-left: 5%;
  padding-bottom: 5%;
  width: 70%;
  flex-direction: row;
`;

export const StoreName = styled.Text`
  color: ${colors.COLOR_BLACK80};
  font-size: 15px;
  font-family: 'Nunito_Regular';
`;

export const Subtitle = styled.Text`
  color: ${colors.COLOR_SECUNDARY_BLACK};
  font-size: 14px;
  font-family: 'Nunito_Bold';
`;

export const BadgeContainer = styled.View`
  margin-left: 10px;
  width: 80px;
  height: 20px;
  background-color: ${`${colors.COLOR_GREEN}90`};
  border-radius: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${colors.COLOR_GREEN};
`;

export const BadgeText = styled.Text`
  color: ${colors.COLOR_SECOND_GREEN};
  font-size: 12px;
  font-family: 'Nunito_Bold';
`;

export const ContainerNotFound = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
`;

export const EmptySubtitle = styled.Text`
  color: ${colors.COLOR_GRAY};
  font-size: 14px;
  font-family: 'Nunito_Regular';
  top: 20px;
`;
