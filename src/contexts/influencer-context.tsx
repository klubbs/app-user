import React, { createContext, useState } from "react"
import { GetAllCouponsByInfluencerResponse } from "../components/modals/modal-coupons-partners/@types"
import { InfluencerService } from "../services/influencer-service"


export const InfluencerContext = createContext({} as {
    coupons: GetAllCouponsByInfluencerResponse[],
    removeOffer: (couponId: string, offerId: string) => void,
    getAllCoupons: () => Promise<void>
})

const InfluencerProvider: React.FC = ({ children }) => {

    const [coupons, setCoupons] = useState<GetAllCouponsByInfluencerResponse[]>([])


    async function getAllCoupons() {
        try {

            const response = await InfluencerService.getAllCouponsByInfluencer()

            setCoupons(response)

        } catch (error) {

        }
    }

    function removeOffer(couponId: string, offerId: string) {

        getAllCoupons()

        const index = coupons.findIndex(i => i.coupon_id === couponId);

        const coupon = coupons[index]

        const offerIndex = coupon.master_coupons.findIndex(i => i.master_coupon_id === offerId)

        coupon.master_coupons.splice(offerIndex, 1)

        setCoupons(coupons)
    }

    return (
        <InfluencerContext.Provider value={{ coupons, removeOffer, getAllCoupons }}>
            {children}
        </InfluencerContext.Provider>
    );

}


export { InfluencerProvider }