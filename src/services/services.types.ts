export interface Coordinates {
  lat: number
  lng: number
}

export interface RouteResponse {
  coordinates: Coordinates[]
  duration: number
  distance: number
}
