import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useContext, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { StoreService } from '../../../services/store_services';
import { format4TwoColumns } from '../../../utils/formatersUtils';
import { CardEstablishment } from "../../component/cardEstablishment";
import { containerStyle, EmptyCard, Header, wrapperStyle } from './styles';
import * as Location from 'expo-location';
import { IRestaurants } from './interfaces';
import { Spinner } from '../../component/spinner';
import { LocationAccuracy, LocationObject } from 'expo-location';
import { HomeContext } from '../../../contexts/homeContext';


export const RestaurantsFlatlist: React.FC = () => {

  const navigation = useNavigation();
  const { selectedCategory } = useContext(HomeContext)

  const [loading, setLoading] = useState(false)
  const [locationDenied, setLocationDenied] = useState<boolean>(false)

  const [restaurants, setRestaurants] = useState<IRestaurants[]>([])
  const [userLocation, setUserLocation] = useState<LocationObject>()

  useEffect(() => {

    (async function getAllEstablishments() {

      try {
        setLoading(true)
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setLocationDenied(true)
          return;
        }

        let location = await Location.getCurrentPositionAsync({ accuracy: LocationAccuracy.Balanced });

        setUserLocation(location)

        const data = await StoreService.getRestaurants(location.coords.latitude, location.coords.longitude);
        const mappedData: IRestaurants[] = data.map(item => { return { ...item, empty: false } })

        mappedData.push({ empty: true } as IRestaurants)

        setRestaurants(mappedData)

      } catch (error) {
        //TODO
      } finally {
        setLoading(false)
      }
    })()
  }, [])


  const HowItemRender = (item: IRestaurants) => {

    if (item.empty) {
      return (
        <EmptyCard />
      )
    } else {
      return (
        <CardEstablishment
          data={item}
          userLocation={userLocation}
          onPress={() => navigation.navigate("Restaurant", { name: item.name, id: item.id, image: item.image })} />
      )
    }


  }

  const memoizedRestaurants = useMemo(
    () => {

      const tmp = restaurants.filter(item => selectedCategory === item.business_category_id || selectedCategory === '94d9ccaf-9a03-4b1d-9dc7-bec0931b1381')

      return format4TwoColumns(tmp, 2, { empty: true, name: '', image: '' })
    }, [selectedCategory, restaurants]);


  if (locationDenied) {
    return (<Text>Porra nenhuma</Text>)
  }

  return (
    <>
      <Spinner loading={loading} />
      <FlatList
        data={memoizedRestaurants}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={wrapperStyle as any}
        contentContainerStyle={containerStyle}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => {
          return (
            <Header>Restaurantes</Header>
          )
        }}
        stickyHeaderIndices={[0]}
        renderItem={({ item }) => HowItemRender(item)}
      />
    </>
  );
}
