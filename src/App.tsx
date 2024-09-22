import React, { useEffect } from 'react'

import Header from '@/components/Header'
import Map from '@/components/Map'
import SearchBar from '@/components/SearchBar'
import TransportMode from '@/components/TransportMode'
import { useLocation } from '@/contexts/LocationContext'
import { useRoute } from '@/contexts/RouteContext'
import services from '@/services'
import { Box, Container } from '@/ui'

import { defaultCoordinates } from './constants/Coordinates'
import { useMode } from './contexts/ModeContext'


const App: React.FC = () => {
  const { origin, handleOrigin, destination} =
    useLocation()
  const { mode } = useMode()
  const { route, handleRoute } = useRoute()

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
          handleOrigin(defaultCoordinates)
        }
      )
    } else {
      handleOrigin(defaultCoordinates)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const getRoute = async () => {
      if (origin && destination) {
        const routeData = await services.fetchRoute(origin, destination, mode)
        handleRoute(routeData)
      }
    }

    if (origin && destination && !route) {
      getRoute()
    }
  }, [destination, mode, origin, route, handleRoute])

  return (
    <Box bgColor="brand.background" h="100vh">
      <Header />
      <Container>
        <SearchBar />
        <TransportMode />
        <Map />
      </Container>
    </Box>
  )
}

export default App
