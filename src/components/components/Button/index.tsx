import React from 'react';
import { Title, Wrapper } from './styles';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../../../assets/constants/colors';

export type IButtonProps = {
  text: string;
  onPress: () => void;
  styleContainer?: any;
  textColor?: any;
  featherIcon?: any;
  disabled?: boolean;
};

const Button: React.FC<IButtonProps> = ({
  text,
  onPress,
  styleContainer,
  textColor,
  featherIcon,
  disabled,
}) => {
  return (
    <Wrapper disabled={disabled} onPress={onPress} style={{ ...styleContainer }}>
      <Title disabled={disabled} color={textColor}>
        {text}
      </Title>
      {featherIcon && (
        <Feather
          name={featherIcon}
          size={16}
          color={textColor ?? colors.COLOR_WHITE}
          style={{ left: 10 }}
        />
      )}
    </Wrapper>
  );
};

export default Button;
