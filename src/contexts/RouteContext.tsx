/* eslint-disable react-refresh/only-export-components */
import React, { createContext, PropsWithChildren, useContext, useState } from 'react'

import { RouteResponse } from '@/services'

interface RouteContextProps {
  route: string | null
  duration: number | null
  distance: number | null
  handleRoute: (route: RouteResponse | null) => void
  loading: boolean,
  setLoading: (loading: boolean) => void
}

const RouteContext = createContext({} as RouteContextProps)

export const RouteProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [route, setRoute] = useState<string | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [distance, setDistance] = useState<number | null>(null)

  const handleRoute = (route: RouteResponse | null) => {
    setRoute(route?.coordinates || null)
    setDuration(route?.duration|| null)
    setDistance(route?.distance || null)
    setLoading(false)
  }

  return (
    <RouteContext.Provider
      value={{ route, duration, distance, handleRoute, loading, setLoading }}
    >
      {children}
    </RouteContext.Provider>
  )
}

export const useRoute = () => useContext(RouteContext)
