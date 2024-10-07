import React, { useEffect } from 'react'

import Header from '@/components/Header'
import Map from '@/components/Map'
import RouteDetails from '@/components/RouteDetails'
import SearchBar from '@/components/SearchBar'
import TransportMode from '@/components/TransportMode'
import { useLocation } from '@/contexts/LocationContext'
import { useRoute } from '@/contexts/RouteContext'
import services from '@/services'
import { Box, Container, useToast } from '@/ui'

import { defaultCoordinates } from './constants/Coordinates'
import { useMode } from './contexts/ModeContext'

const App: React.FC = () => {
  const { origin, handleOrigin, destination} =
    useLocation()
  const { mode } = useMode()
  const { route, handleRoute, setLoading } = useRoute()

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

  useEffect(() => {
    const getRoute = async () => {
      if (origin && destination) {
        setLoading(true)
        const routeData = await services.fetchRouteFromGoogle(
          origin,
          destination,
          mode
        )
        handleRoute(routeData)
      }
    }

    if (origin && destination && !route) {
      getRoute()
    }
  }, [destination, mode, origin, route, handleRoute, setLoading])

  return (
    <Box bgColor="brand.background" h="100vh">
      <Header />
      <Container>
        <SearchBar />
        <TransportMode />
        <Map />
        <RouteDetails />
      </Container>
    </Box>
  )
}

export default App
