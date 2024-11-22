import React from 'react'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import RouteMap from '@/components/RouteMap'
import { useLocation } from '@/contexts/LocationContext'
import { useRoute } from '@/contexts/RouteContext'
import { Flex, Spinner } from '@/ui'

import customIcon from './Icon'

const Map: React.FC = () => {
  const { origin, destination } = useLocation()
  const { route, loading } = useRoute()

  if (loading || !origin) {
    return (
      <Flex justifyContent="center" px={6} py={12}>
        <Spinner
          size="xl"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.tertiary"
        />
      </Flex>
    )
  }

  return (
    <MapContainer
      center={origin}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {origin && (
        <Marker position={origin} icon={customIcon}>
          <Popup>Origem</Popup>
        </Marker>
      )}
      {destination && (
        <Marker position={destination} icon={customIcon}>
          <Popup>Destino</Popup>
        </Marker>
      )}
      {route && <RouteMap route={route} />}
    </MapContainer>
  )
}

export default Map
