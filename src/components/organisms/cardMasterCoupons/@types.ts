import { GetAllMasterCouponsResponse } from "../../../services/@types/IStore"

export type ICardMasterCouponsProps = GetAllMasterCouponsResponse & { onPress: (value: boolean, masterCouponId: string, establishmentId: string) => void }
