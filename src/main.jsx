import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RedpyDemoApp from './redpy-demo/App.tsx'

const isDemo = window.location.pathname === '/demo';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isDemo ? <RedpyDemoApp /> : <App />}
  </StrictMode>,
)
