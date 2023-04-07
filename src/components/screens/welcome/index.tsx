import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, PanResponder, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import {
  ButtonStyled,
  ContainerFlat,
  Description,
  Title,
  WrapperLottie,
  stylesheetCustom,
  Skip,
} from './styles';
import { NotificationsFlash } from '../../../utils/flash-notifications';
import { AsyncStorageUtils } from '../../../utils/async-storage';

const SOURCE = [
  {
    id: 0,
    title: 'Economize seu rico dinheirinho !',
    desc: `Resgate seus cupons de desconto nos melhores estabelecimentos da sua cidade.`,
    source: require('../../../../assets/animations/wellcome_coupon.json'),
  },
  {
    id: 1,
    title: 'Guarde ou use já!',
    desc: `Você pode resgatar o seu cupom de desconto ${'\n'} para usar na hora, ou guardar ${'\n'} na sua carteira Klubbs para utilizar no futuro.`,
    source: require('../../../../assets/animations/wellcome_coins.json'),
  },
  {
    id: 2,
    title: 'Simples e prático!',
    desc: `É só dizer que tem um cupom Klubbs,${'\n'} mostrar o QR-code para o atendente e pronto,${'\n'} seu desconto será aplicado !`,
    source: require('../../../../assets/animations/qr_code_welcome.json'),
  },
  {
    id: 3,
    title: 'Localização',
    desc: `O Klubbs utiliza a sua localização${'\n'} para indicar os melhores estabelecimentos${'\n'} próximos à você.`,
    source: require('../../../../assets/animations/tracker_location.json'),
  },
  {
    id: 4,
    title: 'Notificações',
    desc: 'Enviaremos notificações para informar novidades, oportunidades e promoções.',
    source: require('../../../../assets/animations/pulse_welcome.json'),
  },
];

export const Welcome: React.FC<{ hideScreen: () => void }> = ({ hideScreen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatlistRef = useRef<FlatList>(null);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dx > -10;
      },
      onPanResponderRelease: (evt, gestureState) => {
        //move to right
        if (gestureState.dx < -20) {
          setCurrentIndex((curr) => {
            if (curr < 4) {
              if (curr + 1 === SOURCE.length) return curr;

              return (curr + 1) % SOURCE.length;
            } else {
              return curr;
            }
          });
        }
        //move to left
        if (gestureState.dx > 20) {
          setCurrentIndex((curr) => {
            if (curr > 0) {
              return (curr - 1) % SOURCE.length;
            } else {
              return curr;
            }
          });
        }
      },
    }),
  ).current;

  useEffect(() => {
    flatlistRef.current?.scrollToIndex({ index: currentIndex });
  }, [currentIndex]);

  function nextScreen() {
    setCurrentIndex(currentIndex + 1);
  }

  async function createWasInstalled() {
    await AsyncStorageUtils.setHasFirstInstall();
    hideScreen();
  }

  async function handleEnableLocation() {
    const { status: existingStatus } = await Location.requestForegroundPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      NotificationsFlash.customMessage(
        'Precisamos que nos habilite',
        'Iremos te redirecionar as configurações',
        'NEUTRAL',
      );
      setTimeout(() => {
        Linking.openSettings();
      }, 3000);
      return;
    } else {
      nextScreen();
    }
  }

  async function handleEnableNotification() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      NotificationsFlash.customMessage(
        'Precisamos que nos habilite',
        'Iremos te redirecionar as configurações',
        'NEUTRAL',
      );

      setTimeout(() => {
        Linking.openSettings();
      }, 3000);
      return;
    } else {
      await createWasInstalled();
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={SOURCE}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={stylesheetCustom.flatlist}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        initialScrollIndex={0}
        ref={flatlistRef}
        renderItem={({ item }) => {
          const showButton = item.id === 3 || item.id === 4;
          const messageButton = item.id === 3 ? 'Permitir' : 'Vamos lá';

          return (
            <ContainerFlat {...panResponder.panHandlers}>
              <View style={stylesheetCustom.skip}>
                {item.id >= 3 && (
                  <TouchableOpacity onPress={createWasInstalled}>
                    <Skip>Pular tudo</Skip>
                  </TouchableOpacity>
                )}
                {item.id < 3 && (
                  <TouchableOpacity onPress={nextScreen}>
                    <Skip>Próximo</Skip>
                  </TouchableOpacity>
                )}
              </View>
              <WrapperLottie>
                {item.id === 0 && (
                  <LottieView
                    source={require('../../../../assets/animations/congratulations_coupons.json')}
                    loop={true}
                    autoPlay
                  />
                )}
                <LottieView source={item.source} loop={true} autoPlay cacheStrategy="strong" />
              </WrapperLottie>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
              {showButton && (
                <ButtonStyled
                  text={messageButton}
                  onPress={() => {
                    if (item.id === 3) {
                      handleEnableLocation();
                    } else {
                      handleEnableNotification();
                    }
                  }}
                />
              )}
            </ContainerFlat>
          );
        }}
      />
    </View>
  );
};
