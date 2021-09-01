import React, { useState, useEffect, useContext } from 'react';
import { HomeContext } from '../../../contexts/homeContext';
import { ICategoryResponse } from '../../../services/@types/IStore';
import { StoreService } from '../../../services/store_services';
import { Description, Dot, FlatComponent, WrapplerTouchable } from './styles';

export const RestaurantsCategories: React.FC = () => {

  const { categories, setCategories, selectedCategory, setSelectedCategory } = useContext(HomeContext)

  useEffect(() => {

    (async function getCategories() {
      try {
        const data = await StoreService.getCategories();

        //Move Todos to init
        const index = data.findIndex(item => item.id === '94d9ccaf-9a03-4b1d-9dc7-bec0931b1381');
        const element = data[index];
        data.splice(index, 1);
        data.splice(0, 0, element);
        //Move Todos to init

        setSelectedCategory(element.id)

        setCategories(data)
      } catch (error) {
        //TODO
      }
    })()

  }, [])

  return (
    <FlatComponent
      data={categories}
      keyExtractor={(item: ICategoryResponse) => item.id}
      renderItem={({ item }) => {

        const isSelected = selectedCategory === item.id as string
        return (
          <WrapplerTouchable onPress={() => setSelectedCategory(item.id)}>
            <Dot active={isSelected} />
            <Description active={isSelected} >{item.description}</Description>
          </WrapplerTouchable>
        )
      }}
    />
  );
}

export default RestaurantsCategories;
