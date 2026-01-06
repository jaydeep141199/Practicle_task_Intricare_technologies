import React from 'react';
import { Modal, Text, Group, Stack, Box, Paper } from '@mantine/core';
import { IconAlertTriangle, IconTrash } from '@tabler/icons-react';
import Button from './Button';

const DeleteConfirmationModal = ({ opened, onClose, onConfirm, productTitle }) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="md">
          <Box
            style={{
              backgroundColor: '#fee2e2',
              borderRadius: '50%',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconAlertTriangle size={28} color="#dc2626" />
          </Box>
          <Text fw={700} size="xl" style={{ color: '#1f2937' }}>
            Confirm Delete
          </Text>
        </Group>
      }
      centered
      size="md"
      radius="lg"
      styles={{
        header: {
          borderBottom: '2px solid #f3f4f6',
          paddingBottom: '1.5rem',
          marginBottom: '1rem',
        },
        body: {
          padding: '1.5rem',
        },
      }}
    >
      <Stack gap="lg" py="md">
        <Text c="dimmed" size="md" style={{ lineHeight: 1.7 }}>
          Are you sure you want to delete this product? This action cannot be undone and will permanently remove the product from your inventory.
        </Text>
        
        {productTitle && (
          <Paper
            p="md"
            withBorder
            radius="md"
            style={{
              backgroundColor: '#fef2f2',
              border: '2px solid #fecaca',
            }}
          >
            <Group gap="xs" mb="xs">
              <IconTrash size={18} color="#dc2626" />
              <Text fw={600} size="sm" c="red" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Product to Delete
              </Text>
            </Group>
            <Text fw={600} size="lg" c="red" style={{ wordBreak: 'break-word' }}>
              "{productTitle}"
            </Text>
          </Paper>
        )}

        <Group justify="flex-end" gap="md" mt="md">
          <Button
            variant="outline"
            color="gray"
            onClick={onClose}
            radius="md"
            style={{
              fontWeight: 600,
              borderWidth: '2px',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            color="red"
            onClick={onConfirm}
            radius="md"
            leftSection={<IconTrash size={18} />}
            style={{
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Delete Product
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default DeleteConfirmationModal;
