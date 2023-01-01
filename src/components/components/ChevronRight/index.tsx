import React from 'react';
import { Container, Icon } from './styles';

export const ChevronIcon: React.FC<{ right?: boolean; light?: boolean }> = ({
  right = true,
  light,
}) => {
  return (
    <Container>
      <Icon right={right} light={light} />
    </Container>
  );
};
