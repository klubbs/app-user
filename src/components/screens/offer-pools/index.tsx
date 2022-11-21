import React, { useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ChevronRight } from '../../components/ChevronRight';
import { ItemWrapper, ScreenContainer, StoreImage, ContainerDescriptions, StoreName, Subtitle } from './styles';

//TODO: Melhorar a tela
export const OfferPools: React.FC = () => {
  const [offers, setOffers] = useState<{ id: string, store: string, off: number, image: string }[]>([{
    store: 'Ragazzo',
    id: '12345',
    off: 45,
    image: ''
  }])


  return (
    <ScreenContainer>
      <FlatList
        data={offers}
        keyExtractor={(item, index: number) => item.id}
        contentContainerStyle={{ paddingTop: 80 }}
        renderItem={({ item }: { item: any }) => {

          return (
            <ItemWrapper>
              <StoreImage source={{
                uri: 'https://media-cdn.tripadvisor.com/media/photo-s/08/72/16/04/fachada.jpg'
              }} />
              <ContainerDescriptions>
                <StoreName>{item.store}</StoreName>
                <Subtitle>{item.off}% desconto</Subtitle>
              </ContainerDescriptions>
              <ChevronRight />
            </ItemWrapper>
          )

        }}
      />
    </ScreenContainer>
  );
}
