import React, { useState } from 'react';
import { MainCategoriesProps } from './interfaces';
import { Description, Dot, FlatComponent, WrapplerTouchable } from './styles';

export const RestaurantsCategories: React.FC<MainCategoriesProps> = ({ categories }: MainCategoriesProps) => {

  const [selected, setSelected] = useState<string>("")


  return (
    <FlatComponent
      data={categories}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => {

        const isSelected = selected === item.id as any

        return (
          <WrapplerTouchable onPress={() => setSelected(item.id)}>
            <Dot selected={isSelected} />
            <Description selected={isSelected} >{item.text}</Description>
          </WrapplerTouchable>
        )
      }}
    />
  );
}

export default RestaurantsCategories;
