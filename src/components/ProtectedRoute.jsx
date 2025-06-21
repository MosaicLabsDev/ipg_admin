import { useAuth } from '../contexts/AuthContext';
import { LoginScreen } from './LoginScreen';
import { LoadingOverlay } from '@mantine/core';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, login } = useAuth();

  if (loading) {
    return <LoadingOverlay visible={true} />;
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={login} />;
  }

  return children;
} 