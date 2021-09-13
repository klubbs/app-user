import { BlurView } from 'expo-blur';
import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { Container, SpinnerLoading } from './styles';

const Spinner: React.FC<{ loading: boolean }> = (props) => {
  return (
    <Modal animationType={'none'} visible={props.loading} transparent={true}  >
      <Container>
        <SpinnerLoading />
        <BlurView tint="dark" intensity={60} style={StyleSheet.absoluteFill} />
      </Container>
    </Modal>
  );
}

export { Spinner, SpinnerLoading };
