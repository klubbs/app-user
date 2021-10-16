import { GetAllMasterCouponsResponse } from "../../../services/@types/storeServiceTypes"

export type ICardMasterCouponsProps = GetAllMasterCouponsResponse & { onPress?: (isSelected: boolean) => void }
