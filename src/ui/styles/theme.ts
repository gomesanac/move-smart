import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    gray: {
      200: '#E6E6E6',
      300: '#E0E0E0'
    },
    brand: {
      text: '#333333',
      background: '#F5F5F5',
      primary: '#3EB489',
      secondary: '#67B7D1',
      tertiary: '#F7D338'
    }
  }
})

export default theme
