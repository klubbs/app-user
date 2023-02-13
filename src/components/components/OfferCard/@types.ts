import { GetAllOffersResponse } from '../../../services/@types/@store-services';

export type ICardOffersProps = GetAllOffersResponse & { onPress?: (isSelected: boolean) => void };
