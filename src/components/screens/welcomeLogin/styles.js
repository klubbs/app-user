import { StyleSheet } from 'react-native'
import styled from 'styled-components'
import COLORS from '../../../../assets/constants/colors'

export const Styles = StyleSheet.create(
  {
    imageBackgroundStyles: { width: '95%', justifyContent: 'center', alignItems: 'center', marginBottom: '25%' }
  }
)

export const Wrapper = styled.SafeAreaView`
  background-color: ${COLORS.COLOR_SECUNDARY_BLACK};
  flex: 1;
`

export const ContainerTop = styled.View`
  flex: 1 ;
  justify-content: flex-end;
  align-items: center;
`

export const ContainerBottom = styled.View`
  flex: 6 ;
  justify-content: flex-end;
  align-items: center;
`

export const Title = styled.Text`
  color:${COLORS.COLOR_WHITE};
  font-size:20px;
  font-family:'Nunito_Bold';`

export const Description = styled.Text`
  color:${COLORS.COLOR_WHITE_80};
  font-size:16px;
  font-family:'Nunito_Regular';
  text-align: center;
`

export const ExplainText = styled.Text`
  color:${COLORS.COLOR_WHITE_40};
  font-size:13px;
  font-family:'Nunito_Light';
  text-align: center;
  margin-bottom: 5%;
`
