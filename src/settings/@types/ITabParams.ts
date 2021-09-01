import { StackScreenProps } from "@react-navigation/stack";

export type ITabsParamList = {
  Home: undefined;
  Search: undefined;
  Coupon: undefined;
  Options: { isSign: boolean };
};


export type OptionsScreenProps = StackScreenProps<ITabsParamList, 'Options'>
