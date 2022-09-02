import React from 'react';
import { Title, Wrapper } from './styles';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../../../assets/constants/colors';


export type IButtonProps = {
  text: string
  onPress: () => void
  styleContainer?: any
  textColor?: any
  featherIcon?: any
}

const Button: React.FC<IButtonProps> = ({ text, onPress, styleContainer, textColor, featherIcon }) => {
  return (
    <Wrapper onPress={onPress} style={{ ...styleContainer }} >
      <Title color={textColor}>{text}</Title>
      {featherIcon && <Feather name={featherIcon} size={16} color={textColor ?? colors.COLOR_WHITE} />}
    </Wrapper>
  );
}

export default Button;
