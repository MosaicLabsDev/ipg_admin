import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainDashboard } from './components/MainDashboard';
import { MarketingLayout } from './layouts/MarketingLayout';
import { Messages } from './modules/marketing/Messages';
import { Dashboard as MarketingDashboard } from './modules/marketing/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
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
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Main Dashboard Route */}
            <Route path="/" element={
              <ProtectedRoute>
                <MainDashboard />
              </ProtectedRoute>
            } />

            {/* Marketing Routes */}
            <Route path="/marketing" element={
              <ProtectedRoute>
                <MarketingLayout>
                  <MarketingDashboard />
                </MarketingLayout>
              </ProtectedRoute>
            } />
            <Route path="/marketing/messages" element={
              <ProtectedRoute>
                <MarketingLayout>
                  <Messages />
                </MarketingLayout>
              </ProtectedRoute>
            } />
            <Route path="/marketing/contacts" element={
              <ProtectedRoute>
                <MarketingLayout>
                  <div>Contactos (En desarrollo)</div>
                </MarketingLayout>
              </ProtectedRoute>
            } />
            <Route path="/marketing/stats" element={
              <ProtectedRoute>
                <MarketingLayout>
                  <div>Estadísticas (En desarrollo)</div>
                </MarketingLayout>
              </ProtectedRoute>
            } />
            <Route path="/marketing/settings" element={
              <ProtectedRoute>
                <MarketingLayout>
                  <div>Configuración (En desarrollo)</div>
                </MarketingLayout>
              </ProtectedRoute>
            } />

            {/* Placeholder Routes for other departments */}
            <Route path="/ventas" element={
              <ProtectedRoute>
                <div>Ventas (En desarrollo)</div>
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <div>Administración (En desarrollo)</div>
              </ProtectedRoute>
            } />
            <Route path="/rrhh" element={
              <ProtectedRoute>
                <div>RRHH (En desarrollo)</div>
              </ProtectedRoute>
            } />
            <Route path="/operaciones" element={
              <ProtectedRoute>
                <div>Operaciones (En desarrollo)</div>
              </ProtectedRoute>
            } />
            <Route path="/config" element={
              <ProtectedRoute>
                <div>Configuración (En desarrollo)</div>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
