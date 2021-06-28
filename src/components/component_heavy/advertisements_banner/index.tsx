import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import COLORS from '../../../../assets/constants/colors';
import { ContainerImage, Image } from './styles';



const WIDTH_DIMENSION = Dimensions.get('window').width

const AdvertisementsBanner: React.FC = () => {

  const [items, setItems] = useState([{ index: 1 }, { index: 2 }])

  const animatedStyle = (index: number, animatedValue: any, carouselProps: any) => {
    return {
      opacity: animatedValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0.5, 0.5, 1],
        extrapolate: 'extend'
      })
    }
  }

  const refSlider = useRef(null)

  return (
    <View>
      <Carousel
        ref={refSlider}
        data={items}
        slideInterpolatedStyle={animatedStyle}
        renderItem={(item, index) => {
          return (
            <ContainerImage >
              <Image source={{ uri: "https://i.pinimg.com/564x/43/e7/04/43e704a78d20ce2bd20eaca44f389868.jpg" }} />
            </ContainerImage>
          )
        }}
        autoplay={false}
        alwaysBounceHorizontal={true}
        sliderWidth={WIDTH_DIMENSION}
        itemWidth={WIDTH_DIMENSION / 1.2}
      />
      <Pagination
        dotsLength={2}
        activeDotIndex={1}
        dotStyle={styles.dotsStyle}
        inactiveDotStyle={{ backgroundColor: COLORS.COLOR_SECUNDARY_BLACK }}
        inactiveDotOpacity={0.2}
        inactiveDotScale={0.6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dotsStyle: {
    width: 5, height: 5, borderRadius: 2.5, marginHorizontal: 8, backgroundColor: COLORS.COLOR_SECUNDARY_BLACK, top: -15
  }
})

export default AdvertisementsBanner;
