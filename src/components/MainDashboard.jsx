import { Container, Title, SimpleGrid, Card, Text, Group, Stack, Button, Menu } from '@mantine/core';
import { IconMessage, IconUsers, IconSettings, IconBuilding, IconCash, IconClipboardList, IconLogout, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function MainDashboard() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const departments = [
    {
      title: 'Marketing',
      description: 'Gestión de campañas y comunicación',
      icon: <IconMessage size={32} />,
      color: '#007DB3',
      path: '/marketing'
    },
    {
      title: 'Ventas',
      description: 'Gestión de clientes y oportunidades',
      icon: <IconCash size={32} />,
      color: '#007DB3',
      path: '/ventas'
    },
    {
      title: 'Administración',
      description: 'Gestión administrativa y contable',
      icon: <IconClipboardList size={32} />,
      color: '#007DB3',
      path: '/admin'
    },
    {
      title: 'Recursos Humanos',
      description: 'Gestión del personal y nómina',
      icon: <IconUsers size={32} />,
      color: '#007DB3',
      path: '/rrhh'
    },
    {
      title: 'Operaciones',
      description: 'Gestión de operaciones y logística',
      icon: <IconBuilding size={32} />,
      color: '#007DB3',
      path: '/operaciones'
    },
    {
      title: 'Configuración',
      description: 'Ajustes del sistema',
      icon: <IconSettings size={32} />,
      color: '#007DB3',
      path: '/config'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container size="xl" style={{ paddingBottom: 32, height: '100%', minHeight: '100vh' }}>
      <Stack spacing="xl">
        {/* Banner Section */}
        <div style={{ 
          background: '#007DB3', 
          padding: '2rem', 
          borderRadius: '0 0 8px 8px',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Group justify="space-between" align="center">
            <Stack spacing="xs">
              <Title order={1} c="white">IPG Iribarren</Title>
              <Text c="white" size="lg">Panel de Control Administrativo</Text>
            </Stack>
            <Group>
              <img
                src="https://i.imgur.com/Q7TfbvU.png"
                alt="IPG Iribarren"
                width={150}
              />
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button variant="white" leftSection={<IconUser size="1rem" />}>
                    {currentUser}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconLogout size="1rem" />}
                    onClick={handleLogout}
                    color="red"
                  >
                    Cerrar Sesión
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </div>

        {/* Departments Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {departments.map((dept) => (
            <Card
              key={dept.title}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ 
                transition: 'transform 0.2s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
              onClick={() => navigate(dept.path)}
            >
              <Stack align="center" spacing="md">
                <div style={{ color: dept.color }}>
                  {dept.icon}
                </div>
                <Text fw={500} size="lg" ta="center">
                  {dept.title}
                </Text>
                <Text size="sm" c="dimmed" ta="center">
                  {dept.description}
                </Text>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
} 