import React, { PropsWithChildren } from 'react'

import { ChakraProvider } from '@chakra-ui/react'

import theme from './theme'

const LayoutProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

export default LayoutProvider
