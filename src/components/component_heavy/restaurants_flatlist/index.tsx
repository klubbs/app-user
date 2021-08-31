import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { format4TwoColumns } from '../../../utils/formaters_helper';
import Stablishment from "../../component/establishment_card";
import { IRestaurants } from './interfaces';
import { containerStyle, EmptyCard, Header, wrapperStyle } from './styles';


const NUM_COLUMS = 2;

export const RestaurantsFlatlist: React.FC = () => {

  const navigation = useNavigation();

  const [restaurants, setRestaurants] = useState<IRestaurants[]>([])


  useEffect(() => {


    setRestaurants([{ id: "1", name: "João e João", image: "https://meubistro.com/blog/wp-content/uploads/2019/05/comida-arabe.jpg", empty: false }, { id: "2", name: "La Crua", image: "https://blog.consumer.com.br/wp-content/uploads/2020/11/culin%C3%A1ria-regional-brasileira.jpg", empty: false }, { id: "3", name: "Paramore", image: "https://vemvoar.voeazul.com.br/wp-content/uploads/2018/11/culinaria-brasileira-conheca-as-diferencas-entre-as-regioes-do-pais.jpeg", empty: false }])
  }, [])


  const HowItemRender = (item: IRestaurants) => {

    if (item.empty) {
      return (
        <EmptyCard />
      )
    } else {
      return (
        <Stablishment
          title={item.name}
          uri={item.image}
          onPress={() => navigation.navigate("Restaurant", { name: item.name, id: item.id, image: item.image })} />
      )
    }

  }

  return (
    <FlatList
      data={format4TwoColumns(restaurants, NUM_COLUMS, { empty: true, name: '', image: '' })}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      columnWrapperStyle={wrapperStyle as any}
      contentContainerStyle={containerStyle}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <Header>Restaurantes</Header>}
      renderItem={({ item }) => HowItemRender(item)}
    />
  );
}
