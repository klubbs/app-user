import React, { useEffect, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize'
import * as Clipboard from 'expo-clipboard';
import { useAnimationState, MotiView } from 'moti'
import { Wrapper, Divider, Container, Code, Copy } from './styles';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { Pressable } from 'react-native';

export const ModalInfluencerCoupons: React.FC<{ onClose: any, visible: boolean }> = (props) => {

  const modalizeRef = useRef<Modalize>()

  const animationState = useAnimationState({
    from: {
      opacity: 1,
      scale: 1,
    },
    animate: {
      scale: 1.2,
      opacity: 0,
    },
  })

  useEffect(() => {

    if (props.visible) {
      modalizeRef.current?.open();
    }

  }, [props.visible])



  function onHandleCopy() {

    animationState.transitionTo(trans => {
      if (trans === 'from')
        return 'animate'

      return 'from'
    })

    NotificationsFlash.CustomMessage('', 'Código copiado para área de transferência', 'NEUTRAL')
    Clipboard.default.setString('CALR')

    setTimeout(() => {
      animationState.transitionTo(trans => {
        if (trans === 'from')
          return 'animate'

        return 'from'
      })
    }, 200)
  }

  return (
    <Modalize
      onClose={props.onClose}
      modalHeight={600}
      ref={modalizeRef}
    >
      <Wrapper>
        <Divider />

        <Container>
          <Code>ADONISDODA</Code>
          <Pressable
            onPress={onHandleCopy}
          >
            <MotiView state={animationState} transition={{ duration: 200, type: 'timing' }}>
              <Copy onPress={onHandleCopy} />
            </MotiView>
          </Pressable>
        </Container>
      </Wrapper>

    </Modalize>
  );
}

