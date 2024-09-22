import React, { PropsWithChildren } from 'react'

import { LocationProvider } from './LocationContext'
import { ModeProvider } from './ModeContext'
import { RouteProvider } from './RouteContext'

const CombinedProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <LocationProvider>
      <ModeProvider>
        <RouteProvider>{children}</RouteProvider>
      </ModeProvider>
    </LocationProvider>
  )
}

export default CombinedProvider
