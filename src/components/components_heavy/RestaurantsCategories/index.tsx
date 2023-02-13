import React, { useEffect, useContext } from 'react';
import * as Haptic from 'expo-haptics';
import { HomeContext } from '../../../contexts/home-context';
import { ICategoryResponse } from '../../../services/@types/@store-services';
import {
  Description,
  FlatComponent,
  WrapplerTouchable,
  SkeletonStyled,
  WrapperSkeleton,
} from './styles';

export const RestaurantsCategories: React.FC = () => {
  const { getCategories, selectedCategory, setSelectedCategory, categories } =
    useContext(HomeContext);

  useEffect(() => {
    getCategories();
  }, []);

  function onSelect(id: string) {
    setSelectedCategory(id);
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
  }

  function ItemRender({ item }: { item: ICategoryResponse }): JSX.Element {
    const isSelected = selectedCategory === item.id;

    return (
      <WrapplerTouchable onPress={() => onSelect(item.id)} selected={isSelected}>
        <Description selected={isSelected}>{item.description}</Description>
      </WrapplerTouchable>
    );
  }

  if (categories.length <= 0) {
    return (
      <WrapperSkeleton>
        <SkeletonStyled />
      </WrapperSkeleton>
    );
  }

  return (
    <FlatComponent
      data={categories}
      keyExtractor={(item: ICategoryResponse, _: number) => `${item.id}`}
      renderItem={ItemRender as any}
    />
  );
};
