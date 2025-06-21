import { memo } from 'react';
import { Group, TextInput, Button } from '@mantine/core';

const PhoneInput = memo(function PhoneInput({ 
  value, 
  onChange, 
  onAdd, 
  placeholder = "Ingrese número de teléfono" 
}) {
  return (
    <Group mb="md">
      <TextInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ flex: 1 }}
      />
      <Button onClick={onAdd}>Agregar</Button>
    </Group>
  );
});

export { PhoneInput }; 