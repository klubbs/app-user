import React, { useState } from 'react';
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
} from './styles';
import { useNavigation } from '@react-navigation/native';

type OfferType = {
  storeId: string;
  store: string;
  id: string;
  off: number;
  image?: string;
};

export const OfferPools: React.FC = () => {
  const navigation = useNavigation();

  const [offers, setOffers] = useState<OfferType[]>([
    {
      storeId: 'ASD2134',
      store: 'Ragazzo',
      id: '12345',
      off: 45,
      image: undefined,
    },
  ]);

  function handlePress(item: OfferType) {
    navigation.navigate('StoreProfile');
  }

  return (
    <ScreenContainer>
      <FlatList
        data={offers}
        keyExtractor={(item, _: number) => item.id}
        contentContainerStyle={{ paddingTop: 80 }}
        renderItem={({ item }: { item: OfferType }) => {
          return (
            <ItemWrapper onPress={() => handlePress(item)}>
              {item.image && (
                <StoreImage
                  source={{
                    uri: 'https://media-cdn.tripadvisor.com/media/photo-s/08/72/16/04/fachada.jpg',
                  }}
                />
              )}
              {!item.image && (
                <EmptyShopContainer>
                  <EmptyShopIcon />
                </EmptyShopContainer>
              )}
              <ContainerDescriptions>
                <StoreName>{item.store}</StoreName>
                <Subtitle>{item.off}% desconto</Subtitle>
              </ContainerDescriptions>
              <ChevronIcon />
            </ItemWrapper>
          );
        }}
      />
    </ScreenContainer>
  );
};
