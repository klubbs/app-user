import React, { useState } from 'react';
import { createContext } from 'react';
import { ICategoryResponse } from '../services/@types/IStore';

export const HomeContext = createContext(
  { } as {
    categories: ICategoryResponse[],
    setCategories: (val: ICategoryResponse[]) => void,
    selectedCategory: string,
    setSelectedCategory: (val: string) => void,
  });


const HomeProvider: React.FC = ({ children }) => {

  const [categories, setCategories] = useState<ICategoryResponse[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")


  return (
    < HomeContext.Provider value={{ categories, setCategories, selectedCategory, setSelectedCategory }}>
      {children}
    </ HomeContext.Provider>
  );
}


export default HomeProvider
