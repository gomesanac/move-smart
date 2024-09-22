/* eslint-disable react-refresh/only-export-components */
import React, { createContext, PropsWithChildren, useContext, useState } from 'react'

import { Coordinates } from '@/services'

interface LocationContextProps {
  origin: Coordinates | null
  handleOrigin: (origin: Coordinates) => void
  destination: Coordinates | null
  handleDestination: (destination: Coordinates) => void
}

const LocationContext = createContext({} as LocationContextProps)

export const LocationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [origin, setOrigin] = useState<Coordinates | null>(null)
  const [destination, setDestination] = useState<Coordinates | null>(null)

  const handleOrigin = (origin: Coordinates) => {
    setOrigin(origin)
  }

  const handleDestination = (destination: Coordinates) => {
    setDestination(destination)
  }

  return (
    <LocationContext.Provider
      value={{ origin, handleOrigin, destination, handleDestination }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export const useLocation = () => useContext(LocationContext)
