/* eslint-disable react-refresh/only-export-components */
import React, { createContext, PropsWithChildren, useContext, useState } from 'react'

interface ModeContextProps {
  mode: string
  handleMode: (mode: string) => void
}

export const ModeContext = createContext({} as ModeContextProps)

export const ModeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<string>('driving')

  const handleMode = (mode: string) => {
    setMode(mode)
  }

  return (
    <ModeContext.Provider
      value={{ mode, handleMode }}
    >
      {children}
    </ModeContext.Provider>
  )
}

export const useMode = () => useContext(ModeContext)
