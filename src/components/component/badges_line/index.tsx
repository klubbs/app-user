import React from 'react';
import COLORS from '../../../../assets/constants/colors';

import { StatusBox, StatusText } from './styles';

interface BadgesLineProps {
  color: string,
  text: string
}

const BadgesLine: React.FC<BadgesLineProps> = (props) => {
  return (
    <StatusBox color={props.color}>
      <StatusText color={props.color}>{props.text}</StatusText>
    </StatusBox>
  );
}

export default BadgesLine;
