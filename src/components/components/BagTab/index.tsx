import React from 'react';
import { TouchableOpacity } from 'react-native'
import { useLayout } from '../../../utils/hooks/layoutHooks'

import { Container, Wrapper } from './styles';

export const BagTab: React.FC<{ show: boolean, onPress: () => void }> = (props) => {

  const [{ height }, onLayout] = useLayout()

  return (
    <Wrapper
      animate={{ height }}
    >
      <TouchableOpacity onPress={props.onPress} activeOpacity={0.8}>
        <Container onLayout={onLayout} style={{ height: props.show ? 100 : 0 }}>
          {props.children}
        </Container>
      </TouchableOpacity>

    </Wrapper >
  );
}
