import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import Button from '../../components/Button';
import { Selector } from '../../components/selector';

export const Wrapper = styled.View`
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  width: 100%;
  flex: 1;
`;

export const Header = styled.Text`
  color: ${colors.COLOR_BLACK80};
  font-size: 12px;
  margin-left: 25%;
  font-family: 'Nunito_Bold';
`;

export const Cancel = styled.Text`
  color: ${colors.COLOR_BLACK50};
  font-size: 12px;
  font-family: 'Nunito_Regular';
`;
export const BottomTab = styled.View<{ disabled: boolean }>`
  background-color: ${(props) => (props.disabled ? colors.COLOR_WHITE_GRAY : colors.COLOR_YELLOW)};
  height: 100px;
  width: 110%;
  align-items: center;
  justify-content: center;
  border-width: 3px;
  border-top-color: ${(props) =>
    props.disabled ? colors.COLOR_WHITE_20 : colors.COLOR_YELLOW_RATING};
  position: absolute;
  bottom: 0;
`;

export const Empty = styled.View`
  background-color: transparent;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 200px;
  border-radius: 10px;
`;

export const Container = styled.View`
  align-items: center;
  width: 50%;
  margin-bottom: 5%;
  margin-top: 20px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

export const SelectorCoupon = styled(Selector)`
  margin-bottom: 10px;
`;

export const ConfirmButton = styled(Button).attrs((props) => ({
  text: 'Adicionar',
  textColor: colors.COLOR_YELLOW,
  styleContainer: {
    backgroundColor: colors.COLOR_WHITE,
    width: 150,
    height: 50,
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginBottom: '5%',
  },
}))``;

export const FlatItems = styled.FlatList.attrs((props) => ({
  numColumns: 2,
  style: { marginTop: '20%' },
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { width: '100%', paddingBottom: '25%' },
}))``;
