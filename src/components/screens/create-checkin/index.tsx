import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { IWalletCouponsResponseOfferData } from '../../../services/@types/@coupon-services';
import { CreateCheckinScreenProps } from '../../../settings/@types/@app-stack';
import Button from '../../components/Button';
import OFF from '../../components/OFF';
import { Selector } from '../../components/selector';
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

export const CreateCheckin: React.FC<CreateCheckinScreenProps> = ({ route }) => {

    const [selectedOfferId, setSelectedOfferId] = useState<string>('')
    const [userAmount, setUserAmount] = useState<string>('')

    const disabledButton = userAmount.trim() === '' || userAmount.trim() === '0' ? true : false;

    function RenderOffer({ item }: { item: IWalletCouponsResponseOfferData }) {

        function handleSelect(active: boolean) {

            console.log('SERA QUE FOI')
        }


        return (
            <WrapperOffer>
                <Selector toggle={selectedOfferId == item.offer_id} onPress={() => { }} />
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
                    onPress={() => { }}
                />

            </ContainerBottom>
        </Wrapper>
    );
} 