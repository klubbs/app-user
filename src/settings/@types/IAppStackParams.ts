import { StackScreenProps } from "@react-navigation/stack";
import { IRestaurants } from "../../components/componentHeavy/restaurantsFlatlist/interfaces";
import { IWalletCouponsReponse } from "../../services/@types/ICoupon";

export type IAppStackParams = {
  Tabs: undefined;
  LoginWelcome: undefined;
  LoginPassword: { mail: string };
  Register: { mail: string };
  Restaurant: IRestaurants;
  CouponQr: Omit<IWalletCouponsReponse, 'wallet_id'>;
};


export type RestaurantScreenProps = StackScreenProps<IAppStackParams, 'Restaurant'>

export type LoginPasswordScreenProps = StackScreenProps<IAppStackParams, 'LoginPassword'>

export type RegisterScreenProps = StackScreenProps<IAppStackParams, 'Register'>

export type CouponQrScreenProps = StackScreenProps<IAppStackParams, 'CouponQr'>

