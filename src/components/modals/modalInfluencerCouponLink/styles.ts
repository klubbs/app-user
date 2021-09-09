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

export const BottomTab = styled.View`
  background-color: ${colors.COLOR_YELLOW};
  height: 100px;
  width: 110%;
  flex-direction: row;
  padding-right:10%;
  padding-top:2%;
  justify-content: flex-end;
  border-width: 3px;
  border-top-color: ${colors.COLOR_YELLOW_RATING};
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
  text: 'Vincular',
  textColor: colors.COLOR_YELLOW,
  styleContainer: { backgroundColor: colors.COLOR_WHITE, width: 150, height: 50 }
}))``

export const FlatItems = styled.FlatList.attrs(props => ({
  numColumns: 2,
  style: { marginTop: '20%' },
  contentContainerStyle: { width: '100%' }
}))``
