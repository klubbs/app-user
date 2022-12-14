import React, { useContext } from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { ChevronIcon } from '../../components/ChevronRight';
import {
  ItemWrapper,
  ScreenContainer,
  StoreImage,
  ContainerDescriptions,
  StoreName,
  Subtitle,
  EmptyShopContainer,
  EmptyShopIcon,
  BadgeContainer,
  BadgeText,
  ContainerNotFound,
  EmptySubtitle,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { HomeContext } from '../../../contexts/home-context';
import { colors } from '../../../../assets/constants/colors';
import { formatCurrency } from '../../../utils/formatersUtils';
import { OfferPoolsScreenProps } from '../../../settings/@types/@app-stack';
import { NotFoundRestaurants } from '../../../../assets/images/notFounds/notFoundRestaurants';

export type TSelectedOffers = {
  storeId: string;
  store: string;
  id: string;
  off: number;
  image?: string;
  couponCode: string;
  couponId: string;
  storeName: string;
  storeImage: string;
  minTicket: number;
};

const TYPE_BY_OFF = {
  HIGH: { max: 100, min: 50 },
  MEDIUM: { max: 49, min: 30 },
  LOW: { max: 29, min: 0 },
};

export const OfferPools: React.FC<OfferPoolsScreenProps> = ({ route }) => {
  const { klubbsOffers, getKlubbsOffersAsync } = useContext(HomeContext);
  const navigation = useNavigation();

  const offersbyOff = klubbsOffers.filter(
    (x) =>
      x.off >= TYPE_BY_OFF[route.params.type].min && x.off <= TYPE_BY_OFF[route.params.type].max,
  );

  function handlePress(item: TSelectedOffers) {
    navigation.navigate('CreateCheckin', {
      flux: 'KLUBBS_FLUX',
      coupon_code: item.couponCode,
      coupon_id: item.couponId,
      partner_image: item.storeImage, //In this case is same image
      offers: [
        {
          offer_id: item.id,
          store_name: item.storeName,
          store_image: item.storeImage,
          offer_ticket: item.minTicket,
          offer_percentage: item.off,
        },
      ],
    });
  }

  function LoadingOrEmptyRender() {
    return (
      <ContainerNotFound>
        <NotFoundRestaurants height={160} />
        <EmptySubtitle>Ainda não liberamos nada por aqui</EmptySubtitle>
      </ContainerNotFound>
    );
  }

  return (
    <ScreenContainer>
      <FlatList
        data={offersbyOff}
        keyExtractor={(item, _: number) => item.id}
        contentContainerStyle={{ paddingTop: 80 }}
        ListEmptyComponent={LoadingOrEmptyRender}
        onRefresh={getKlubbsOffersAsync}
        renderItem={({ item }: { item: TSelectedOffers }) => {
          return (
            <ItemWrapper onPress={() => handlePress(item)}>
              {item.image && (
                <StoreImage
                  source={{
                    uri: `https://klubbs-establishment.s3.amazonaws.com/${item.image}`,
                  }}
                />
              )}
              {!item.image && (
                <EmptyShopContainer>
                  <EmptyShopIcon />
                </EmptyShopContainer>
              )}
              <ContainerDescriptions>
                <View>
                  <StoreName>{item.store}</StoreName>
                  <Subtitle>{item.off}% desconto</Subtitle>
                </View>
                <BadgeContainer>
                  <Feather name={'chevrons-up'} size={12} color={colors.COLOR_SECOND_GREEN} />
                  <BadgeText>{formatCurrency(item.minTicket)}</BadgeText>
                </BadgeContainer>
              </ContainerDescriptions>
              <ChevronIcon />
            </ItemWrapper>
          );
        }}
      />
    </ScreenContainer>
  );
};
