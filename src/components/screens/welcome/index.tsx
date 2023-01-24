import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, useWindowDimensions, PanResponder, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { ButtonStyled, Description, Title } from './styles';
import { colors } from '../../../../assets/constants/colors';
import Button from '../../components/Button';

const SOURCE = [
  {
    id: 0,
    title: 'Use e ganhe !',
    desc: `Quanto mais você usar o seu aplicativo Klubbs,${'\n'} mais pontos você ganhará para trocar por descontos exclusivos ${'\n'}e experiências com nossos parceiros.`,
    source: require('../../../../assets/animations/coin_welcome.json'),
  },
  // { id: 1, source: require('../../../../assets/animations/tracker_location_welcome.json') },
  {
    id: 1,
    title: 'Notificações',
    desc: 'Enviaremos notificações para informar novidades, oportunidades e promoções.',
    source: require('../../../../assets/animations/notification_welcome.json'),
  },
];

export const Welcome: React.FC = () => {
  const { width, height } = useWindowDimensions();

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
            if (curr + 1 === SOURCE.length) return curr;

            return (curr + 1) % SOURCE.length;
          });
        }
        //move to left
        if (gestureState.dx > 20) {
          setCurrentIndex((curr) => {
            if (curr === 0) return curr;

            return (curr + 1) % SOURCE.length;
          });
        }
      },
    }),
  ).current;

  useEffect(() => {
    flatlistRef.current?.scrollToIndex({ index: currentIndex });
  }, [currentIndex]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={SOURCE}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.COLOR_SECUNDARY_BLACK,
        }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: width,
                height: height * 0.6,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              {...panResponder.panHandlers}
            >
              <View style={{ height: '100%', width: '100%' }}>
                <LottieView source={item.source} loop={true} autoPlay />
              </View>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
              {item.id === (1 || 2) && (
                <ButtonStyled text="Habilitar" onPress={() => console.log('1')} />
              )}
            </View>
          );
        }}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        initialScrollIndex={0}
        ref={flatlistRef}
      />
    </View>
  );
};
