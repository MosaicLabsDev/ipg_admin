import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/tiptap/styles.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode style={{ width: '100%', height: '100%' }}>
    <App />
  </StrictMode>,
)
