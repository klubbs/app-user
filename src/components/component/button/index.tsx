import React from 'react';
import { Title, Wrapper } from './styles';


export type IButtonProps = {
  text: string
  onPress: () => void
  styleContainer?: any
  textColor?: any
}

const Button: React.FC<IButtonProps> = ({ text, onPress, styleContainer, textColor }) => {
  return (
    <Wrapper onPress={onPress} style={{ ...styleContainer }} >
      <Title color={textColor}>{text}</Title>
    </Wrapper>
  );
}

export default Button;
