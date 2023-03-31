import styled from 'styled-components/native';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { colors } from '../../../../assets/constants/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';

const { width, height } = Dimensions.get('window');

export const customStyleSheet = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.COLOR_SECUNDARY_BLACK,
  },
  containerFlatlist: {
    paddingTop: '15%',
  },
});

export const Wrapper = styled.View`
  background-color: ${colors.COLOR_SECUNDARY_BLACK};
  flex: 1;
`;
export const ContainerBottom = styled.View`
  flex: 6;
  justify-content: flex-end;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${colors.COLOR_WHITE};
  font-size: 20px;
  font-family: 'Nunito_Bold';
`;

export const Subtitle = styled.Text`
  color: ${colors.COLOR_WHITE_80};
  font-size: 14px;
  font-family: 'Nunito_Light';
  text-align: center;
`;

export const ExplainText = styled.Text`
  color: ${colors.COLOR_WHITE};
  font-size: 13px;
  font-family: 'Nunito_Light';
  text-align: center;
  margin-bottom: 5%;
`;

export const SubtitleRegister = styled.Text`
  color: ${colors.COLOR_SECUNDARY_WHITE};
  font-size: 18px;
  font-family: 'Nunito_Bold';
  margin-bottom: 10px;
`;

export const EnterButton = styled(Button).attrs((props) => ({
  text: props.text,
  styleContainer: { marginBottom: '5%' },
}))``;

export const WrapperKeyboard = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS == 'ios' ? 'padding' : 'height',
})`
  flex: 1;
`;

export const WrapperImage = styled.ImageBackground.attrs({
  source: require('../../../../assets/images/backgrounds/backgroundIcons.png'),
})`
  width: 95%;
  height: ${width <= 360 ? '30%' : '40%'};
  justify-content: center;
  align-items: center;
  margin-bottom: 10%;
`;

export const MailInput = styled(Input).attrs((props) => ({
  placeHolder: props.placeHolder,
  keyboardType: 'email-address',
}))`
  margin-bottom: 5%;
`;

export const DragToUpContainer = styled.View`
  height: 20%;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const ContainerInsideModal = styled.View`
  justify-content: space-evenly;
  align-items: center;
  height: ${(props) => `${height * 0.6}px`};
  width: 100%;
`;

export const ContainerScrolling = styled.View`
  width: ${`${width}px`};
  align-items: center;
  margin-right: 200px;
`;
