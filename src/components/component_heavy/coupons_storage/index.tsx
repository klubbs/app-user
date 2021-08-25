import React, { ReactElement, useState } from 'react';
import { ICouponsItems } from './interfaces';
import { Box, CouponImage, FlatComponent, PercentOff, Valid } from './styles';



const NUM_COLUMNS = 2

export const CouponsStorage: React.FC = () => {

  const [items, setItems] = useState<ICouponsItems[]>([])

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
          <CouponImage source={{ uri: "https://pbs.twimg.com/profile_images/1402367254067568641/LTLk2lAL.jpg" }} />
          <PercentOff>20% Off</PercentOff>
          <Valid>Válido até 15/06</Valid>
        </Box>
      )
    }
  }

  return (
    <FlatComponent
      data={formatColumnsData(items)}
      numColumns={NUM_COLUMNS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => HowitemRender(item)}
    />
  );
}
