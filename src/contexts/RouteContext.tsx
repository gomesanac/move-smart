/* eslint-disable react-refresh/only-export-components */
import React, { createContext, PropsWithChildren, useContext, useState } from 'react'

import services, { Coordinates } from '@/services'

type HandleRouteProps = {
  origin: Coordinates
  destination: Coordinates
  mode: string
}

interface RouteContextProps {
  route: string | null
  duration: number | null
  distance: number | null
  handleRoute: (props: HandleRouteProps) => Promise<void>
  error: boolean
  loading: boolean
}

const RouteContext = createContext({} as RouteContextProps)

export const RouteProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [route, setRoute] = useState<string | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [distance, setDistance] = useState<number | null>(null)

  const handleRoute = async ({origin, destination, mode}: HandleRouteProps) => {
    setLoading(true)

    try {
      const routeData = await services.fetchRouteFromGoogle(
        origin,
        destination,
        mode
      )

      setRoute(routeData?.coordinates || null)
      setDuration(routeData?.duration || null)
      setDistance(routeData?.distance || null)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <RouteContext.Provider
      value={{ route, duration, distance, handleRoute, loading, error }}
    >
      {children}
    </RouteContext.Provider>
  )
}

export const useRoute = () => useContext(RouteContext)
