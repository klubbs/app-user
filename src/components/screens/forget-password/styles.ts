import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { colors } from '../../../../assets/constants/colors';
import Button from '../../components/Button';
import InputWithoutIcon from '../../components/Input';
import { MotiView } from 'moti'

const { width } = Dimensions.get('window')

export const Wrapper = styled.SafeAreaView`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    background-color: ${colors.COLOR_SECUNDARY_BLACK};
`

export const Input = styled.Text`
    width: 60px;
    height: 60px;
    line-height: 60px;
    font-size: 15px;
    font-family:'Nunito_Bold';
    color: ${colors.COLOR_WHITE};
    text-align: center;
    margin:0 5px;
    margin-top:50px;
    margin-bottom: 50px;
    background-color: ${colors.COLOR_WHITE_80};
`

export const Subtitle = styled.Text`
  color:${colors.COLOR_WHITE_80};
  margin-top:120px;
  font-size:16px;
  font-family:'Nunito_Light';
`

export const Email = styled.Text`
  color:${colors.COLOR_YELLOW};
  font-size:16px;
  font-family:'Nunito_Light';
`

export const ConfirmButton = styled(Button).attrs((props: { text: string }) => ({
  text: props.text,
  styleContainer: { width: '90%', height: 60 }
}))`
`

export const Password = styled(InputWithoutIcon).attrs(({
  placeholder: 'Nova senha',
  keyboardType: 'default',
  secureTextEntry: true
}))`
    width:80%;
    height:60px;
	 margin-top: 15%;
    margin-bottom: 15%;
`

export const ContainerAnimated = styled(MotiView).attrs(({
  from: { opacity: 0, right: -100 },
  animate: { opacity: 1, right: 0 }
}))`
	justify-content: center;
	align-items: center;
	width: ${width};
`
