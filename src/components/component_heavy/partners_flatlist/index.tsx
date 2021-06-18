import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PartnerCard from '../../component/partner_card';

import { Header } from './styles';

const PartnersList: React.FC = () => {

  const [partners, setPartners] = useState<{ id: string }[]>([{ id: "1" }, { id: "2" }, { id: "3" }])

  return (
    <FlatList
      data={partners}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      decelerationRate={'fast'}
      contentContainerStyle={styles.flatContainer}
      // ListHeaderComponent={() => <Header>Parceiros Premium</Header>}
      renderItem={({ item }) => {
        return (
          <PartnerCard />
        )
      }}
    />
  );
}

const styles = StyleSheet.create({
  flatContainer: { flex: 1, marginLeft: 20, marginBottom: '20%', marginTop: '5%' }
});
export default PartnersList;
