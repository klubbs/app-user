import { Animated } from 'react-native';
import styled from 'styled-components';
import COLORS from '../../../../assets/constants/colors';

export const Wrapper = styled.View`
  flex: 8;
`

export const Container = styled.View`
  position: absolute;
  height: 50%;
  width: 100%;
  border-radius:5px;
  bottom:0;
  z-index: 10px;
  elevation: 10px;
  background-color:${COLORS.COLOR_WHITE};
`;


export const Header = styled.View`
  flex-direction:row;
  align-items: center;
  flex:0.45;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.COLOR_BLACK10};
  padding: 12px;
`;

export const ContainerBlur = Animated.createAnimatedComponent(
  styled.View`
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
  `
)
