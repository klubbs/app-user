import { GetAllOffersResponse } from "../../../services/@types/storeServiceTypes"

export type ICardOffersProps = GetAllOffersResponse & { onPress?: (isSelected: boolean) => void }
