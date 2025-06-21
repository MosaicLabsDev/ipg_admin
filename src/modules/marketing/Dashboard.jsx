import { Container, Title, SimpleGrid, Card, Text, Image, Button, Group, Stack } from '@mantine/core';
import { IconMessage, IconUsers, IconChartBar, IconSettings } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Envío de Mensajes',
      description: 'Envía mensajes masivos a tus contactos',
      icon: <IconMessage size={32} />,
      color: '#007DB3',
      path: '/marketing/messages'
    },
    {
      title: 'Gestión de Contactos',
      description: 'Administra tu base de contactos',
      icon: <IconUsers size={32} />,
      color: '#007DB3',
      path: '/marketing/contacts'
    },
    {
      title: 'Estadísticas',
      description: 'Visualiza el rendimiento de tus campañas',
      icon: <IconChartBar size={32} />,
      color: '#007DB3',
      path: '/marketing/stats'
    },
    {
      title: 'Configuración',
      description: 'Ajusta los parámetros del módulo',
      icon: <IconSettings size={32} />,
      color: '#007DB3',
      path: '/marketing/settings'
    }
  ];

  return (
    <Container size="xl">
      <Stack spacing="xl">
        {/* Banner Section */}
        <div style={{ 
          background: '#007DB3', 
          padding: '2rem', 
          borderRadius: '8px',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Group justify="space-between" align="center">
            <Stack spacing="xs">
              <Title order={1} c="white">Marketing</Title>
              <Text c="white" size="lg">Gestiona tus campañas de comunicación de manera eficiente</Text>
            </Stack>
            <img
              src="https://ipgiribarren.com.ar/logo.png"
              alt="IPG Iribarren"
              width={150}
            />
          </Group>
        </div>

      </Stack>
    </Container>
  );
} 