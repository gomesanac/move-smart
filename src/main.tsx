import 'leaflet/dist/leaflet.css'

import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import { LayoutProvider } from '@/ui'

import App from './App.tsx'
import CombinedProvider from './contexts/CombinedProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LayoutProvider>
      <CombinedProvider>
        <App />
      </CombinedProvider>
    </LayoutProvider>
  </StrictMode>
)
