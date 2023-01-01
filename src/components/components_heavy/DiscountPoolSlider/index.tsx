import React, { useContext, useEffect } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { PoolCoupon50Image } from '../../../../assets/images/coupons/poolCoupon50Image';
import { PoolCoupon30Image } from '../../../../assets/images/coupons/poolCoupon30Image';
import { PoolCoupon3050Image } from '../../../../assets/images/coupons/poolCoupon3050Image';
import { Title, TouchableDiscountImage, Container, Subtitle } from './styles';
import { useNavigation } from '@react-navigation/native';
import { HomeContext } from '../../../contexts/home-context';

const IMAGE_POOL = [
  { id: 'HIGH', Item: PoolCoupon50Image },
  { id: 'MEDIUM', Item: PoolCoupon3050Image },
  { id: 'LOW', Item: PoolCoupon30Image },
];

const SPACING = 10;
const SNAP = Dimensions.get('screen').width * 0.8 + SPACING * 5;

const DiscountPoolSlider: React.FC = () => {
  const { getKlubbsOffersAsync } = useContext(HomeContext);
  const navigation = useNavigation();

  useEffect(() => {
    getKlubbsOffersAsync();
  }, []);

  return (
    <Container>
      <Title>Descontos</Title>
      <Subtitle>Uma combinação das nossas melhores ofertas</Subtitle>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        snapToInterval={SNAP}
        decelerationRate={'fast'}
      >
        {IMAGE_POOL.map(({ id, Item }, index) => {
          return (
            <TouchableDiscountImage
              key={index}
              onPress={() => navigation.navigate('OfferPools', { type: id })}
            >
              <Item
                style={{
                  marginHorizontal: SPACING,
                  shadowOpacity: 0.1,
                  shadowOffset: { width: 0, height: 1 },
                  shadowRadius: 1,
                }}
              />
            </TouchableDiscountImage>
          );
        })}
      </ScrollView>
    </Container>
  );
};

export { DiscountPoolSlider };
