import { Feather } from "@expo/vector-icons";
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Svg, { Path } from 'react-native-svg';
import COLORS from '../../../assets/constants/colors';
import { CouponIcon } from "../../../assets/icons/coupon_icon";
import { ShopIcon } from "../../../assets/icons/shop_icon";
import Coupons from '../../components/screens/coupons';
import Home from '../../components/screens/home';
import Profile from '../../components/screens/profile';
import { ITabsParamList } from "./interfaces/ITabParams";

interface AppStackProps { }

const TabBarCustomButton = ({ accessibilityState, children, onPress }: any) => {

  var isSelected = accessibilityState.selected

  if (isSelected) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
          <View style={{ flex: 1, backgroundColor: COLORS.COLOR_SECUNDARY_BLACK }}></View>
          <Svg width={75} height={61} viewBox="0 0 75 61" >
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.COLOR_SECUNDARY_BLACK}
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: COLORS.COLOR_SECUNDARY_BLACK }}></View>
        </View>

        <TouchableOpacity
          style={{
            top: -22.5, justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.COLOR_SECUNDARY_BLACK
          }}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 60,
          backgroundColor: COLORS.COLOR_SECUNDARY_BLACK
        }}
        activeOpacity={1}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    )
  }
}

const CustomTabBar = ({ props }: any) => {
  return (<View>
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 30,
        backgroundColor: COLORS.COLOR_SECUNDARY_BLACK
      }}
    ></View>
    <BottomTabBar
      {...props}
    />
  </View>)
}

const Tab = createBottomTabNavigator<ITabsParamList>();


const Tabs: React.FC<AppStackProps> = () => {

  const IconTab = ({ focused, icon }: { focused: boolean, icon: any }) => {
    return (
      <Feather name={icon} size={20} color={focused ? COLORS.COLOR_YELLOW : COLORS.COLOR_SECUNDARY_WHITE} />
    )
  }

  return (
    <Tab.Navigator
      tabBar={(props) => (<CustomTabBar props={props} />)}
      tabBarOptions={{
        showLabel: false, style: { position: 'absolute', left: 0, bottom: 0, right: 0, borderTopWidth: 0, backgroundColor: "transparent", elevation: 0 }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => <ShopIcon fill={focused ? COLORS.COLOR_YELLOW : COLORS.COLOR_SECUNDARY_WHITE} width={18} height={18} />,
          tabBarButton: (props) => (<TabBarCustomButton {...props} />)
        }}
      />

      <Tab.Screen
        name="Coupon"
        component={Coupons}
        options={{
          tabBarIcon: ({ focused }) => <CouponIcon fill={focused ? COLORS.COLOR_YELLOW : COLORS.COLOR_SECUNDARY_WHITE} width={18} height={18} />,
          tabBarButton: (props) => (<TabBarCustomButton {...props} />)
        }}
      />

      <Tab.Screen
        name="Options"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => <IconTab focused={focused} icon="more-vertical" />,
          tabBarButton: (props) => (<TabBarCustomButton {...props} />)
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
