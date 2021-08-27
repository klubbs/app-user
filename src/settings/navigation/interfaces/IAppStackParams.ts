import { StackScreenProps } from "@react-navigation/stack";
import { IWalletCouponsReponse } from "../../../services/interfaces/icoupon";

export type IAppStackParams = {
  Tabs: undefined;
  LoginWelcome: undefined;
  LoginPassword: { mail: string };
  Register: { mail: string };
  Restaurant: { id: string, image: string, name: string; };
  CouponQr: Omit<IWalletCouponsReponse, 'wallet_id'>;
};


export type RestaurantScreenProps = StackScreenProps<IAppStackParams, 'Restaurant'>

export type LoginPasswordScreenProps = StackScreenProps<IAppStackParams, 'LoginPassword'>

export type RegisterScreenProps = StackScreenProps<IAppStackParams, 'Register'>

export type CouponQrScreenProps = StackScreenProps<IAppStackParams, 'CouponQr'>

