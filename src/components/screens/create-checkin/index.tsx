import React, { useContext, useState } from 'react';
import * as Location from 'expo-location';
import { LocationAccuracy, LocationObject } from 'expo-location';
import { Platform } from 'react-native';
import { IWalletCouponsResponseOfferData } from '../../../services/@types/@coupon-services';
import { CheckoutExceptions, CheckoutService } from '../../../services/checkout-service';
import { CreateCheckinScreenProps } from '../../../settings/@types/@app-stack';
import Button from '../../components/Button';
import OFF from '../../components/OFF';
import { Selector } from '../../components/selector';
import { Spinner } from '../../components/spinner';
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
    StoreTicket
} from './styles';
import { IError } from '../../../settings/@types/@responses';
import { CheckoutContext } from '../../../contexts/checkout-context';
import { NotificationsFlash } from '../../../utils/flash-notifications';
import { useNavigation } from '@react-navigation/native';

export const CreateCheckin: React.FC<CreateCheckinScreenProps> = ({ route }) => {

    const navigation = useNavigation();

    const { setCheckoutStatus } = useContext(CheckoutContext)

    const [selectedOfferId, setSelectedOfferId] = useState<string>('')
    const [userAmount, setUserAmount] = useState<string>('')
    const [loading, setLoading] = useState(false)

    const disabledButton = userAmount.trim() === '' || selectedOfferId === '';

    async function handleCheckin() {

        if (userAmount.trim() === '' || selectedOfferId === '') {
            return;
        }

        try {
            setLoading(true)

            const location = await Location.getCurrentPositionAsync({ accuracy: LocationAccuracy.Balanced });

            const checkinId = await CheckoutService.createCheckin(
                Number(userAmount),
                selectedOfferId,
                route.params.coupon_id,
                location.coords.latitude,
                location.coords.longitude
            );

            setCheckoutStatus({ checkoutId: checkinId, isCheckinStatus: true })

            NotificationsFlash.customMessage('Checkin concluído', 'Agora é só apresentar o QR Code ', 'SUCCESS')

            navigation.goBack();
        }
        catch (error) {
            CheckoutExceptions.handleCreateCheckin(error as IError)
        }
        finally {
            setLoading(false)
        }

    }

    function RenderOffer({ item }: { item: IWalletCouponsResponseOfferData }) {

        return (
            <WrapperOffer onPress={() => setSelectedOfferId(item.offer_id)}>
                <Selector toggle={selectedOfferId == item.offer_id} />
                <StoreImage />
                <WrapperOfferContainer>
                    <StoreName>{item.store_name}</StoreName>
                    <OFF off={item.offer_percentage} />
                    <StoreTicket>
                        {
                            Platform.select({
                                ios: item
                                    .offer_ticket
                                    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
                                android: `R$ ${item.offer_ticket}`
                            })
                        }
                    </StoreTicket>
                </WrapperOfferContainer>
            </WrapperOffer>
        )
    }

    return (
        <Wrapper>
            <Spinner loading={loading} />
            <Subtitle>Informe o valor total do pedido e a oferta</Subtitle>

            <ContainerTop>
                <RSMoney>R$</RSMoney>
                <UserAmount
                    value={userAmount}
                    onChangeText={(e: string) => setUserAmount(e)}
                />
                <SubtitleMoney>Valor total do pedido (Pode ser arredondado)</SubtitleMoney>
            </ContainerTop>
            <ContainerBottom>

                <FlatListOffers
                    data={route.params.offers}
                    keyExtractor={(item: IWalletCouponsResponseOfferData) => `${item.offer_id}`}
                    renderItem={RenderOffer}
                />

                <Button
                    disabled={disabledButton}
                    text='Concluir'
                    onPress={handleCheckin}
                />

            </ContainerBottom>
        </Wrapper>
    );
} 