import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Animated, KeyboardAvoidingView, Modal, Platform } from 'react-native';
import COLORS from '../../../../assets/constants/colors';
import { IModalProps } from './interfaces';
import { Container, ContainerBlur, Header, Wrapper } from './styles';


const ModalComponent: React.FC<IModalProps> = (props) => {

  const [animation] = useState(new Animated.Value(0))

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
        showAnimation()
      } else {
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
        <ContainerBlur style={{
          backgroundColor: animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["transparent", "rgba(0,0,0,0.2)"]
          })
        }} />
      </KeyboardAvoidingView>

    </Modal>
  );
}

export default ModalComponent;
