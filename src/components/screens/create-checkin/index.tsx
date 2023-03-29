import React, { useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { IWalletCouponsResponseOfferData } from '../../../services/@types/@coupon-services';
import { CheckoutExceptions, CheckoutService } from '../../../services/checkout-service';
import { CreateCheckinScreenProps } from '../../../settings/@types/@app-stack';
import Button from '../../components/Button';
import OFF from '../../components/OFF';
import { Selector } from '../../components/Selector';
import { Spinner } from '../../components/Spinner';
import {
  Subtitle,
  Wrapper,
  ContainerTop,
  ContainerBottom,
  RSMoney,
  UserAmount,
  SubtitleMoney,
  WrapperOffer,
  WrapperOfferContainer,
  FlatListOffers,
  StoreImage,
  StoreName,
  StoreTicket,
} from './styles';
import { IError } from '../../../settings/@types/@responses';
import { CheckoutContext } from '../../../contexts/checkout-context';
import { NotificationsFlash } from '../../../utils/flash-notifications';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from '../../../utils/formatersUtils';

export const CreateCheckin: React.FC<CreateCheckinScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const { setCheckoutStatus } = useContext(CheckoutContext);

  const [selectedOfferId, setSelectedOfferId] = useState<string>('');
  const [userAmount, setUserAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const disabledButton =
    userAmount.trim() === '' ||
    selectedOfferId === '' ||
    Number(userAmount) <
      route.params.offers.find((i) => i.offer_id === selectedOfferId).offer_ticket;

  useEffect(() => {
    if (route.params.offers?.length === 1) {
      setSelectedOfferId(route.params.offers[0].offer_id);
    }
  }, []);

  async function handleCheckin() {
    if (userAmount.trim() === '' || selectedOfferId === '') {
      return;
    }

    try {
      setLoading(true);

      const location = await Location.getCurrentPositionAsync({
        accuracy: LocationAccuracy.Balanced,
      });

      const checkinId = await CheckoutService.createCheckin(
        Number(userAmount.split('.').join('').split(',').join('')),
        selectedOfferId,
        route.params.coupon_id,
        location.coords.latitude,
        location.coords.longitude,
      );

      setCheckoutStatus({ checkoutId: checkinId, isCheckinStatus: true });

      NotificationsFlash.customMessage(
        'Checkin concluído',
        'Agora é só apresentar o QR Code ',
        'SUCCESS',
      );

      if (route.params.flux === 'KLUBBS_FLUX') {
        navigation.navigate('CouponQr', {
          partner_image: route.params.partner_image,
          coupon_code: route.params.coupon_code,
        });
        return;
      }

      navigation.goBack();
    } catch (error) {
      CheckoutExceptions.handleCreateCheckin(error as IError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wrapper>
      <Spinner loading={loading} />
      <Subtitle>Informe o valor total do pedido e a oferta</Subtitle>

      <ContainerTop>
        <RSMoney>R$</RSMoney>
        <UserAmount value={userAmount} onChangeText={(e: string) => setUserAmount(e.toString())} />
        <SubtitleMoney>Valor total do pedido (Pode ser arredondado)</SubtitleMoney>
      </ContainerTop>
      <ContainerBottom>
        <FlatListOffers
          data={route.params.offers}
          keyExtractor={(item: IWalletCouponsResponseOfferData) => `${item.offer_id}`}
          renderItem={({ item }: { item: IWalletCouponsResponseOfferData }) => {
            return (
              <WrapperOffer onPress={() => setSelectedOfferId(item.offer_id)}>
                <Selector toggle={selectedOfferId == item.offer_id} />
                <StoreImage
                  source={{
                    uri: `https://klubbs-establishment.s3.amazonaws.com/${item.store_image}`,
                  }}
                />
                <WrapperOfferContainer>
                  <StoreName>{item.store_name}</StoreName>
                  <OFF off={item.offer_percentage} />
                  <StoreTicket> {formatCurrency(item.offer_ticket)}</StoreTicket>
                </WrapperOfferContainer>
              </WrapperOffer>
            );
          }}
        />

        <Button disabled={disabledButton} text="Concluir" onPress={handleCheckin} />
      </ContainerBottom>
    </Wrapper>
  );
};
