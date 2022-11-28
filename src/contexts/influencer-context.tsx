import React, { createContext, useState } from 'react';
import { CouponAndOffersByInfluencerResponse } from '../components/modals/modal-coupons-partners/@types';
import { InfluencerService } from '../services/influencer-service';
import { NotificationsFlash } from '../utils/flash-notifications';

export const InfluencerContext = createContext(
  {} as {
    coupons: CouponAndOffersByInfluencerResponse[];
    removeOffer: (couponId: string, offerId: string) => void;
    getAllCoupons: () => Promise<void>;
  },
);

const InfluencerProvider: React.FC = ({ children }) => {
  const [coupons, setCoupons] = useState<CouponAndOffersByInfluencerResponse[]>([]);

  async function getAllCoupons() {
    try {
      const response = await InfluencerService.getAllCouponsByInfluencer();

      setCoupons(response);
    } catch (error) {
      NotificationsFlash.spillCoffee();
    }
  }

  function removeOffer(couponId: string, offerId: string) {
    getAllCoupons();

    const index = coupons.findIndex((i) => i.coupon_id === couponId);

    const coupon = coupons[index];

    const offerIndex = coupon.offers.findIndex((i) => i.offer_id === offerId);

    coupon.offers.splice(offerIndex, 1);

    setCoupons(coupons);
  }

  return (
    <InfluencerContext.Provider value={{ coupons, removeOffer, getAllCoupons }}>
      {children}
    </InfluencerContext.Provider>
  );
};

export { InfluencerProvider };
