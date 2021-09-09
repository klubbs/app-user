import React, { useState, useImperativeHandle, ForwardRefRenderFunction, forwardRef, useEffect } from 'react';
import * as Haptic from 'expo-haptics';
import { SelectionTouch } from './styles';
import { ISelectorProps, ISelectorRefs } from './@types';

export const SelectorForwardRef: ForwardRefRenderFunction<ISelectorRefs, ISelectorProps> = (props, ref) => {

  const [selected, setSelected] = useState<boolean>(false)

  useImperativeHandle(ref, () => ({
    disabledSelect: () => setSelected(false),
  }));

  useEffect(() => {

    if (props.toggle !== undefined) {

      if (props.toggle)
        setSelected(true)
      else
        setSelected(false)

    }

  }, [props.toggle])

  function handlePress() {

    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light)

    setSelected(!selected);

    props.onPress(!selected);

  }

  return (
    <SelectionTouch onPress={handlePress} active={selected} style={props.style} />
  );
}

const Selector = forwardRef(SelectorForwardRef)

export { Selector }
