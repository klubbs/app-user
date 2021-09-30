import { IRestaurants } from "../../organisms/RestaurantsList/@types";
import { LocationObject } from 'expo-location';

export type ICardEstablishmentProps = { data: IRestaurants } & { onPress: any, userLocation: LocationObject | undefined }
