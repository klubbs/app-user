import { Feather } from '@expo/vector-icons';
import React from 'react';
import { KeyboardAvoidingView, Modal, TouchableOpacity } from 'react-native';
import { colors } from '../../../../assets/constants/colors';
import { IModalProps } from './@types';
import { Container, ContainerBlur, Header, Wrapper } from './styles';

export const ModalComponent: React.FC<IModalProps> = (props) => {

  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      hardwareAccelerated
      onRequestClose={() => props.onClose()}
      visible={props.visible}
    >
      <KeyboardAvoidingView
        behavior={'position'}
        contentContainerStyle={{ flex: 1 }}
        style={{ flex: 1 }}
      >
        <Container>
          <Header>
            <TouchableOpacity onPress={() => props.onClose()}>
              <Feather
                name={"x"}
                size={18}
                color={colors.COLOR_BLACK50}
                style={{ width: 50 }}
              />
            </TouchableOpacity>
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
