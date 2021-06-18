import React from 'react';
import { View } from 'react-native';

import { Wrapper, CallUberText, CallUberQuestion } from './styles';

const ButtonUber: React.FC<{ onPress: any }> = (props: { onPress: any }) => {
  return (
    <Wrapper onPress={() => props.onPress()}>
      <CallUberQuestion>Quer ir agora?</CallUberQuestion>
      <CallUberText>Pedir Uber</CallUberText>
    </Wrapper>
  );
}

export default ButtonUber;
