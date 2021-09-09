import { PressableProps } from "react-native"

export type ICouponPropsData = {
  coupon_id: string
  coupon_code: string
  influencer_image: string
  master_coupons: { master_coupon_off_percentual: number }[]
}


export type ICouponProps = { data: ICouponPropsData, toggle?: boolean, isActiveByToggle?: boolean } & PressableProps
