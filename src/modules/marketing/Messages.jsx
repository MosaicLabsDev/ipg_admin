import { useState, useCallback, useMemo } from 'react';
import {
  Container,
  Paper,
  Title,
  TextInput,
  Button,
  Group,
  Stack,
  Text,
  FileInput,
  List,
  ActionIcon,
  Card,
  Divider,
  Badge,
  Grid,
  Box,
} from '@mantine/core';

import { notifications } from '@mantine/notifications';
import { IconTrash, IconUpload, IconSend } from '@tabler/icons-react';
import { RichTextEditorComponent } from '../../components/RichTextEditor';
import { useOptimizedEditor } from '../../hooks/useOptimizedEditor';
import { PhoneNumberItem } from '../../components/PhoneNumberItem';
import { PhoneInput } from '../../components/PhoneInput';

export function Messages() {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [newPhone, setNewPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const editor = useOptimizedEditor();

  const backendUrl = import.meta.env.VITE_BACKEND_SERVER_URL || 'http://localhost:9000';

  const handleAddPhone = useCallback(() => {
    if (newPhone && !phoneNumbers.includes(newPhone)) {
      setPhoneNumbers(prev => [...prev, newPhone]);
      setNewPhone('');
      notifications.show({
        title: 'Número agregado',
        message: 'El número ha sido agregado a la lista',
        color: 'blue',
      });
    }
  }, [newPhone, phoneNumbers]);

  const handleRemovePhone = useCallback((phone) => {
    setPhoneNumbers(prevPhoneNumbers => prevPhoneNumbers.filter(p => p !== phone));
    notifications.show({
      title: 'Número eliminado',
      message: 'El número ha sido eliminado de la lista',
      color: 'green',
    });
  }, []);

  const handleFileUpload = useCallback((file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const numbers = content
          .split(/[\n,]/)
          .map((n) => n.trim())
          .filter((n) => n && !phoneNumbers.includes(n));
        setPhoneNumbers(prev => [...prev, ...numbers]);
        notifications.show({
          title: 'Archivo procesado',
          message: `${numbers.length} números han sido agregados`,
          color: 'blue',
        });
      };
      reader.readAsText(file);
    }
  }, [phoneNumbers]);

  const handleSend = useCallback(async () => {
    if (!editor?.getText() && !editor?.getHTML().includes('img')) {
      notifications.show({
        title: 'Error',
        message: 'Por favor, escribe un mensaje o agrega una imagen',
        color: 'red',
      });
      return;
    }

    if (phoneNumbers.length === 0) {
      notifications.show({
        title: 'Error',
        message: 'Por favor, agrega al menos un número de teléfono',
        color: 'red',
      });
      return;
    }

    setIsLoading(true);
    try {
      const editorContent = editor.getHTML();
      const hasImage = editorContent.includes('img');
      let base64Image = '';
      let caption = '';

      if (hasImage) {
        // Extract base64 image and caption
        const imgMatch = editorContent.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch) {
          base64Image = imgMatch[1];
          // Get text content as WhatsApp formatted text
          caption = editor.getWhatsAppContent();
        }
      }

      const endpoint = hasImage ? '/messages/send-media/bulk' : '/messages/send/bulk';
      const body = hasImage ? {
        phoneNumbers,
        mediaData: {
          mediaType: 'image',
          fileName: 'imagen.jpg',
          caption,
          media: base64Image
        }
      } : {
        message: editor.getWhatsAppContent(),
        phoneNumbers
      };

      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        notifications.show({
          title: 'Éxito',
          message: `Se ha iniciado el proceso de envío de mensajes a ${phoneNumbers.length} números`,
          color: 'green',
        });
        //editor.commands.setContent('');
        //setPhoneNumbers([]);
      } else {
        throw new Error('Error al enviar los mensajes');
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  }, [editor, phoneNumbers]);

  const phoneNumbersList = useMemo(() => {
    return phoneNumbers.map((phone) => (
      <PhoneNumberItem
        key={phone}
        phone={phone}
        onRemove={handleRemovePhone}
      />
    ));
  }, [phoneNumbers, handleRemovePhone]);

  return (
    <Container size="xl" >
      <Stack spacing="xl">
        <Card withBorder shadow="sm" radius="md" style={{ backgroundColor: 'var(--color-card-background)' }}>
          <Stack spacing="md">
            <Title order={2} style={{ color: 'var(--color-text-primary)' }}>Envío de Mensajes</Title>
            <Text c="dimmed">Escribe tu mensaje</Text>
            
            <Divider my="sm" />
            
            <RichTextEditorComponent editor={editor} />
          </Stack>
        </Card>

        <Card withBorder shadow="sm" radius="md" style={{ backgroundColor: 'var(--color-card-background)' }}>
          <Stack spacing="md">
            <Title order={2} style={{ color: 'var(--color-text-primary)' }}>Destinatarios</Title>
            <Text c="dimmed">Agrega los números de teléfono de los destinatarios</Text>
            
            <Divider my="sm" />
            
            <PhoneInput
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              onAdd={handleAddPhone}
            />

            <FileInput
              label="O cargar desde CSV"
              placeholder="Seleccionar archivo"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              leftSection={<IconUpload size={14} />}
              mb="md"
            />

            <Paper withBorder p="md" radius="md" style={{ backgroundColor: 'var(--color-card-background)' }}>
              <Group justify="space-between" mb="md">
                <Text fw={500}>Números agregados</Text>
                <Badge size="lg" variant="light" color="blue">
                  {phoneNumbers.length}
                </Badge>
              </Group>
              
              <Box style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {phoneNumbersList}
              </Box>
              
            </Paper>
          </Stack>
        </Card>

        <Button
          fullWidth
          size="lg"
          onClick={handleSend}
          loading={isLoading}
          leftSection={<IconSend size={20} />}
        >
          Enviar Mensajes
        </Button>
      </Stack>
    </Container>
  );
} 