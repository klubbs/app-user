import styled from 'styled-components/native'
import { colors } from '../../../../assets/constants/colors'
import { TextInputMask } from 'react-native-masked-text'
import { Dimensions } from 'react-native'

export const Wrapper = styled.View`
    flex:1;
    background-color: ${colors.COLOR_WHITE};
    align-items:center ;
    padding-bottom: 10% ;
`

export const Subtitle = styled.Text`
  color:${colors.COLOR_BLACK80};
  margin-top:25%;
  font-size:16px;
  font-family:'Nunito_Regular';
`

export const SubtitleMoney = styled.Text`
  color:${colors.COLOR_BLACK50};
  font-size:13px;
  top:30px;
  font-family:'Nunito_Light';
`

export const ContainerTop = styled.View`
    flex:0.8;
    width:80% ;
    border-bottom-color:  ${colors.COLOR_BLACK10} ;
    border-bottom-width:2px ;
    justify-content: center ;
    align-items:center ;
`

export const ContainerBottom = styled.View`
    flex:1;
    align-items:center;
    justify-content:center ;
    width: 100%;
`

export const RSMoney = styled.Text`
  color:${colors.COLOR_SECUNDARY_BLACK};
  font-size:30px;
  font-family:'Nunito_SemiBold';
`

export const UserAmount = styled(TextInputMask).attrs(({
  placeholder: "0,00",
  placeholderTextColor: colors.COLOR_BLACK40,
  selectionColor: colors.COLOR_YELLOW,
  returnKeyType: 'done',
  type: 'money',
  options: {
    precision: 0,
    separator: ',',
    delimiter: '.',
    unit: '',
    suffixUnit: ''
  },
}))`
  color:${colors.COLOR_SECUNDARY_BLACK};
  font-size:30px;
  font-family:'Nunito_Bold';
`

export const WrapperOffer = styled.TouchableOpacity.attrs(({
  activeOpacity: 0.9
}))`
  width: ${Dimensions.get('window').width * 0.95};
  height: 70px;
  flex-direction: row;
  justify-content: center;
  align-items:center;
  margin-bottom: 10px ;
  border-radius:5px;
  padding:2px;
`

export const WrapperOfferContainer = styled.View`
  flex:0.8;
  height:100%;
  border-top-right-radius:5px ;
  border-bottom-right-radius:5px ;
  background-color: ${colors.COLOR_BLACK10};
  align-items:center ;
  justify-content:space-evenly ;
  flex-direction:row;
`

export const StoreImage = styled.Image.attrs<{ imageUri: string }>(({ imageUri }) => ({
  source: { uri: `https://klubbs-establishment.s3.amazonaws.com/${imageUri}` }
})) <{ imageUri: string }>`
  flex:0.2;
  height:100%;
  margin-left: 10px;
  border-top-left-radius:5px ;
  border-bottom-left-radius:5px ;
`

export const FlatListOffers = styled.FlatList.attrs(({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    alignItems: 'center',
    paddingBottom: '25%'
  }
}))`
  width:100% ;
  top: 20px ;
`

export const StoreName = styled.Text.attrs(({ numberOfLines: 3 }))`
  color:${colors.COLOR_SECUNDARY_BLACK};
  font-size:14px;
  font-family:'Nunito_Bold';
  max-width: 90;
`

export const StoreTicket = styled.Text`
  color:${colors.COLOR_BLACK50};
  font-size:12px;
  font-family:'Nunito_Bold';
`
