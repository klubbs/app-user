import React from 'react';
import { Title, Wrapper } from './styles';


// export type IButtonProps = TouchableOpacityProps & {
//   text: string
// }
export type IButtonProps = {
  text: string
  onPress: any
  styleContainer?: any
}

const Button: React.FC<IButtonProps> = ({ text, onPress, styleContainer }) => {
  return (
    <Wrapper onPress={onPress} style={{ ...styleContainer }} >
      <Title>{text}</Title>
    </Wrapper>
  );
}

export default Button;
