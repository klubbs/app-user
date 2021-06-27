import { StackScreenProps } from "@react-navigation/stack";

export type IAppStackParams = {
  Tabs: undefined;
  LoginWelcome: undefined;
  LoginPassword: { mail: string };
  Register: { mail: string };
  Restaurant: { id: string, image: string, name: string; };
};


export type RestaurantScreenProps = StackScreenProps<IAppStackParams, 'Restaurant'>

export type LoginPasswordScreenProps = StackScreenProps<IAppStackParams, 'LoginPassword'>

export type RegisterScreenProps = StackScreenProps<IAppStackParams, 'Register'>

