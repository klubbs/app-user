import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import COLORS from '../../../../assets/constants/colors';


const Tab = createMaterialTopTabNavigator();


const RestaurantsMenu: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: COLORS.COLOR_YELLOW,
        inactiveTintColor: COLORS.COLOR_BLACK50,
        indicatorStyle: { borderWidth: 1.5, borderColor: COLORS.COLOR_YELLOW, borderRadius: 10 },
        style: { backgroundColor: COLORS.COLOR_WHITE },
        labelStyle: { fontFamily: 'Nunito_SemiBold' }
      }}
    >
      <Tab.Screen name="Benefícios" children={() => <></>} />
      <Tab.Screen name="Detalhes" children={() => <></>} />
      <Tab.Screen name="Avaliações" children={() => <></>} />
    </Tab.Navigator>
  );
}

export default RestaurantsMenu;
