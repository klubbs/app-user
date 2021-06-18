import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { Description, WrapplerTouchable, Dot } from './styles';

interface MainCategoriesProps {
  categories: MainCategorieItens[]
}
interface MainCategorieItens {
  id: string
  icon: string
  text: string;
}

const RestaurantsCategories: React.FC<MainCategoriesProps> = ({ categories }: MainCategoriesProps) => {

  const [selected, setSelected] = useState<string>("")

  const handlePress = (item: string) => {
    setSelected(item);
  }

  return (

    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item }) => {
        const isSelected = selected === item.id
        return (
          <WrapplerTouchable selected={isSelected} onPress={() => handlePress(item.id)}>
            <Dot selected={isSelected} />
            <Description selected={isSelected} >{item.text}</Description>
          </WrapplerTouchable>
        )
      }}
      contentContainerStyle={{ paddingVertical: 20, marginBottom: 10, marginTop: 20 }}

    />

  );
}

export default RestaurantsCategories;
