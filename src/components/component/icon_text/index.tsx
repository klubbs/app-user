import React from 'react';

import { Feather } from '@expo/vector-icons';
import Colors from '../../../../assets/constants/colors';

import { Wrapper, Description } from './styles';


interface IconTextProps {
  color: string,
  description: string
  icon: any
}

const Icon_text: React.FC<IconTextProps> = (props) => {
  return (
    <Wrapper>
      <Feather name={props.icon} size={14} color={props.color} />
      <Description>{props.description}</Description>
    </Wrapper>
  );
}

export default Icon_text;
