import styled from 'styled-components/native';
import colors from '../../../../assets/constants/colors';
import Button from '../../component/button';
import { Selector } from '../../component/selector';


export const Wrapper = styled.View`
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  width: 100%;
  flex:1;
`

export const Header = styled.Text`
  color:${colors.COLOR_BLACK80};
  font-size:12px;
  font-family:'Nunito_Bold';
`

export const HeaderDisabled = styled.Text`
  color:${colors.COLOR_WHITE};
  margin-bottom: 5px;
  font-size:12px;
  font-family:'Nunito_Bold';
`
export const SubtitleDisabled = styled.Text`
  color:${colors.COLOR_WHITE_80};
  font-size:10px;
  font-family:'Nunito_Regular';
`

export const BottomTab = styled.View<{ disabled: boolean }>`
  background-color: ${props => props.disabled ? colors.COLOR_RED : colors.COLOR_YELLOW};
  height: 100px;
  width: 110%;
  align-items: center;
  justify-content: center;
  border-width: 3px;
  border-top-color: ${props => props.disabled ? colors.COLOR_WHITE_20 : colors.COLOR_YELLOW_RATING};
  position: absolute;
  bottom: 0;
`

export const Empty = styled.View`
  background-color: transparent;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 200px;
  border-radius: 10px;
`

export const Container = styled.View`
  align-items: center;
  margin-top: 20px;
`

export const SelectorCoupon = styled(Selector)`
  margin-bottom: 10px;
`

export const ConfirmButton = styled(Button).attrs(props => ({
  text: 'Adicionar',
  textColor: colors.COLOR_YELLOW,
  styleContainer: { backgroundColor: colors.COLOR_WHITE, width: 150, height: 50, alignSelf: 'flex-end', marginRight: '10%', marginBottom: '5%' }
}))``

export const FlatItems = styled.FlatList.attrs(props => ({
  numColumns: 2,
  style: { marginTop: '20%' },
  contentContainerStyle: { width: '100%' }
}))``
