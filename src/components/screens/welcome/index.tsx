import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, PanResponder } from 'react-native';
import LottieView from 'lottie-react-native';
import {
  ButtonStyled,
  ContainerFlat,
  Description,
  Title,
  WrapperLottie,
  stylesheetCustom,
} from './styles';
import { colors } from '../../../../assets/constants/colors';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import { Feather } from '@expo/vector-icons';

import { NotificationsFlash } from '../../../utils/flash-notifications';
import { AsyncStorageUtils } from '../../../utils/async-storage';

const SOURCE = [
  {
    id: 0,
    title: 'Use e ganhe !',
    desc: `Quanto mais você usar o seu aplicativo Klubbs,${'\n'} mais pontos você ganhará para trocar por descontos exclusivos ${'\n'}e experiências com nossos parceiros.`,
    source: require('../../../../assets/animations/coin_welcome.json'),
  },
  {
    id: 1,
    title: 'Localização',
    desc: `O Klubbs utiliza a sua localização${'\n'} para indicar os melhores estabelecimentos${'\n'} próximos à você.`,
    source: require('../../../../assets/animations/tracker_location.json'),
  },
  {
    id: 2,
    title: 'Notificações',
    desc: 'Enviaremos notificações para informar novidades, oportunidades e promoções.',
    source: require('../../../../assets/animations/notification_welcome.json'),
  },
];

export const Welcome: React.FC<{ hideScreen: () => void }> = ({ hideScreen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const icon = currentIndex == 0 ? 'chevrons-right' : currentIndex === 1 ? 'map-pin' : 'bell';

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
            if (curr === 0) {
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
            if (curr === 1) {
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
      setCurrentIndex(currentIndex + 1);
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
      await AsyncStorageUtils.setHasFirstInstall();
      hideScreen();
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
          const showButton = item.id === 2 || item.id === 1;
          const messageButton = item.id === 1 ? 'Permitir' : 'Vamos lá';

          return (
            <ContainerFlat {...panResponder.panHandlers}>
              <Feather
                name={icon}
                size={25}
                color={colors.COLOR_WHITE}
                style={stylesheetCustom.icon}
              />
              <WrapperLottie>
                <LottieView source={item.source} loop={true} autoPlay />
              </WrapperLottie>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
              {showButton && (
                <ButtonStyled
                  text={messageButton}
                  onPress={() => {
                    if (item.id === 1) {
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
