import * as Location from 'expo-location';
import React, { useEffect, useState, useContext } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StoreService } from '../../../services/storeServices';
import { CardEstablishment } from "../../component/cardEstablishment";
import { containerStyle, EmptyCard, Header, WrapperNotFound, wrapperStyle, NotFoundTitle, NotFoundSubtitle, WrapperDenied } from './styles';
import { IRestaurants } from './@types';
import { LocationAccuracy, LocationObject } from 'expo-location';
import { HomeContext } from '../../../contexts/homeContext';
import { NotFoundRestaurants } from '../../../../assets/images/notFoundRestaurants';
import { LocationDeniedImage } from '../../../../assets/images/locationDeniedImage';

let userLocation: LocationObject | undefined = undefined;

export const RestaurantsList: React.FC = (props) => {

  const navigation = useNavigation();

  const { categorizedRestaurants, getCategoriesDescription, setRestaurants } = useContext(HomeContext)

  const [loading, setLoading] = useState(false)

  const [locationDenied, setLocationDenied] = useState<boolean>(false)

  useEffect(() => {
    getAllEstablishments()
  }, [])

  async function getAllEstablishments() {
    try {

      setLoading(true)

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setLocationDenied(true)
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: LocationAccuracy.Balanced });

      userLocation = location

      const data = await StoreService.getRestaurants(location.coords.latitude, location.coords.longitude);

      let mappedData: IRestaurants[] = data.map(item => { return { ...item, empty: false } })

      mappedData.push({ empty: true } as IRestaurants)

      setRestaurants(mappedData)

    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const HowItemRender = ({ item }: { item: IRestaurants }) => {

    if (!item.empty) {
      return (
        <CardEstablishment
          data={item}
          userLocation={userLocation}
          onPress={() => navigation.navigate("Restaurant", {
            ...item,
            business_category_id: getCategoriesDescription(item.business_category_id)
          })}
        />
      )
    }

    return <EmptyCard />
  }

  function NotFound(): JSX.Element {
    return (
      <WrapperNotFound>
        <NotFoundRestaurants height={160} />
        <NotFoundTitle>Nos desculpe</NotFoundTitle>
        <NotFoundSubtitle>Infelizmente não temos nada por aqui ainda</NotFoundSubtitle>
      </WrapperNotFound>
    )
  }

  if (locationDenied) {
    return (
      <WrapperDenied>
        <LocationDeniedImage height={160} />
        <NotFoundTitle>Habilite sua localização</NotFoundTitle>
        <NotFoundSubtitle>Para indicarmos estabelecimentos próximos</NotFoundSubtitle>
      </WrapperDenied>
    )
  }

  return (
    <FlatList
      data={categorizedRestaurants}
      refreshing={loading}
      onRefresh={getAllEstablishments}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      columnWrapperStyle={wrapperStyle as any}
      contentContainerStyle={containerStyle}
      keyExtractor={(item: IRestaurants, index: number) => `${item.id}`}
      ListHeaderComponent={() => <Header>Restaurantes</Header>}
      ListEmptyComponent={() => <NotFound />}
      stickyHeaderIndices={[0]}
      renderItem={HowItemRender}
    />
  );
}
