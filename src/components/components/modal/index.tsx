import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState, useRef } from 'react';
import { Animated, KeyboardAvoidingView, Modal, Platform } from 'react-native';
import COLORS from '../../../../assets/constants/colors';
import { IModalProps } from './@types';
import { Container, ContainerBlur, Header, Wrapper } from './styles';


export const ModalComponent: React.FC<IModalProps> = (props) => {

  const [animation] = useState(new Animated.Value(0))

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    const showAnimation = () => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
      }).start()
    }

    const hideAnimation = () => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1,
        useNativeDriver: false
      }).start()
    }

    if (props.visible !== undefined) {
      if (props.visible === true) {

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }).start();

        showAnimation()
      } else {

        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1,
          useNativeDriver: true
        }).start();

        hideAnimation()
      }
    }

  }, [props.visible])

  return (
    <Modal animationType={"slide"} transparent={true} visible={props.visible}>


      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'position' : 'height'} contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }}>

        <Container>
          <Header>
            <Feather name={"x"} size={18} color={COLORS.COLOR_BLACK50} style={{ width: 50 }} onPress={props.onClose} />
          </Header>
          <Wrapper>
            {props.children}
          </Wrapper>
        </Container>
        <ContainerBlur style={{ opacity: fadeAnim }} />
      </KeyboardAvoidingView>

    </Modal>
  );
}
