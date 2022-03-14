import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize'
import * as Clipboard from 'expo-clipboard';
import { useAnimationState, MotiView } from 'moti'
import {
  Wrapper, Divider, Container, Code, Copy, ContainerPressable, ContainerCouponInformation, ShopSubtitleIcon,
  ContainerShop, ShopSubtitle
} from './styles';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { Pressable, Dimensions } from 'react-native';
import { GetAllCouponsByInfluencerResponse, IModalCouponsInfluencerRef } from './@types';
import { SpinnerLoading } from '../../components/Spinner';
import { useNavigation } from '@react-navigation/native';
import { InfluencerContext } from '../../../contexts/influencerContext';

const { height } = Dimensions.get('window');

export const CouponsInfluencerModal = React.forwardRef<IModalCouponsInfluencerRef, {}>((props, ref) => {

  const { coupons, getAllCoupons } = useContext(InfluencerContext)

  const [activeCopy, setActiveCopy] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)

  const navigation = useNavigation()
  const modalizeRef = useRef<Modalize>()

  useImperativeHandle(ref, () => ({ openModal }));


  const animationState = useAnimationState({
    from: { opacity: 1, scale: 1 },
    animate: { scale: 1.2, opacity: 0 },
  })

  async function openModal() {

    try {

      modalizeRef.current?.open();

      setLoading(true)

      await getAllCoupons()

      let tmp: any = {}

      coupons.forEach(element => {
        tmp[element.coupon_id] = false
      });

      setActiveCopy(tmp)
    } finally {
      setLoading(false)
    }

  }

  function onHandleCopy(code: string, id: string) {

    setActiveCopy({ ...activeCopy, [id]: true })

    animationState.transitionTo('animate')

    NotificationsFlash.customMessage('', 'Cupom copiado para área de transferência', 'NEUTRAL')

    Clipboard.setString(code)

    setTimeout(() => setActiveCopy({ ...activeCopy, [id]: false }), 1000)
  }

  function ItemRender(item: GetAllCouponsByInfluencerResponse): JSX.Element {

    const couponId = item.coupon_id

    return (
      <Container
        key={couponId}
        onPress={() => navigation.navigate('RemoveOfferInfluencer', { couponId: couponId })}
      >
        <ContainerCouponInformation>
          <Code>{item.coupon_code}</Code>
        </ContainerCouponInformation>
        <ContainerShop>
          <ShopSubtitle>{item.master_coupons.length}</ShopSubtitle>
          <ShopSubtitleIcon />
        </ContainerShop>
        <ContainerPressable>
          <Pressable onPress={() => onHandleCopy(item.coupon_code, couponId)}>
            {
              !activeCopy[couponId]
                ? <Copy />
                : <MotiView key={couponId} state={animationState}
                  onDidAnimate={() => animationState.transitionTo('from')}
                  transition={{ duration: 150, type: 'timing' }}
                >
                  <Copy />
                </MotiView>
            }
          </Pressable>
        </ContainerPressable>
      </Container>
    )
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
})
