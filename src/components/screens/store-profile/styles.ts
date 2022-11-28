import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.COLOR_WHITE};
`;

export const ImageContainer = styled.View`
  flex: 0.3;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
`;

export const YellowContainer = styled.View`
  height: 70%;
  width: 100%;
  border-radius: 15;
  align-items: flex-start;
  padding:10px
  background-color: ${colors.COLOR_YELLOW_LOW};
`;

export const ImageStore = styled.Image.attrs({
  resizeMode: 'cover',
})`
  height: 130px;
  width: 130px;
  border-radius: 15;
  z-index: 10px;
  top: 25%;
  position: absolute;
`;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding-horizontal: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.COLOR_WHITE};
`;

export const StoreName = styled.Text`
  color: ${colors.COLOR_SECUNDARY_BLACK};
  font-size: 20px;
  font-family: 'Nunito_SemiBold';
`;

export const StoreCategory = styled.Text`
  color: ${colors.COLOR_YELLOW};
  font-size: 15px;
  font-family: 'Nunito_Bold';
`;

export const StoreCategoryContainer = styled.View`
  margin-top: 5px;
  background-color: ${colors.COLOR_YELLOW_LOW};
  align-items: center;
  justify-content: center;
  width: 25%;
  padding-horizontal: 8px;
  padding-vertical: 2px;
  border-radius: 4px;
  border-color: ${colors.COLOR_YELLOW_VERY_LOW};
  border-width: 2px;
`;

export const HeaderTitle = styled.Text`
  color: ${colors.COLOR_SECUNDARY_BLACK};
  font-size: 16px;
  font-family: 'Nunito_Bold';
`;

export const HeaderSubtitle = styled.Text`
  color: ${colors.COLOR_GRAY};
  font-size: 13px;
  margin-bottom: 5%;
  font-family: 'Nunito_Regular';
`;

export const StoreNameWrapper = styled.View`
  align-items: center;
  width: 100%;
  padding-bottom: 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.COLOR_BLACK10};
  margin-top: 10px;
`;

export const BlocksWrapper = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`;
export const BlocksValue = styled.Text`
  color: ${colors.COLOR_YELLOW};
  margin-left: 5px;
  font-size: 14px;
  font-family: 'Nunito_Bold';
`;

export const WrapperOffer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-vertical: 10px;
`;

const StyledContainer = styled.View`
  height: 60px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  border-width: 2px;
`;

export const OfferDescription = styled(StyledContainer)`
  width: ${Dimensions.get('window').width * 0.76};
  background-color: ${colors.COLOR_SECUNDARY_BLACK};
  border-color: ${colors.COLOR_WHITE_20};
`;

export const OfferContainer = styled(StyledContainer)`
  width: ${Dimensions.get('window').width * 0.15};
  background-color: ${colors.COLOR_YELLOW};
  border-color: ${colors.COLOR_YELLOW_LOW};
`;

export const UseThisOffer = styled.Text`
  color: ${colors.COLOR_WHITE};
  font-size: 18px;
  letter-spacing: 0.5px;
  font-family: 'Nunito_Bold';
`;

export const TicketMinimum = styled.Text`
  color: ${colors.COLOR_WHITE_80};
  font-size: 11px;
  letter-spacing: 0.5px;
  font-family: 'Nunito_Light';
`;

export const OfferOff = styled.Text`
  color: ${colors.COLOR_YELLOW_BUTTON_TEXT};
  font-size: 20px;
  font-family: 'Nunito_ExtraBold';
`;

export const HeaderOffer = styled.Text`
  color: ${colors.COLOR_YELLOW_BUTTON_TEXT};
  font-size: 20px;
  font-family: 'Nunito_ExtraBold';
`;

export const InteractionsWrapper = styled.View`
  flex: 3;
  width: 100%;
  border-top-width: 1px;
  border-top-color: ${colors.COLOR_BLACK10};
  padding-top: 10px;
`;
