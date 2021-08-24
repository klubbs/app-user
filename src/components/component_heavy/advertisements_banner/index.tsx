import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { CarouselBanner, ContainerImage, Image, Paginate } from './styles';


const AdvertisementsBanner: React.FC = () => {

  const refSlider = useRef(null)

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

  return (
    <View>
      <CarouselBanner
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
      />
      <Paginate />
    </View>
  );
}

export default AdvertisementsBanner;
