import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import './index.css'
import { refreshStorageStatus } from './lib/backup'
import { installErrorLogging } from './lib/errorLog'

installErrorLogging()
void refreshStorageStatus()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
