import { CouponAndOffersByInfluencerResponse } from '../modal-coupons-partners/@types';

export type IModalLinkCouponOffersProps = {
  masterCoupons: { masterCouponId: string; establishmentId: string }[];
};

export type IModalLinkCouponOffersRef = {
  showModal: () => void;
};

export type ICouponInfluencer = CouponAndOffersByInfluencerResponse & { empty?: boolean };
