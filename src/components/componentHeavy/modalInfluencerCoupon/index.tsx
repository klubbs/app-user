import React, { useEffect, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize'
import * as Clipboard from 'expo-clipboard';
import { useAnimationState, MotiView } from 'moti'
import { Wrapper, Divider, Container, Code, Copy } from './styles';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { Pressable } from 'react-native';
import { IInfluencerCouponsResponse } from './@types';
import { InfluencerService } from '../../../services/influencer_service';

export const ModalInfluencerCoupons: React.FC<{ onClose: any, visible: boolean }> = (props) => {

  const [coupons, setCoupons] = useState<IInfluencerCouponsResponse[]>([])
  const [activeCopy, setActiveCopy] = useState<any>({})

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
    const response = await InfluencerService.getAllCouponsByInfluencer()

    let tmp: any = {}

    response.forEach(element => {
      tmp[element.coupon_id] = false
    });

    setActiveCopy(tmp)

    setCoupons(response)
  }

  function onHandleCopy(code: string, id: string) {

    setActiveCopy({ ...activeCopy, [id]: true })

    animationState.transitionTo('animate')

    NotificationsFlash.CustomMessage('', 'Cupom copiado para área de transferência', 'NEUTRAL')

    Clipboard.default.setString(code)

    setTimeout(() => setActiveCopy({ ...activeCopy, [id]: false }), 1000)
  }

  function ItemRender(item: IInfluencerCouponsResponse): JSX.Element {
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
              transition={{ duration: 200, type: 'timing' }}
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
      modalHeight={600}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      ref={modalizeRef}
    >
      <Wrapper>
        <Divider />
        {coupons.map(ItemRender)}
      </Wrapper>

    </Modalize>
  );
}

