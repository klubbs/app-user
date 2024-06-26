import { StackScreenProps } from '@react-navigation/stack';
import { IRestaurants } from '../../components/components_heavy/RestaurantsList/@types';
import { IWalletCouponsReponse } from '../../services/@types/@coupon-services';

export type IAppStackParams = {
  Tabs: undefined;
  LoginWelcome: undefined;
  LoginPassword: { mail: string };
  Register: { mail: string };
  StoreProfile: IRestaurants;
  CouponQr: IWalletCouponsReponse & { checkoutId?: string };
  Influencer: undefined;
  OffersForInfluencers: undefined;
  Settings: undefined;
  Help: undefined;
  ForgetPassword: { mail: string };
  InfluencerRemoverOffer: { couponId: string };
  CreateCheckin: Omit<IWalletCouponsReponse, 'wallet_id'> & {
    flux: 'KLUBBS_FLUX' | 'NORMAL_FLUX';
  };
  OfferPools: { type: 'HIGH' | 'MEDIUM' | 'LOW' };
};

export type StoreScreenProps = StackScreenProps<IAppStackParams, 'StoreProfile'>;

export type LoginPasswordScreenProps = StackScreenProps<IAppStackParams, 'LoginPassword'>;

export type RegisterScreenProps = StackScreenProps<IAppStackParams, 'Register'>;

export type CouponQrScreenProps = StackScreenProps<IAppStackParams, 'CouponQr'>;

export type ForgetPasswordScreenProps = StackScreenProps<IAppStackParams, 'ForgetPassword'>;

export type CreateCheckinScreenProps = StackScreenProps<IAppStackParams, 'CreateCheckin'>;

export type OfferPoolsScreenProps = StackScreenProps<IAppStackParams, 'OfferPools'>;

export type InfluencerRemoverOfferScreenProps = StackScreenProps<
  IAppStackParams,
  'InfluencerRemoverOffer'
>;
