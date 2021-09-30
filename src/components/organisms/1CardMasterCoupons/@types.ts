import { GetAllMasterCouponsResponse } from "../../../services/@types/storeServiceTypes"

export type ICardMasterCouponsProps = GetAllMasterCouponsResponse & { onPress: (value: boolean, masterCouponId: string, establishmentId: string) => void }
