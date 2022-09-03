import React, { useState, useImperativeHandle, ForwardRefRenderFunction, forwardRef, useEffect } from 'react';
import * as Haptic from 'expo-haptics';
import { SelectionTouch } from './styles';
import { ISelectorProps } from './@types';

export const Selector: React.FC<ISelectorProps> = (props) => {

  const [selected, setSelected] = useState<boolean>(false)


  useEffect(() => {

    if (props.toggle !== undefined) {
      setSelected(props.toggle)
    }

  }, [props.toggle])

  function handlePress() {

    if (props.toggle !== undefined && selected) {
      return
    }

    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light)

    setSelected(!selected);

    props.onPress(!selected);

  }

  return (
    <SelectionTouch onPress={handlePress} active={selected} style={props.style} />
  );
}