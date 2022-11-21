import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';


export const ScreenContainer = styled.SafeAreaView`
  flex:1;
`

export const ItemWrapper = styled.View`
  align-self:center
  flex-direction:row;
  align-items:center;
  width:90%;
  height:100px;
`

export const StoreImage = styled.Image`
  width: 80px;
  height:80px;
  border-radius:10px
  border-width:5px;
  border-color:${colors.COLOR_BLACK20}
`

export const ContainerDescriptions = styled.View`
padding-left:5%;
padding-bottom:5%;
width:70%;
`

export const StoreName = styled.Text`
  color:${colors.COLOR_BLACK80};
  font-size:15px;
  font-family:'Nunito_Regular';
`

export const Subtitle = styled.Text`
  color:${colors.COLOR_SECUNDARY_BLACK};
  font-size:14px;
  font-family:'Nunito_Bold';
`




