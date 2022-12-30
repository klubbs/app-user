import React, { useEffect, ReactElement, useState, useImperativeHandle } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { Coupon } from '../../components/Coupon';
import { format4TwoColumns } from '../../../utils/formatersUtils';
import {
  ICouponInfluencer,
  IModalLinkCouponOffersRef,
  IModalLinkCouponOffersProps,
} from './@types';
import {
  InfluencerService,
  InfluencerServiceException,
} from '../../../services/influencer-service';
import { Spinner } from '../../components/Spinner';
import { IError } from '../../../settings/@types/@responses';
import { NotificationsFlash } from '../../../utils/flash-notifications';
import { useNavigation } from '@react-navigation/native';
import {
  Wrapper,
  Header,
  BottomTab,
  Empty,
  Container,
  SelectorCoupon,
  ConfirmButton,
  FlatItems,
  Cancel,
  HeaderContainer,
} from './styles';
import { IWalletCouponsResponseOfferData } from '../../../services/@types/@coupon-services';

export const ModalLinkOfferCoupon = React.forwardRef<
  IModalLinkCouponOffersRef,
  IModalLinkCouponOffersProps
>((props, ref) => {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [coupons, setCoupons] = useState<ICouponInfluencer[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState('');
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({ showModal: () => setVisible(true) }));

  useEffect(() => {
    (async function getAllInfluencerCoupons() {
      try {
        const response = await InfluencerService.getAllCouponsByInfluencer();

        setCoupons(response);
      } catch (error) {
        NotificationsFlash.spillCoffee();
      }
    })();
  }, []);

  async function handleCouponLink() {
    if (props.masterCoupons?.length <= 0) {
      return;
    }

    try {
      setLoading(true);

      await InfluencerService.linkCouponInOffers(
        props.masterCoupons.map((i) => i.masterCouponId),
        selectedCoupon,
      );

      NotificationsFlash.customMessage(
        'Adicionado',
        'Oferta dos estabelecimentos adicionado ao cupom',
        'SUCCESS',
      );

      setVisible(false);

      navigation.goBack();
    } catch (error) {
      InfluencerServiceException.catchLinkCoupon(error as IError);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectCoupon(coupon: ICouponInfluencer) {
    setSelectedCoupon(coupon.coupon_id);
  }

  function RenderCoupon({ item, _ }: { item: ICouponInfluencer; index: number }): ReactElement {
    const isToggleSelected = selectedCoupon === item.coupon_id;

    return (
      <>
        {item?.empty && <Empty />}
        {!item?.empty && (
          <Container>
            <SelectorCoupon toggle={isToggleSelected} />
            <Coupon
              toggle={true}
              isActiveByToggle={isToggleSelected}
              onPress={() => handleSelectCoupon(item)}
              data={{
                wallet_id: '##NULL##',
                coupon_id: item.coupon_id,
                coupon_code: item.coupon_code,
                partner_image: '', //TODO Adicionar imagem do influencer aqui
                offers: item.offers as unknown as IWalletCouponsResponseOfferData[],
              }}
            />
          </Container>
        )}
      </>
    );
  }

  return (
    <Modal animationType={'slide'} presentationStyle={'formSheet'} visible={visible}>
      <Wrapper>
        <HeaderContainer>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <Cancel>Cancelar</Cancel>
          </TouchableWithoutFeedback>
          <Header>Selecione seu cupom</Header>
        </HeaderContainer>
        <FlatItems
          data={format4TwoColumns(coupons, 2)}
          keyExtractor={(item: any) => item.coupon_id}
          renderItem={({ item, index }: any) =>
            RenderCoupon({ item: item as ICouponInfluencer, index: index })
          }
        />

        <BottomTab disabled={selectedCoupon === ''}>
          {selectedCoupon !== '' && <ConfirmButton onPress={handleCouponLink} />}
        </BottomTab>
      </Wrapper>
      <Spinner loading={loading} />
    </Modal>
  );
});
