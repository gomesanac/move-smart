import React from 'react'

import { useMode } from '@/contexts/ModeContext'
import { Box, Select, Text } from '@/ui'



const TransportMode: React.FC = () => {
  const { mode, handleMode } = useMode()

  const modes = [
    { label: 'Carro', value: 'driving-card', id: 1 },
    { label: 'Caminhada', value: 'foot-walking', id: 2 },
    { label: 'Bicicleta', value: 'cycling-regular', id: 3 }
  ]

  return (
    <Box mb={6}>
      <Text color="brand.text" mb={2}>
        Modo de Transporte:
      </Text>
      <Select
        value={mode}
        onChange={e => handleMode(e.target.value)}
      >
        {modes.map(({ value, label, id }) => (
          <option key={id} value={value}>{label}</option>
        ))}
      </Select>
    </Box>
  )
}

export default TransportMode
