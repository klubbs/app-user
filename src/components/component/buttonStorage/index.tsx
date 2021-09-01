import React from 'react';
import { View } from 'react-native';
import colors from '../../../../assets/constants/colors';
import { BoxIcon } from '../../../../assets/icons/box_icon';

import { Wrapper } from './styles';

export const ButtonStorage: React.FC<{ onPress: any, size?: number }> = (props) => {
  return (
    <Wrapper onPress={props.onPress} size={props.size}>
      <BoxIcon fill={colors.COLOR_YELLOW_BUTTON_TEXT} width={props.size ?? 22} height={props.size ?? 22} />
    </Wrapper >
  );
}
