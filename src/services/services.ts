import axios from 'axios';

import { moveSmartApi } from '@/constants/Envs';

import { RouteResponse } from './services.types'

const fetchRouteFromGoogle = async (
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  mode: string
): Promise<RouteResponse | null> => {
  try {
    const { data } = await axios.get(`${moveSmartApi}/directions`, {
      params: {
        origin: `${origin.lat},${origin.lng}`,
        destination: `${destination.lat},${destination.lng}`,
        mode
      }
    })

    return data
  } catch (error) {
    console.error('Erro ao buscar rota:', error)
    throw error
  }
}


export default { fetchRouteFromGoogle }
