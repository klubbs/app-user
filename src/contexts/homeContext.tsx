import React, { useState, createContext } from 'react';
import { IRestaurants } from '../components/componentHeavy/restaurantsList/interfaces';
import { ICategoryResponse } from '../services/@types/IStore';

export const HomeContext = createContext(
  { } as {
    categories: ICategoryResponse[],
    setCategories: (val: ICategoryResponse[]) => void,
    selectedCategory: string,
    setSelectedCategory: (val: string) => void,
    restaurants: IRestaurants[],
    setRestaurants: (val: IRestaurants[]) => void
  });


const HomeProvider: React.FC = ({ children }) => {

  const [categories, setCategories] = useState<ICategoryResponse[]>([])

  const [selectedCategory, setSelectedCategory] = useState("")

  const [restaurants, setRestaurants] = useState<IRestaurants[]>([])


  return (
    < HomeContext.Provider value={{ categories, setCategories, selectedCategory, setSelectedCategory, restaurants, setRestaurants }}>
      {children}
    </ HomeContext.Provider>
  );
}


export { HomeProvider }
