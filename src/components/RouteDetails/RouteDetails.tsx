import React from 'react'

import {
  carMode,
  modeEnvironmentalImpact,
  modeCost,
  transportModes
} from '@/constants/TransportMode'
import { useMode } from '@/contexts/ModeContext'
import { useRoute } from '@/contexts/RouteContext'
import { Box, Text } from '@/ui'

const RouteDetails: React.FC= () => {
  const { duration, distance, loading } = useRoute()
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

    if (mode === transportModes.driving)
      return ((costPerKm * distance) / (1000 * carMode.autonomy)).toFixed(2)

    if (mode === transportModes.transit)
      return costPerKm

    return costPerKm
  }

  if (!duration || !distance || loading) return null

  return (
    <Box>
      <Box mb={2}>
        <Text fontSize="lg" as="b">
          Detalhes da Rota
        </Text>
      </Box>
      <Text>
        <Text as="b">Duração:</Text> {formatDuration(duration)}
      </Text>
      <Text>
        <Text as="b">Distância:</Text> {formatDistance(distance)} km
      </Text>
      <Text>
        <Text as="b">Custo Estimado:</Text> R$ {calculateCost(mode, distance)}
      </Text>
      <Text>
        <Text as="b">Impacto Ambiental: </Text>
        {calculateEnvironmentalImpact(mode, distance)} kg de CO₂
      </Text>
    </Box>
  )
}

export default RouteDetails
