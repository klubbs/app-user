import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';


export const Container = styled.View`
`

export const TouchableDiscountImage = styled.TouchableOpacity.attrs(({
  activeOpacity: 0.9
}))``;

export const Title = styled.Text`
  color:${colors.COLOR_SECUNDARY_BLACK};
  font-size:18px;
  font-family:'Nunito_Bold';
  text-align: flex-start;
  padding-left:4%;
`

export const Subtitle = styled.Text`
  color:${colors.COLOR_GRAY};
  font-size:13px;
  font-family:'Nunito_Light';
  text-align: flex-start;
  margin-bottom:20px
  padding-left:4%;
`
