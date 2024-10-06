import React from 'react'

import { Polyline } from 'react-leaflet'

import { Coordinates } from '@/services'

interface RouteMapProps {
  route: Coordinates[] | null
}

const RouteMap: React.FC<RouteMapProps> = ({ route }) => {
  if (!route) return null

  return <Polyline positions={route} color="blue" />
}

export default RouteMap
