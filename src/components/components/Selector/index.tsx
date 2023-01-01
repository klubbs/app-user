import React, { useEffect, useState } from 'react';
import * as Haptic from 'expo-haptics';
import { SelectionTouch } from './styles';
import { ISelectorProps } from './@types';


export const Selector: React.FC<ISelectorProps> = (props) => {

  const [selected, setSelected] = useState<boolean>(false)

  useEffect(() => {

    if (props.toggle === true) {
      Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light)
    }

  }, [props.toggle])

  function handlePress() {
    if (props.toggle !== undefined) {
      return;
    }

    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light)
    const newValue = !selected;

    setSelected(newValue);

    if (props.onPress) {
      props.onPress(newValue);
    }
  }

  return (
    <SelectionTouch onPress={handlePress} active={props.toggle ?? selected} style={props.style} />
  );
}