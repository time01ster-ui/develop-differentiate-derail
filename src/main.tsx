import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { TierProvider } from './components/TierContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TierProvider>
      <App />
    </TierProvider>
  </StrictMode>,
)
