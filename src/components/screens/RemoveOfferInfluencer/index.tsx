import React, { useContext, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { FlatList } from 'react-native-gesture-handler';
import OFF from '../../components/OFF';
import { colors } from '../../../../assets/constants/colors';
import { RemoveOfferInfluencerScreenProps } from '../../../settings/@types/@app-stack';
import { Spinner } from '../../components/Spinner';
import { InfluencerService } from '../../../services/influencer-service';
import { NotificationsFlash } from '../../../utils/flash-notifications';
import * as Haptic from 'expo-haptics';
import { InfluencerContext } from '../../../contexts/influencer-context';
import { GetAllCouponsByInfluencerResponse, OffersCouponInfluencerResponse } from '../../modals/CouponsInfluencer/@types';
import {
    Wrapper,
    ContainerBottom,
    ContainerTop,
    Code,
    ItemContainer, Store,
    ValidAt, SeparatorComponet,
    ContainerSubtitleOffers, ContainerStoreOffers, DisableActionContainer, EmptyText, StoreImage, ContainerStoreImage, EmptyShopIcon
} from './styles';

const STORE_SIZE_CHARACTERS = 20

export const RemoveOfferInfluencerScreen: React.FC<RemoveOfferInfluencerScreenProps> = (props) => {

    const { coupons, removeOffer } = useContext(InfluencerContext)

    const [selectedCoupon, setSelectedCoupon] = useState<GetAllCouponsByInfluencerResponse | null>(null)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const index = coupons.findIndex(i => i.coupon_id == props.route.params.couponId)

        const coupon = coupons[index];

        setSelectedCoupon(coupon)

    }, [coupons])

    function ItemList({ item }: { item: OffersCouponInfluencerResponse }) {


        function RemoveAction() {
            return (
                <DisableActionContainer onPress={() => handleRemoveOffer(item.master_coupon_id)}>
                    <Feather name='trash-2' size={20} color={colors.COLOR_BLACK80} />
                </DisableActionContainer >
            )
        }

        function HandleImage() {
            if (item.establishment_image) {
                return (
                    <ContainerStoreImage>
                        <StoreImage
                            source={{ uri: `https://klubbs-establishment.s3.amazonaws.com/${item.establishment_image}` }}
                        />
                    </ContainerStoreImage>
                )
            }

            return (
                <ContainerStoreImage>
                    <EmptyShopIcon></EmptyShopIcon>
                </ContainerStoreImage>
            )

        }

        return (
            <Swipeable key={item.master_coupon_id} renderRightActions={() => { return (<RemoveAction />) }}>
                <ItemContainer >
                    <ContainerStoreOffers>
                        <HandleImage />
                        <Store>
                            {item.establishment_name.substring(0, STORE_SIZE_CHARACTERS)}
                            {item.establishment_name.length > STORE_SIZE_CHARACTERS ? '...' : ''}
                        </Store>
                    </ContainerStoreOffers>
                    <ContainerSubtitleOffers>
                        <OFF off={item.master_coupon_off_percentual} />
                        <ValidAt isValid={new Date().ToUnixEpoch() < item.master_coupon_valid_at}>{
                            item
                                .master_coupon_valid_at
                                .ToDateFormat()
                                .toCustomLocaleDateString()}
                        </ValidAt>
                    </ContainerSubtitleOffers>
                </ItemContainer>
            </Swipeable >
        )
    }

    async function handleRemoveOffer(id: string) {

        try {
            setLoading(true)

            await InfluencerService.RemoveOffer(id, props.route.params.couponId)

            Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light)

            removeOffer(props.route.params.couponId, id)

        } catch (error) {
            NotificationsFlash.disconnectedWire()
        } finally {
            setLoading(false)
        }

    }

    return (
        <Wrapper>
            <Spinner loading={loading} />
            <ContainerTop>
                <Code>{selectedCoupon?.coupon_code}</Code>
            </ContainerTop>
            <ContainerBottom>

                <FlatList
                    data={selectedCoupon?.master_coupons}
                    ItemSeparatorComponent={() => <SeparatorComponet />}
                    ListEmptyComponent={() => <EmptyText>Nenhuma oferta associada ainda</EmptyText>}
                    renderItem={({ item }: { item: OffersCouponInfluencerResponse }) => { return <ItemList item={item} /> }}
                />
            </ContainerBottom>
        </Wrapper>
    );
}
