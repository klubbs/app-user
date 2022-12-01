import { StackScreenProps } from '@react-navigation/stack';
import { IRestaurants } from '../../components/components_heavy/RestaurantsList/@types';
import { IWalletCouponsReponse } from '../../services/@types/@coupon-services';

export type IAppStackParams = {
  Tabs: undefined;
  LoginWelcome: undefined;
  LoginPassword: { mail: string };
  Register: { mail: string };
  StoreProfile: IRestaurants;
  CouponQr: CouponQrParams;
  Influencer: undefined;
  OffersForInfluencers: undefined;
  Settings: undefined;
  Help: undefined;
  ForgetPassword: { mail: string };
  InfluencerRemoverOffer: { couponId: string };
  CreateCheckin: Omit<IWalletCouponsReponse, 'wallet_id'>;
  OfferPools: { type: 'HIGH' | 'MEDIUM' | 'LOW' };
};

export type StoreScreenProps = StackScreenProps<IAppStackParams, 'StoreProfile'>;

export type LoginPasswordScreenProps = StackScreenProps<IAppStackParams, 'LoginPassword'>;

export type RegisterScreenProps = StackScreenProps<IAppStackParams, 'Register'>;

export type CouponQrScreenProps = StackScreenProps<IAppStackParams, 'CouponQr'>;

export type ForgetPasswordScreenProps = StackScreenProps<IAppStackParams, 'ForgetPassword'>;

export type InfluencerRemoverOfferScreenProps = StackScreenProps<
  IAppStackParams,
  'InfluencerRemoverOffer'
>;

export type CreateCheckinScreenProps = StackScreenProps<IAppStackParams, 'CreateCheckin'>;

export type OfferPoolsScreenProps = StackScreenProps<IAppStackParams, 'OfferPools'>;

// shared params

export type CouponQrParams = IWalletCouponsReponse & { checkoutId?: string };
