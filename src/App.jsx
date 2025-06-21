import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainDashboard } from './components/MainDashboard';
import { MarketingLayout } from './layouts/MarketingLayout';
import { Messages } from './modules/marketing/Messages';
import { Dashboard as MarketingDashboard } from './modules/marketing/Dashboard';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const theme = {
  primaryColor: 'blue',
  colors: {
    blue: [
      '#E3F2FD',
      '#BBDEFB',
      '#90CAF9',
      '#64B5F6',
      '#42A5F5',
      '#2196F3',
      '#1E88E5',
      '#1976D2',
      '#1565C0',
      '#0D47A1',
    ],
  },
};

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <BrowserRouter>
        <Routes>
          {/* Main Dashboard Route */}
          <Route path="/" element={<MainDashboard />} />

          {/* Marketing Routes */}
          <Route path="/marketing" element={
            <MarketingLayout>
              <MarketingDashboard />
            </MarketingLayout>
          } />
          <Route path="/marketing/messages" element={
            <MarketingLayout>
              <Messages />
            </MarketingLayout>
          } />
          <Route path="/marketing/contacts" element={
            <MarketingLayout>
              <div>Contactos (En desarrollo)</div>
            </MarketingLayout>
          } />
          <Route path="/marketing/stats" element={
            <MarketingLayout>
              <div>Estadísticas (En desarrollo)</div>
            </MarketingLayout>
          } />
          <Route path="/marketing/settings" element={
            <MarketingLayout>
              <div>Configuración (En desarrollo)</div>
            </MarketingLayout>
          } />

          {/* Placeholder Routes for other departments */}
          <Route path="/ventas" element={<div>Ventas (En desarrollo)</div>} />
          <Route path="/admin" element={<div>Administración (En desarrollo)</div>} />
          <Route path="/rrhh" element={<div>RRHH (En desarrollo)</div>} />
          <Route path="/operaciones" element={<div>Operaciones (En desarrollo)</div>} />
          <Route path="/config" element={<div>Configuración (En desarrollo)</div>} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
