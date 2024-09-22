/* eslint-disable react-refresh/only-export-components */
import React, { createContext, PropsWithChildren, useContext, useState } from 'react'

import { Coordinates } from '@/services'

interface RouteContextProps {
  route: Coordinates[] | null
  handleRoute: (route: Coordinates[]) => void
}

const RouteContext = createContext({} as RouteContextProps)

export const RouteProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [route, setRoute] = useState<Coordinates[] | null>(null)

  const handleRoute = (route: Coordinates[]) => {
    setRoute(route)
  }

  return (
    <RouteContext.Provider
      value={{ route, handleRoute }}
    >
      {children}
    </RouteContext.Provider>
  )
}

export const useRoute = () => useContext(RouteContext)
