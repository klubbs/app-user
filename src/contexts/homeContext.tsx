import React, { useState, createContext, useMemo } from 'react';
import { IRestaurants } from '../components/organisms/restaurantsList/@types';
import { ICategoryResponse } from '../services/@types/IStore';
import { StoreService } from '../services/storeServices';
import { AsyncStorageUtils } from '../utils/asyncStorageUtils';
import { format4TwoColumns } from '../utils/formatersUtils';

export const HomeContext = createContext(
  {} as {
    categories: ICategoryResponse[],
    selectedCategory: string,
    setSelectedCategory: (val: string) => void,
    setRestaurants: (val: IRestaurants[]) => void,
    getCategoriesDescription(id: string): string | undefined,
    categorizedRestaurants: IRestaurants[],
    getCategories: () => Promise<void>
  });


const HomeProvider: React.FC = ({ children }) => {

  const [categories, setCategories] = useState<ICategoryResponse[]>([])

  const [selectedCategory, setSelectedCategory] = useState("")

  const [restaurants, setRestaurants] = useState<IRestaurants[]>([])


  async function getCategories() {
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

  const categorizedRestaurants = useMemo(
    () => {
      const tmp = restaurants.filter(item => selectedCategory === item.business_category_id || selectedCategory === '94d9ccaf-9a03-4b1d-9dc7-bec0931b1381')

      return format4TwoColumns(tmp, 2, { empty: true, name: '', image: '' })

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
      setRestaurants,
      getCategoriesDescription,
      categorizedRestaurants
    }}>
      {children}
    </ HomeContext.Provider>
  );
}


export { HomeProvider }
