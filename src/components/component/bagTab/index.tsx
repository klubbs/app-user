import React, { useState, ComponentProps } from 'react';
import { View } from 'react-native';

import { Container, Wrapper } from './styles';

function useLayout() {
  const [layout, setLayout] = useState({ height: 0 })

  const onLayout: ComponentProps<typeof View>['onLayout'] = ({ nativeEvent }) => {
    setLayout(nativeEvent.layout)
  }

  return [layout, onLayout] as const
}

export const BagTab: React.FC = () => {

  const [{ height }, onLayout] = useLayout()

  return (
    <Wrapper animate={{ height }}>
      <Container onLayout={onLayout} style={{ height: true ? 0 : '15%' }}>

      </Container>
    </Wrapper>
  );
}
