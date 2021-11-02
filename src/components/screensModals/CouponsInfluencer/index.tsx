import React, { useEffect, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize'
import * as Clipboard from 'expo-clipboard';
import { useAnimationState, MotiView } from 'moti'
import { Wrapper, Divider, Container, Code, Copy } from './styles';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { Pressable, Dimensions } from 'react-native';
import { GetAllCouponsByInfluencerResponse } from './@types';
import { InfluencerService } from '../../../services/influencerService';
import { SpinnerLoading } from '../../components/Spinner';

const { height } = Dimensions.get('window');

export const CouponsInfluencer: React.FC<{ onClose: any, visible: boolean }> = (props) => {

  const [coupons, setCoupons] = useState<GetAllCouponsByInfluencerResponse[]>([])
  const [activeCopy, setActiveCopy] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)

  const modalizeRef = useRef<Modalize>()

  const animationState = useAnimationState({
    from: {
      opacity: 1,
      scale: 1,
    },
    animate: {
      scale: 1.2,
      opacity: 0,
    },
  })

  useEffect(() => {

    if (props.visible) {

      getAllCouponsAsync();

      modalizeRef.current?.open();
    }

  }, [props.visible])

  async function getAllCouponsAsync(): Promise<void> {

    setLoading(true)

    const response = await InfluencerService.getAllCouponsByInfluencer()
    let tmp: any = {}
    response.forEach(element => {
      tmp[element.coupon_id] = false
    });

    setActiveCopy(tmp)
    setCoupons(response)
    setLoading(false)
  }

  function onHandleCopy(code: string, id: string) {

    setActiveCopy({ ...activeCopy, [id]: true })

    animationState.transitionTo('animate')

    NotificationsFlash.CustomMessage('', 'Cupom copiado para área de transferência', 'NEUTRAL')

    Clipboard.setString(code)

    setTimeout(() => setActiveCopy({ ...activeCopy, [id]: false }), 1000)
  }

  function ItemRender(item: GetAllCouponsByInfluencerResponse): JSX.Element {
    return (
      <Container key={item.coupon_id}>
        <Code>{item.coupon_code}</Code>
        <Pressable onPress={() => onHandleCopy(item.coupon_code, item.coupon_id)}>
          {
            activeCopy[item.coupon_id] &&
            <MotiView
              key={item.coupon_id}
              state={animationState}
              onDidAnimate={() => animationState.transitionTo('from')}
              transition={{ duration: 150, type: 'timing' }}
            >
              <Copy />
            </MotiView>
          }

          {
            !activeCopy[item.coupon_id] && <Copy />
          }
        </Pressable>
      </Container>
    )
  }

  return (
    <Modalize
      onClose={props.onClose}
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
}

