import { StackScreenProps } from "@react-navigation/stack";
import { IRestaurants } from "../../components/components_heavy/RestaurantsList/@types";
import { ICouponsItem } from "../../components/components_heavy/WalletCouponsTab/@types";

export type IAppStackParams = {
  Tabs: undefined;
  LoginWelcome: undefined;
  LoginPassword: { mail: string };
  Register: { mail: string };
  Restaurant: IRestaurants;
  CouponQr: ICouponsItem;
  Influencer: undefined;
  Offers: undefined;
  Configurations: undefined;
  Help: undefined;
  ForgetPassword: { mail: string }
};


export type RestaurantScreenProps = StackScreenProps<IAppStackParams, 'Restaurant'>

export type LoginPasswordScreenProps = StackScreenProps<IAppStackParams, 'LoginPassword'>

export type RegisterScreenProps = StackScreenProps<IAppStackParams, 'Register'>

export type CouponQrScreenProps = StackScreenProps<IAppStackParams, 'CouponQr'>

export type ForgetPasswordScreenProps = StackScreenProps<IAppStackParams, 'ForgetPassword'>

