import React, { useState, createContext, useMemo, useEffect } from 'react';
import { IRestaurants } from '../components/components_heavy/RestaurantsList/@types';
import { ICategoryResponse } from '../services/@types/@store-services';
import { StoreService } from '../services/store-service';
import { AsyncStorageUtils } from '../utils/async-storage';
import { format4TwoColumns } from '../utils/formatersUtils';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { TPoolOffer } from '../components/screens/offer-pools';

export const HomeContext = createContext(
  {} as {
    categories: ICategoryResponse[];
    selectedCategory: string;
    categorizedRestaurants: IRestaurants[];
    location: { city: string; lat: number | null; long: number | null };
    klubbsOffers: TPoolOffer[];
    searchValue: string | null;
    searchIsEnable: boolean;
    getCategories: () => Promise<void>;
    getRestaurants: (latitude: number, longitude: number) => Promise<void>;
    getKlubbsOffersAsync: () => Promise<void>;
    getCategoriesDescription(id: string): string | undefined;
    setSearchValue: (val: string | null) => void;
    setSelectedCategory: (val: string) => void;
    setRestaurants: (val: IRestaurants[]) => void;
  },
);

const START_LOCATION_STATE = {
  city: 'Estamos te localizando...',
  lat: null,
  long: null,
};

const HomeProvider: React.FC = ({ children }: any) => {
  const [categories, setCategories] = useState<ICategoryResponse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [restaurants, setRestaurants] = useState<IRestaurants[]>([]);
  const [klubbsOffers, setKlubbsOffers] = useState<TPoolOffer[]>([]);
  const [searchValue, setSearchValue] = useState<string | null>('');
  const [location, setLocation] = useState<{
    city: string;
    lat: number | null;
    long: number | null;
  }>(START_LOCATION_STATE);

  const searchIsEnable = searchValue != '';

  useEffect(() => {
    getLocationAsync();
  }, []);

  async function getLocationAsync() {
    const location = await Location.getCurrentPositionAsync({
      accuracy: LocationAccuracy.Balanced,
    });

    const address = await Location.reverseGeocodeAsync(location.coords);

    setLocation({
      city: address[0].city || 'Não localizamos você :/',
      lat: location.coords.latitude,
      long: location.coords.longitude,
    });
  }

  async function getCategories() {
    const storedCategories = await AsyncStorageUtils.getCategoriesInStorage();

    if (storedCategories !== null) {
      setCategories(storedCategories);
      setSelectedCategory(storedCategories[0].id);
    }

    const data = await StoreService.getCategories();

    //Move 'Todos' to init
    const index = data.findIndex((item) => item.id === '94d9ccaf-9a03-4b1d-9dc7-bec0931b1381');
    const element = data[index];
    data.splice(index, 1);
    data.splice(0, 0, element);
    //Move 'Todos' to init

    setSelectedCategory(element.id);
    setCategories(data);

    await AsyncStorageUtils.saveCategoriesInStorage(data);
  }

  async function getRestaurants(latitude: number, longitude: number) {
    const data = await StoreService.getRestaurants(latitude, longitude);

    setRestaurants(data);

    if (data.length > 0) {
      const mappedData: IRestaurants[] = data.map((item) => {
        return { ...item, empty: false };
      });

      mappedData.push({ empty: true } as IRestaurants);

      setRestaurants(mappedData);
    }
  }

  const categorizedRestaurants = useMemo(() => {
    const tmp = restaurants.filter(
      (item) =>
        selectedCategory === item.business_category_id ||
        selectedCategory === '94d9ccaf-9a03-4b1d-9dc7-bec0931b1381',
    );

    if (selectedCategory === '94d9ccaf-9a03-4b1d-9dc7-bec0931b1381' && restaurants.length === 0) {
      return [];
    }

    return format4TwoColumns(tmp, 2);
  }, [selectedCategory, restaurants]);

  async function getKlubbsOffersAsync() {
    const response = await StoreService.getSelectedKlubbsOffers();

    if (response.length < 1) {
      setKlubbsOffers([]);
    }

    const mapped = response.map((i) => {
      return {
        id: i.offer_id,
        off: i.off,
        store: i.store_name,
        storeId: i.store_id,
        image: i.store_image,
        couponCode: i.coupon_code,
        couponId: i.coupon_id,
        minTicket: i.min_ticket,
        storeImage: i.store_image,
        storeName: i.store_name,
      } as TPoolOffer;
    });
    setKlubbsOffers(mapped);
  }

  function getCategoriesDescription(id: string): string | undefined {
    return categories.find((item) => item.id === id)?.description;
  }

  return (
    <HomeContext.Provider
      value={{
        getCategories,
        categories,
        selectedCategory,
        setSelectedCategory,
        getCategoriesDescription,
        categorizedRestaurants,
        getRestaurants,
        location,
        getKlubbsOffersAsync,
        klubbsOffers,
        searchValue,
        setSearchValue,
        searchIsEnable,
        setRestaurants,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export { HomeProvider };
