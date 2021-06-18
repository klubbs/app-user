import React, { ReactElement, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { ICouponsItems } from './interfaces';

import { Container, PercentOff, Box, Valid, ColumWrapperStyle, FlatStyle } from './styles';


const NUM_COLUMNS = 2

const CouponsList: React.FC = () => {

  const [items, setItems] = useState<ICouponsItems[]>([{ id: '1', empty: false }, { id: '2', empty: false }, { id: '3', empty: false }, { id: '4', empty: false }, { id: '5', empty: false }, { id: '6', empty: true }])

  const formatColumnsData = (data: ICouponsItems[]): ICouponsItems[] => {

    const rowsNumber = Math.floor(data.length / NUM_COLUMNS)

    let numItemsLastRow = data.length - (rowsNumber * NUM_COLUMNS)

    while (numItemsLastRow !== NUM_COLUMNS && numItemsLastRow !== 0) {
      data.push({ id: `blank-${numItemsLastRow}`, empty: true })

      numItemsLastRow++;
    }

    return data;
  }

  const HowitemRender = (item: ICouponsItems): ReactElement => {

    if (item.empty) {
      return <Box empty={item.empty} />
    } else {
      return (
        <Box>
          <Image style={{ width: 100, height: 100, borderRadius: 35, marginBottom: 10 }} source={{ uri: "https://pbs.twimg.com/profile_images/1402367254067568641/LTLk2lAL.jpg" }} />
          <PercentOff>20% Off</PercentOff>
          <Valid>Válido até 15/06</Valid>
        </Box>
      )
    }
  }

  return (
    <FlatList
      data={formatColumnsData(items)}
      numColumns={NUM_COLUMNS}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      style={FlatStyle as any}
      contentContainerStyle={Container as any}
      columnWrapperStyle={ColumWrapperStyle as any}
      renderItem={({ item }) => HowitemRender(item)}
    />
  );
}

export default CouponsList
