import { openRouteServiceApiKey } from '../constants/Envs'
import { Coordinates, RouteResponse } from './services.types'

const fetchRoute = async (
  origin: Coordinates,
  destination: Coordinates,
  mode: string
): Promise<RouteResponse | null> => {
  const apiKey = openRouteServiceApiKey

  const response = await fetch(
    `https://api.openrouteservice.org/v2/directions/${mode}?api_key=${apiKey}&start=${origin.lng},${origin.lat}&end=${destination.lng},${destination.lat}`
  )

  if (!response.ok) {
    throw new Error('Error fetching the route')
  }

  const data = await response.json()

  if (data && data.features.length > 0) {
    return {
      coordinates: data.features[0].geometry.coordinates.map(
        (coord: [number, number]) => ({
          lat: coord[1],
          lng: coord[0]
        })
      ),
      duration: data.features[0].properties.segments[0].duration,
      distance: data.features[0].properties.segments[0].distance
    }
  }

  return null
}

const fetchCoordinates = async (
  location: string
): Promise<{ lat: number; lng: number } | undefined> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}`
    )

    const data = await response.json()

    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
    } else {
      return undefined
    }
  } catch (error) {
    console.error('Erro ao buscar coordenadas:', error)
    return undefined
  }
}

export default { fetchRoute, fetchCoordinates }
