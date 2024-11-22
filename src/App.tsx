import React, { useEffect } from 'react'

import Header from '@/components/Header'
import Map from '@/components/Map'
import RouteDetails from '@/components/RouteDetails'
import SearchBar from '@/components/SearchBar'
import TransportMode from '@/components/TransportMode'
import { useLocation } from '@/contexts/LocationContext'
import { Box, Container, Flex, useToast } from '@/ui'

import { defaultCoordinates } from './constants/Coordinates'

const App: React.FC = () => {
  const { origin, handleOrigin } = useLocation()

  const toast = useToast()

  useEffect(() => {
    if (navigator.geolocation && !origin) {
      navigator.geolocation.getCurrentPosition(
        position => {
          handleOrigin({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        () => {
          toast({
            title: 'Erro ao obter localização:',
            description: 'Usando coordenadas padrão (São Paulo)',
            status: 'warning',
            duration: 5000,
            isClosable: true
          })

          handleOrigin(defaultCoordinates)
        }
      )
    } else {
      toast({
        title: 'Geolocalização não disponível:',
        description: 'Usando coordenadas padrão (São Paulo)',
        status: 'warning',
        duration: 5000,
        isClosable: true
      })

      handleOrigin(defaultCoordinates)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box bgColor="brand.background" h="100vh">
      <Header />
      <Container>
        <SearchBar />
        <TransportMode />
        <Flex
          flexDirection={['column', 'column', 'row']}
          pb={[4, 0]}
          gap={4}
          alignItems="center"
          justifyContent="center"
        >
          <RouteDetails />
          <Map />
        </Flex>
      </Container>
    </Box>
  )
}

export default App
