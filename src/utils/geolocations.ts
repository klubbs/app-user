import getDistance from 'geolib/es/getDistance';


export function distanceInKm(lat1: number, long1: number, lat2: number, long2: number): number {
  return getDistance(
    { latitude: lat1, longitude: long1 },
    { latitude: lat2, longitude: long2 },
    1) / 1000
}
