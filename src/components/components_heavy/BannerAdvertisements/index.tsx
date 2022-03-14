import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { CarouselBanner, ContainerImage, Image, Paginate } from './styles';


const AdvertisementsBanner: React.FC = () => {

  const refSlider = useRef(null)

  const [items, setItems] = useState([{ index: 1 }])

  const animatedStyle = (index: number, animatedValue: any, carouselProps: any) => {
    return {
      opacity: animatedValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0.5, 0.5, 1],
        extrapolate: 'extend'
      })
    }
  }

  return (
    <View>
      <CarouselBanner
        ref={refSlider}
        data={items}
        slideInterpolatedStyle={animatedStyle}
        renderItem={(item, index) => {
          return (
            <ContainerImage >
              <Image source={require('../../../../assets/images/freeCoupons.png')} />
            </ContainerImage>
          )
        }}
      />
      <Paginate />
    </View>
  );
}

export default AdvertisementsBanner;
