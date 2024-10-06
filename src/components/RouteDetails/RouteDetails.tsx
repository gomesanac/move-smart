import React from 'react'

import {
  carMode,
  modeEnvironmentalImpact,
  modeCost
} from '@/constants/TransportMode'
import { useMode } from '@/contexts/ModeContext'
import { useRoute } from '@/contexts/RouteContext'

const RouteDetails: React.FC= () => {
  const { duration, distance } = useRoute()
  const { mode } = useMode()

  const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)
    return `${hours > 0 ? hours + 'h ' : ''}${minutes}min`
  }

  const formatDistance = (distance: number) => {
    return (distance / 1000).toFixed(2)
  }

  const calculateEnvironmentalImpact = (mode: string, distance: number) => {
    const co2PerKm = modeEnvironmentalImpact[mode]
    return ((co2PerKm * distance) / 1000).toFixed(2)
  }

  const calculateCost = (mode: string, distance: number) => {
    const costPerKm = modeCost[mode]
    return ((costPerKm * distance) / (1000 * carMode.autonomy)).toFixed(2)
  }

  if (!duration || !distance) return null

  return (
    <div>
      <h3>Detalhes da Rota</h3>
      <p>
        <strong>Duração:</strong> {formatDuration(duration)}
      </p>
      <p>
        <strong>Distância:</strong> {formatDistance(distance)} km
      </p>
      <p>
        <strong>Custo Estimado:</strong> R$ {calculateCost(mode, distance)}
      </p>
      <p>
        <strong>Impacto Ambiental:</strong>{' '}
        {calculateEnvironmentalImpact(mode, distance)} kg de CO₂
      </p>
    </div>
  )
}

export default RouteDetails
