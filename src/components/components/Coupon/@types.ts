import { PressableProps } from "react-native"
import { IWalletCouponsReponse } from "../../../services/@types/@coupon-services"


export type ICouponProps = {
  data: IWalletCouponsReponse,
  toggle?: boolean,
  isActiveByToggle?: boolean
} & PressableProps
