import * as Location from 'expo-location';
import React, { useEffect, useState, useContext } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CardEstablishment } from "../../components/CardEstablishment";
import { IRestaurants } from './@types';
import { LocationAccuracy, LocationObject } from 'expo-location';
import { HomeContext } from '../../../contexts/homeContext';
import { NotFoundRestaurants } from '../../../../assets/images/notFounds/notFoundRestaurants';
import { LocationDeniedImage } from '../../../../assets/images/notFounds/locationDenied';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { EmptyCard, Header, WrapperNotFound, wrapperStyle, NotFoundTitle, NotFoundSubtitle, WrapperDenied } from './styles';


let userLocation: LocationObject | undefined = undefined;

export const RestaurantsList: React.FC = (props) => {

  const navigation = useNavigation();

  const { categorizedRestaurants, getCategoriesDescription, getRestaurants } = useContext(HomeContext)

  const [loading, setLoading] = useState(false)

  const [locationDenied, setLocationDenied] = useState<boolean>(false)

  useEffect(() => {
    loadAllRestaurants()
  }, [])

  async function loadAllRestaurants() {
    try {

      setLoading(true)

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setLocationDenied(true)
        return;
      }

      const location = await Location.getCurrentPositionAsync({ accuracy: LocationAccuracy.Balanced });

      userLocation = location

      await getRestaurants(location.coords.latitude, location.coords.longitude);

    } catch (error) {
      NotificationsFlash.customMessage('Nos desculpe', 'Ocorreu um erro ao recuperar os restaurantes', 'NEUTRAL')
    } finally { setLoading(false) }
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
      onRefresh={loadAllRestaurants}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      columnWrapperStyle={wrapperStyle as any}
      keyExtractor={(item: IRestaurants, index: number) => `${item.id}`}
      ListHeaderComponent={() => <Header>Restaurantes</Header>}
      ListEmptyComponent={() => <NotFound />}
      stickyHeaderIndices={[0]}
      renderItem={HowItemRender}
    />
  );
}
