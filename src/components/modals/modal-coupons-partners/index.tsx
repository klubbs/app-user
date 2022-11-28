import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import * as Clipboard from 'expo-clipboard';
import { useAnimationState, MotiView } from 'moti';
import {
  Wrapper,
  Divider,
  Container,
  Code,
  Copy,
  ContainerPressable,
  ContainerCouponInformation,
  ShopSubtitleIcon,
  ContainerShop,
  ShopSubtitle,
} from './styles';
import { NotificationsFlash } from '../../../utils/flash-notifications';
import { Pressable, Dimensions } from 'react-native';
import { CouponAndOffersByInfluencerResponse, IModalCouponsPartnersRef } from './@types';
import { SpinnerLoading } from '../../components/spinner';
import { useNavigation } from '@react-navigation/native';
import { InfluencerContext } from '../../../contexts/influencer-context';

const { height } = Dimensions.get('window');

export const ModalCouponsPartners = React.forwardRef<IModalCouponsPartnersRef, {}>((props, ref) => {
  const { coupons, getAllCoupons } = useContext(InfluencerContext);

  const [activeCopy, setActiveCopy] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();
  const modalizeRef = useRef<Modalize>();

  useImperativeHandle(ref, () => ({ openModal }));

  const animationState = useAnimationState({
    from: { opacity: 1, scale: 1 },
    animate: { scale: 1.2, opacity: 0 },
  });

  async function openModal() {
    try {
      modalizeRef.current?.open();

      setLoading(true);

      await getAllCoupons();

      const tmp: any = {};

      coupons.forEach((element) => {
        tmp[element.coupon_id] = false;
      });

      setActiveCopy(tmp);
    } finally {
      setLoading(false);
    }
  }

  function onHandleCopy(code: string, id: string) {
    setActiveCopy({ ...activeCopy, [id]: true });

    animationState.transitionTo('animate');

    NotificationsFlash.customMessage('', 'Cupom copiado para área de transferência', 'NEUTRAL');

    Clipboard.setString(code);

    setTimeout(() => setActiveCopy({ ...activeCopy, [id]: false }), 1000);
  }

  function ItemRender(item: CouponAndOffersByInfluencerResponse): JSX.Element {
    return (
      <Container
        key={item.coupon_id}
        onPress={() => navigation.navigate('InfluencerRemoverOffer', { couponId: item.coupon_id })}
      >
        <ContainerCouponInformation>
          <Code>{item.coupon_code}</Code>
        </ContainerCouponInformation>
        <ContainerShop>
          <ShopSubtitle>{item.offers.length}</ShopSubtitle>
          <ShopSubtitleIcon />
        </ContainerShop>
        <ContainerPressable>
          <Pressable onPress={() => onHandleCopy(item.coupon_code, item.coupon_id)}>
            {!activeCopy[item.coupon_id] ? (
              <Copy />
            ) : (
              <MotiView
                key={item.coupon_id}
                state={animationState}
                onDidAnimate={() => animationState.transitionTo('from')}
                transition={{ duration: 150, type: 'timing' }}
              >
                <Copy />
              </MotiView>
            )}
          </Pressable>
        </ContainerPressable>
      </Container>
    );
  }

  return (
    <Modalize
      modalHeight={height * 0.8}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      ref={modalizeRef}
    >
      <Wrapper>
        <Divider />
        {loading && <SpinnerLoading />}
        {coupons.map(ItemRender)}
      </Wrapper>
    </Modalize>
  );
});
