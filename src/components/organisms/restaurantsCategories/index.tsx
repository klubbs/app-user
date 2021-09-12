import React, { useEffect, useContext } from 'react';
import { HomeContext } from '../../../contexts/homeContext';
import { ICategoryResponse } from '../../../services/@types/IStore';
import { Description, Dot, FlatComponent, WrapplerTouchable, SkeletonStyled, WrapperSkeleton } from './styles';

export const RestaurantsCategories: React.FC = (props) => {

  const { getCategories, selectedCategory, setSelectedCategory, categories } = useContext(HomeContext)

  useEffect(() => {
    (getCategories)()
  }, [])

  function ItemRender({ item }: { item: ICategoryResponse }): JSX.Element {

    const isSelected = selectedCategory === item.id

    return (
      <WrapplerTouchable onPress={() => setSelectedCategory(item.id)}>
        <Dot active={isSelected} />
        <Description active={isSelected} >{item.description}</Description>
      </WrapplerTouchable>
    )
  }

  if (categories.length <= 0) {
    return (
      <WrapperSkeleton>
        <SkeletonStyled />
      </WrapperSkeleton>
    )
  }

  return (
    <FlatComponent
      data={categories}
      keyExtractor={(item: ICategoryResponse, index: number) => `${item.id}`}
      renderItem={ItemRender as any}
    />
  );
}

export default RestaurantsCategories;
