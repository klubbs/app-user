import React from 'react';
import { View, FlatList } from 'react-native';
import { UberLogo } from '../../../../assets/images/others/uber';
import * as Linking from 'expo-linking';

import { Container, Header, TouchableContainer } from './styles';
import { IRestaurantInteractions } from './@types';



export const RestaurantInteractions: React.FC<IRestaurantInteractions> = ({ data }) => {

  const DATA = [{ id: '1', cb: handleUberCall, icon: 'uber' }]

  function handleUberCall() {

    const lat = `${data.lat}`
    const long = `${data.long}`

    Linking.openURL(`uber://?client_id=e1P-SgdvK_PmQCLAq_815j4fjk5OxJ50&action=setPickup&pickup=my_location&dropoff[latitude]=${lat}&dropoff[longitude]=${long}&dropoff[nickname]=${data.restaurantName}`)
  }

  const ItemRender = ({ item }: { item: any }) => {

    const Icon = (): JSX.Element => {
      switch (item.icon) {
        case 'uber':
          return (
            <TouchableContainer onPress={item.cb}>
              <UberLogo width={'100%'} height={'100%'} />
            </TouchableContainer>
          )

        default:
          return <></>
      }
    }

    return (
      <Container>
        <Icon />
      </Container >
    )

  }

  return (
    <>
      <Header>Interações</Header>
      <FlatList
        data={DATA}
        keyExtractor={(item, index: number) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={ItemRender}
      />
    </>
  );
}
