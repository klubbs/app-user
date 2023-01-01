import React from 'react';
import { Container, Off } from './styles';

const OFF: React.FC<{ off: number }> = (props) => {
  return (
    <Container>
      <Off>{props.off}%</Off>
    </Container>
  );
};

export default OFF;
