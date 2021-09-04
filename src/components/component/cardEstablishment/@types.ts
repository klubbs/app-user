import { IRestaurants } from "../../componentHeavy/restaurantsList/interfaces";
import { LocationObject } from 'expo-location';

export type ICardEstablishmentProps = { data: IRestaurants } & { onPress: any, userLocation: LocationObject | undefined }
