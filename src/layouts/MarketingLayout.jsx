import { AppShell, Burger, Group, Title, Text, NavLink, Stack, Image } from '@mantine/core';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconMessage, IconUsers, IconChartBar, IconSettings, IconHome } from '@tabler/icons-react';

export function MarketingLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  const navItems = [
    { icon: <IconHome size={16} />, label: 'Dashboard', path: '/marketing' },
    { icon: <IconMessage size={16} />, label: 'Mensajes', path: '/marketing/messages' },
    { icon: <IconUsers size={16} />, label: 'Contactos', path: '/marketing/contacts' },
    { icon: <IconChartBar size={16} />, label: 'Estadísticas', path: '/marketing/stats' },
    { icon: <IconSettings size={16} />, label: 'Configuración', path: '/marketing/settings' },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header
        style={{ backgroundColor: 'var(--color-background-dark)', borderBottom: '1px solid var(--color-background-dark)' }}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom="sm" size="sm" />
          <Group>
            <img 
              src="https://ipgiribarren.com.ar/logo.png" 
              alt="IPG Iribarren" 
              style={{ height: '40px' }} 
            />
            <Title order={3} c="var(--color-text-primary)">Marketing</Title>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" style={{ backgroundColor: 'var(--color-background-dark)', borderRight: '1px solid var(--color-background-dark)' }}>
        <Stack>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              label={item.label}
              leftSection={item.icon}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              style={{ color: 'var(--color-text-primary)', borderRadius: '8px' }}
              styles={{
                label: {
                  color: 'var(--color-text-primary)'
                },
                leftSection: {
                  color: 'var(--color-text-primary)'
                }

              }}
              classNames={{
                root: 'marketing-nav-link',
              }}
            />
          ))}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
} 