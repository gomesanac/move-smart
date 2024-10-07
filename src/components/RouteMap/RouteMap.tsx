import React, { useEffect } from 'react'

import { LatLngBoundsExpression } from 'leaflet'
import polyline from 'polyline'
import { Polyline, useMap } from 'react-leaflet'

interface RouteMapProps {
  route: string
}

const RouteMap: React.FC<RouteMapProps> = ({ route }) => {
  const map = useMap()

  const decodedPolyline = polyline.decode(route)

  useEffect(() => {
    if (decodedPolyline.length > 0) {
      const bounds: LatLngBoundsExpression = decodedPolyline.map(
        ([lat, lng]) => [lat, lng]
      )
      map.fitBounds(bounds)
    }
  }, [decodedPolyline, map])

  if (!route) return null

  return (
    <Polyline
      positions={decodedPolyline.map(([lat, lng]) => [lat, lng])}
      color="blue"
    />
  )
}

export default RouteMap
