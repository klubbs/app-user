import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Stablishment from "../../component/stablishment_card"
import { useNavigation } from '@react-navigation/native';
import { Header, containerStyle, wrapperStyle, EmptyCard } from './styles';
import { IRestaurants } from './interfaces';


const NUM_COLUMS = 2;

const RestaurantsFlatlist: React.FC = () => {

  const navigation = useNavigation();

  const [restaurants, setRestaurants] = useState<IRestaurants[]>([])


  useEffect(() => {
    setRestaurants([{ id: "1", name: "Jaquin de la torre", image: "https://meubistro.com/blog/wp-content/uploads/2019/05/comida-arabe.jpg", empty: false }, { id: "2", name: "La Crua", image: "https://blog.consumer.com.br/wp-content/uploads/2020/11/culin%C3%A1ria-regional-brasileira.jpg", empty: false }, { id: "3", name: "Paramore", image: "https://vemvoar.voeazul.com.br/wp-content/uploads/2018/11/culinaria-brasileira-conheca-as-diferencas-entre-as-regioes-do-pais.jpeg", empty: false }])
  }, [])

  const formatColumnsData = (data: IRestaurants[]): IRestaurants[] => {

    const rowsNumber = Math.floor(data.length / NUM_COLUMS)

    let numItemsLastRow = data.length - (rowsNumber * NUM_COLUMS)

    while (numItemsLastRow !== NUM_COLUMS && numItemsLastRow !== 0) {
      data.push({ id: `blank-${numItemsLastRow}`, empty: true, name: '', image: '' })

      numItemsLastRow++;
    }

    return data;
  }

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
      data={formatColumnsData(restaurants)}
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

export default RestaurantsFlatlist;
