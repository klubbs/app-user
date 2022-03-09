import React, { useState, createContext, useMemo } from 'react';
import { IRestaurants } from '../components/components_heavy/RestaurantsList/@types';
import { ICategoryResponse } from '../services/@types/storeServiceTypes';
import { StoreService } from '../services/storeServices';
import { AsyncStorageUtils } from '../utils/asyncStorage';
import { format4TwoColumns } from '../utils/formatersUtils';

export const HomeContext = createContext(
  {} as {
    categories: ICategoryResponse[],
    selectedCategory: string,
    setSelectedCategory: (val: string) => void,
    getCategoriesDescription(id: string): string | undefined,
    categorizedRestaurants: IRestaurants[],
    getCategories: () => Promise<void>,
    getRestaurants: (latitude: number, longitude: number) => Promise<void>
  });


const HomeProvider: React.FC = ({ children }) => {

  const [categories, setCategories] = useState<ICategoryResponse[]>([])

  const [selectedCategory, setSelectedCategory] = useState("")

  const [restaurants, setRestaurants] = useState<IRestaurants[]>([])


  async function getCategories() {
    //TODO: Remover esse trycatch
    try {

      const storedCategories = await AsyncStorageUtils.getCategoriesInStorage();

      if (storedCategories !== null) {
        setCategories(storedCategories);
        setSelectedCategory(storedCategories[0].id)
      }

      const data = await StoreService.getCategories();

      //Move 'Todos' to init
      const index = data.findIndex(item => item.id === '94d9ccaf-9a03-4b1d-9dc7-bec0931b1381');
      const element = data[index];
      data.splice(index, 1);
      data.splice(0, 0, element);
      //Move 'Todos' to init

      setSelectedCategory(element.id)
      setCategories(data)

      await AsyncStorageUtils.saveCategoriesInStorage(data);

    } catch (error) {
    }
  }

  async function getRestaurants(latitude: number, longitude: number) {
    const data = await StoreService.getRestaurants(latitude, longitude);

    setRestaurants(data)

    if (data.length > 0) {
      let mappedData: IRestaurants[] = data.map(item => { return { ...item, empty: false } })

      mappedData.push({ empty: true } as IRestaurants)

      setRestaurants(mappedData)
    }

  }

  const categorizedRestaurants = useMemo(
    () => {
      const tmp = restaurants.filter(item => selectedCategory === item.business_category_id || selectedCategory === '94d9ccaf-9a03-4b1d-9dc7-bec0931b1381')

      if (selectedCategory === '94d9ccaf-9a03-4b1d-9dc7-bec0931b1381' && restaurants.length === 0) {
        return []
      }

      return format4TwoColumns(tmp, 2)

    }, [selectedCategory, restaurants]);


  function getCategoriesDescription(id: string): string | undefined {
    return categories.find(item => item.id === id)?.description
  }

  return (
    < HomeContext.Provider value={{
      getCategories,
      categories,
      selectedCategory,
      setSelectedCategory,
      getCategoriesDescription,
      categorizedRestaurants,
      getRestaurants
    }}>
      {children}
    </ HomeContext.Provider>
  );
}


export { HomeProvider }
