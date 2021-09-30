import { StackScreenProps } from "@react-navigation/stack";
import { IRestaurants } from "../../components/organisms/RestaurantsList/@types";
import { ICouponsItem } from "../../components/organisms/WalletCouponsTab/@types";

export type IAppStackParams = {
  Tabs: undefined;
  LoginWelcome: undefined;
  LoginPassword: { mail: string };
  Register: { mail: string };
  Restaurant: IRestaurants;
  CouponQr: ICouponsItem;
  Influencer: undefined;
  MasterCoupons: undefined;
  Configurations: undefined;
  Help: undefined
};


export type RestaurantScreenProps = StackScreenProps<IAppStackParams, 'Restaurant'>

export type LoginPasswordScreenProps = StackScreenProps<IAppStackParams, 'LoginPassword'>

export type RegisterScreenProps = StackScreenProps<IAppStackParams, 'Register'>

export type CouponQrScreenProps = StackScreenProps<IAppStackParams, 'CouponQr'>

