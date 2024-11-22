import React from 'react'

import { transportModes } from '@/constants/TransportMode'
import { useLocation } from '@/contexts/LocationContext'
import { useMode } from '@/contexts/ModeContext'
import { useRoute } from '@/contexts/RouteContext'
import { Box, Select, Text } from '@/ui'

const TransportMode: React.FC = () => {
  const { mode, handleMode } = useMode()
  const { origin, destination } = useLocation()
  const { handleRoute } = useRoute()

  const modes = [
    { label: 'Carro', value: transportModes.driving, id: 1 },
    { label: 'Caminhada', value: transportModes.walking, id: 2 },
    { label: 'Bicicleta', value: transportModes.bicycling, id: 3 },
    { label: 'Transporte público', value: transportModes.transit, id: 4 }
  ]

  const handleSelect = async (mode: string) => {
    handleMode(mode)

    if (origin && destination) {
      handleRoute({
        origin: origin,
        destination: destination,
        mode
      })
    }
  }

  return (
    <Box mb={6}>
      <Text color="brand.text" mb={2}>
        Modo de Transporte:
      </Text>
      <Select value={mode} onChange={e => handleSelect(e.target.value)}>
        {modes.map(({ value, label, id }) => (
          <option key={id} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </Box>
  )
}

export default TransportMode
