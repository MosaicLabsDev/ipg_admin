import { useState } from 'react';
import { 
  Container, 
  Paper, 
  TextInput, 
  PasswordInput, 
  Button, 
  Title, 
  Text, 
  Stack,
  Alert,
  Center
} from '@mantine/core';
import { IconAlertCircle, IconLogin } from '@tabler/icons-react';

export function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const acceptedUsers = import.meta.env.VITE_ACCEPTED_USERS?.split(',') || ['ipg_marketing'];
  const acceptedPasswords = import.meta.env.VITE_ACCEPTED_PASSWORDS?.split(',') || ['carla'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 500));

    // Verificar credenciales
    const userIndex = acceptedUsers.findIndex(user => user.trim() === username.trim());
    
    if (userIndex !== -1 && acceptedPasswords[userIndex]?.trim() === password.trim()) {
      // Login exitoso
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', username);
      onLogin(username);
    } else {
      setError('Usuario o contraseña incorrectos');
    }
    
    setLoading(false);
  };

  return (
    <Container size="xs" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper shadow="md" p="xl" radius="md" style={{ width: '100%' }}>
        <Center mb="lg">
          <Title order={2} ta="center">
            Iniciar Sesión
          </Title>
        </Center>
        
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            {error && (
              <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
                {error}
              </Alert>
            )}
            
            <TextInput
              label="Usuario"
              placeholder="Ingrese su usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
            
            <PasswordInput
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            
            <Button 
              type="submit" 
              fullWidth 
              loading={loading}
              leftSection={<IconLogin size="1rem" />}
            >
              Iniciar Sesión
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
} 