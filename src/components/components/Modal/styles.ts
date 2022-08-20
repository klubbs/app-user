import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import { MotiView } from 'moti'

export const Wrapper = styled.View`
  flex: 8;
`

export const Container = styled.View`
  position: absolute;
  height: 60%;
  width: 100%;
  border-radius:5px;
  bottom:0;
  z-index: 10;
  elevation: 10;
  background-color:${colors.COLOR_WHITE};
`;


export const Header = styled.View`
  flex-direction:row;
  align-items: center;
  flex:0.45;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.COLOR_BLACK10};
  padding: 12px;
`;

export const ContainerBlur = styled(MotiView)`
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
    background-color: ${colors.COLOR_BLACK40};
`
