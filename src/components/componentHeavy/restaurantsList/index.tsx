import * as Location from 'expo-location';
import React, { useEffect, useState, useContext, useMemo, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StoreService } from '../../../services/store_services';
import { format4TwoColumns } from '../../../utils/formatersUtils';
import { CardEstablishment } from "../../component/cardEstablishment";
import { containerStyle, EmptyCard, Header, wrapperStyle } from './styles';
import { IRestaurants } from './interfaces';
import { LocationAccuracy, LocationObject } from 'expo-location';
import { HomeContext } from '../../../contexts/homeContext';

let adonis = []
export const RestaurantsList: React.FC = (props) => {

  let userLocation: LocationObject | undefined = undefined;

  const navigation = useNavigation();

  const { selectedCategory, restaurants, setRestaurants } = useContext(HomeContext)


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

  const HowItemRender = useCallback(({ item }: { item: IRestaurants }) => {

    if (!item.empty) {
      return (
        <CardEstablishment
          data={item}
          userLocation={userLocation}
          onPress={() => navigation.navigate("Restaurant", { name: item.name, id: item.id, image: item.image })} />
      )
    }

    return <EmptyCard />
  }, [])

  const memoizedRestaurants = useMemo(
    () => {
      const tmp = restaurants.filter(item => selectedCategory === item.business_category_id || selectedCategory === '94d9ccaf-9a03-4b1d-9dc7-bec0931b1381')

      return format4TwoColumns(tmp, 2, { empty: true, name: '', image: '' })

    }, [selectedCategory, restaurants]);

  //TODO: LOCATION DENIED SHOW WHAT?

  return (
    <FlatList
      data={memoizedRestaurants}
      extraData={memoizedRestaurants}
      refreshing={loading}
      onRefresh={getAllEstablishments}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      columnWrapperStyle={wrapperStyle as any}
      contentContainerStyle={containerStyle}
      keyExtractor={(item: IRestaurants, index: number) => `${item.id}`}
      ListHeaderComponent={() => <Header>Restaurantes</Header>}
      // ListEmptyComponent
      stickyHeaderIndices={[0]}
      renderItem={HowItemRender}
    />
  );
}
