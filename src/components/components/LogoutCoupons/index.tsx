import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React from 'react';
import Gift from '../../../../assets/animations/present.json';
import {
  SignInButton,
  UnregisterBoxText,
  UnregisterUser,
  UnregisterUserDesc,
  Wrapper,
  WrapperLottie,
} from './styles';

export const CouponsEmpty: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Wrapper>
      <UnregisterBoxText>
        <UnregisterUser>Quase lá</UnregisterUser>
        <UnregisterUserDesc>Entre para ter acesso ao seus cupons!</UnregisterUserDesc>
      </UnregisterBoxText>
      <WrapperLottie>
        <LottieView source={Gift} loop={true} autoPlay />
      </WrapperLottie>
      <SignInButton onPress={() => navigation.navigate('LoginWelcome')} />
    </Wrapper>
  );
};
