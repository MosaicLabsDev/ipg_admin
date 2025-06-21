import { memo } from 'react';
import { Box, Text, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

const PhoneNumberItem = memo(function PhoneNumberItem({ phone, onRemove }) {
  return (
    <Box
      style={{
        border: '1px solid var(--color-secondary)',
        borderRadius: '4px',
        padding: '8px 12px',
        backgroundColor: 'var(--color-secondary-light)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
      }}
    >
      <Text size="sm" style={{ flex: 1 }}>{phone}</Text>
      <ActionIcon
        color="red"
        variant="subtle"
        onClick={() => onRemove(phone)}
        size="sm"
      >
        <IconTrash size={14} />
      </ActionIcon>
    </Box>
  );
});

export { PhoneNumberItem }; 