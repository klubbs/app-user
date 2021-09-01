import { IRestaurants } from "../../componentHeavy/restaurantsFlatlist/interfaces";
import { LocationObject } from 'expo-location';

export type ICardEstablishmentProps = { data: IRestaurants } & { onPress: any, userLocation: LocationObject }
