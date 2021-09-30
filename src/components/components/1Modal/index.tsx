import { Feather } from '@expo/vector-icons';
import React from 'react';
import { KeyboardAvoidingView, Modal } from 'react-native';
import COLORS from '../../../../assets/constants/colors';
import { BEHAVIOR_KEYBOARD } from '../../../utils/behaviorUtils';
import { IModalProps } from './@types';
import { Container, ContainerBlur, Header, Wrapper } from './styles';

export const ModalComponent: React.FC<IModalProps> = (props) => {

  return (
    <Modal animationType={"slide"} transparent={true} visible={props.visible} >
      <KeyboardAvoidingView
        behavior={BEHAVIOR_KEYBOARD}
        contentContainerStyle={{ flex: 1 }}
        style={{ flex: 1 }}
      >
        <Container>
          <Header>
            <Feather
              name={"x"}
              size={18}
              color={COLORS.COLOR_BLACK50}
              style={{ width: 50 }}
              onPress={props.onClose}
            />
          </Header>
          <Wrapper>
            {props.children}
          </Wrapper>
        </Container>
        {
          props.visible &&
          <ContainerBlur
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        }
      </KeyboardAvoidingView>

    </Modal >
  );
}
