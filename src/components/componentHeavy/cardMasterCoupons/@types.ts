export type ICardMasterCoupons = {
  masterCouponId: string
  validAt: number
  establishment: string
  off: number
  description: string
  onPress: (value: boolean, masterCouponId: string) => void
}
