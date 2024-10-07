import React, { useState } from 'react'

import { useLocation } from '@/contexts/LocationContext'
import { Box, Button, Input, SimpleGrid, Text, useToast } from '@/ui'

const SearchBar: React.FC = () => {
  const { handleOrigin, handleDestination } = useLocation()

  const toast = useToast()

  const [originInput, setOriginInput] = useState<string>('')
  const [destinationInput, setDestinationInput] = useState<string>('')

  const fetchCoordinates = async (
    location: string
  ): Promise<{ lat: number; lng: number } | null> => {
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
        toast({
          title: `Local "${location}" não encontrado!`,
          status: 'warning',
          duration: 5000,
          isClosable: true
        })

        return null
      }
    } catch {
      toast({
        title: 'Erro ao buscar coordenadas.',
        description: 'Tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })

      return null
    }
  }

  const handleSearch = async () => {
    const originCoords = await fetchCoordinates(originInput)
    const destinationCoords = await fetchCoordinates(destinationInput)

    if (originCoords && destinationCoords) {
      handleOrigin(originCoords)
      handleDestination(destinationCoords)
    }
  }

  return (
    <Box mb={4}>
      <Text color="brand.text" mb={2}>Endereço:</Text>
      <SimpleGrid columns={[1, 3]} spacing={3}>
        <Input
          type="text"
          placeholder="Origem (ex: Belo Horizonte)"
          value={originInput}
          onChange={e => setOriginInput(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Destino (ex: São Paulo)"
          value={destinationInput}
          onChange={e => setDestinationInput(e.target.value)}
        />
        <Button onClick={handleSearch} color="brand.text" bgColor="gray.200" _hover={{ bgColor: "gray.300"}}>Pesquisar</Button>
      </SimpleGrid>
    </Box>
  )
}

export default SearchBar
