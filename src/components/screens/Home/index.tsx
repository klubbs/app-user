import React, { useRef } from 'react';
import { View, SafeAreaView, Image, StyleSheet, Text } from 'react-native';
import COLORS from '../../../../assets/constants/colors';
import MainCategories from '../../component_heavy/restaurants_categories';
import Restaurants from '../../component_heavy/restaurants_flatlist';
import AdvertisementsSlider from "../../component_heavy/advertisements_banner"
import BarHome from "../../component_heavy/bar_top_home"
import PartnersList from '../../component_heavy/partners_flatlist';

const example = [
  { text: "Todos", id: "1", icon: "" },
  { text: "Churrascaria", id: "2", icon: "" },
  { text: "Italiana", id: "3", icon: "" },
  { text: "Japonesa", id: "4", icon: "" },
  { text: "Japonesa", id: "5", icon: "" },
  { text: "Mexicana", id: "6", icon: "" },
  { text: "Alemã", id: "7", icon: "" }]

const Home: React.FC = () => {


  return (
    <SafeAreaView style={styles.safe}>
      <BarHome />

      <View style={{ flex: 0.2 }}>
        <AdvertisementsSlider />
      </View>

      <View style={styles.scrol}>
        <MainCategories categories={example} />
        <Restaurants />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.COLOR_WHITE },
  main_categ: { flex: 0.1 },
  scrol: { flex: 0.8, justifyContent: 'center' },
});

export default Home;
