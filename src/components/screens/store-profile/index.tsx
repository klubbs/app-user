import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../../../assets/constants/colors';
import { ClockIcon } from '../../../../assets/icons/clockIcon';
import { StoreScreenProps } from '../../../settings/@types/@app-stack';
import { ChevronIcon } from '../../components/ChevronRight';
import { RestaurantInteractions } from '../../components_heavy/RestaurantInteractions';
import {
  BlocksWrapper,
  HeaderSubtitle,
  HeaderTitle,
  BlocksValue,
  ImageStore,
  Container,
  StoreCategory,
  StoreName,
  Wrapper,
  StoreNameWrapper,
  StoreCategoryContainer,
  OfferDescription,
  UseThisOffer,
  WrapperOffer,
  OfferContainer,
  TicketMinimum,
  OfferOff,
  InteractionsWrapper,
  YellowContainer,
  ImageContainer,
} from './styles';
import { formatCurrency, formatHour } from '../../../utils/formatersUtils';

const StoreProfile: React.FC<StoreScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  return (
    <Wrapper>
      <ImageContainer>
        <YellowContainer>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
            <ChevronIcon right={false} light />
          </TouchableOpacity>
        </YellowContainer>
        <ImageStore
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNDtSQGVbvf9VqfHQ0Wk4SvdSrUh88nACEfA&usqp=CAU',
            // uri: `https://klubbs-establishment.s3.amazonaws.com/${route?.params?.image}`
          }}
        />
      </ImageContainer>

      <Container>
        <StoreNameWrapper>
          <StoreName>{route?.params?.name}</StoreName>
          <StoreCategoryContainer>
            <StoreCategory>{route?.params?.business_category_id}</StoreCategory>
          </StoreCategoryContainer>
          <BlocksWrapper>
            <ClockIcon width={14} height={14} fill={colors.COLOR_YELLOW_RATING} />
            <BlocksValue>
              {formatHour(route.params.openedAt)} {} &#xB7; {} {formatHour(route.params.closedAt)}
            </BlocksValue>
          </BlocksWrapper>
        </StoreNameWrapper>

        <FlatList
          data={
            route.params.offers ?? [
              { id: '1234', off: 20, minimumTicket: 43 },
              { id: '1234sd', off: 9, minimumTicket: 14 },
              { id: '123434', off: 23, minimumTicket: 45 },
            ]
          }
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ width: '100%', marginTop: 20 }}
          ListHeaderComponent={() => {
            return (
              <>
                <HeaderTitle>Todas as ofertas</HeaderTitle>
                <HeaderSubtitle>Válidas para utilizar hoje</HeaderSubtitle>
              </>
            );
          }}
          renderItem={({ item }) => {
            return (
              <WrapperOffer>
                <OfferDescription>
                  <UseThisOffer>Ativar oferta</UseThisOffer>
                  <TicketMinimum>
                    Pagando mais de {formatCurrency(item?.minimumTicket)}
                  </TicketMinimum>
                </OfferDescription>
                <OfferContainer>
                  <OfferOff>{item?.off}%</OfferOff>
                </OfferContainer>
              </WrapperOffer>
            );
          }}
        />
        <InteractionsWrapper>
          <RestaurantInteractions
            data={{
              lat: route.params.latitude,
              long: route.params.longitude,
              restaurantName: route.params.name,
            }}
          />
        </InteractionsWrapper>
      </Container>
    </Wrapper>
  );
};

export { StoreProfile };
