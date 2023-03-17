import React from 'react';
import { FlatList } from 'react-native';
import * as Linking from 'expo-linking';

import { Container, GapSpacing, Header, TouchableContainer, Uber, Instagram } from './styles';
import { IRestaurantInteractions } from './@types';

export const InteractionButtons: React.FC<IRestaurantInteractions> = ({ data }) => {
  const DATA = [
    { id: '0', cb: handleUberCall, icon: 'uber' },
    { id: '1', cb: handleInstagramCall, icon: 'instagram' },
  ];

  function handleUberCall() {
    const lat = `${data.lat}`;
    const long = `${data.long}`;

    Linking.openURL(
      `uber://?client_id=e1P-SgdvK_PmQCLAq_815j4fjk5OxJ50&action=setPickup&pickup=my_location&dropoff[latitude]=${lat}&dropoff[longitude]=${long}&dropoff[nickname]=${data.restaurantName}`,
    );
  }

  function handleInstagramCall() {
    Linking.openURL(`instagram://user?username=${data.instagram}`);
  }

  const ItemRender = ({ item }: { item: any }) => {
    const Icon = (): JSX.Element => {
      switch (item.icon) {
        case 'uber':
          return (
            <TouchableContainer onPress={item.cb}>
              <Uber />
            </TouchableContainer>
          );
        case 'instagram':
          return (
            <TouchableContainer onPress={item.cb}>
              <Instagram />
            </TouchableContainer>
          );

        default:
          return <></>;
      }
    };

    return (
      <Container>
        <Icon />
      </Container>
    );
  };

  return (
    <>
      <Header>Interações</Header>
      <FlatList
        data={DATA}
        keyExtractor={(item, _: number) => item.id}
        horizontal
        ItemSeparatorComponent={() => <GapSpacing />}
        showsHorizontalScrollIndicator={false}
        renderItem={ItemRender}
      />
    </>
  );
};
