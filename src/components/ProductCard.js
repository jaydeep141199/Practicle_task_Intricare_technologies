import React from 'react';
import { Card, Text, Badge, Button, Group, Stack, Box } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { getProductImage } from '../utils/localStorage';
import { getCategoryColor } from '../utils/helpers';

const ProductCard = ({ product, onEdit, onDelete }) => {
  // Get image from localStorage if it exists, otherwise use product.image
  const getImageSrc = () => {
    const storedImage = getProductImage(product.id);
    // Return stored image if exists, otherwise use product.image, fallback to placeholder
    return storedImage || product.image || 'https://via.placeholder.com/300x250?text=No+Image';
  };

  return (
    <Card
      shadow="xl"
      padding="lg"
      radius="lg"
      withBorder
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        border: '1px solid #e9ecef',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
    >
      <Card.Section
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px 8px 0 0',
          backgroundColor: '#ffffff',
          height: '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '15px',
        }}
      >
        {/* <Box
          style={{
          }}
        >
          <IconShoppingBag size={20} color="#667eea" />
        </Box> */}
        <Box
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <img
            src={getImageSrc()}
            alt={product.title}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '4px',
              transition: 'transform 0.3s ease',
            }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x250/667eea/ffffff?text=Image+Not+Available';
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </Box>
      </Card.Section>

      <Stack gap="sm" style={{ flex: 1, marginTop: 'md' }}>
        <Text
          fw={700}
          size="lg"
          lineClamp={2}
          style={{
            minHeight: '3.5rem',
            color: '#2c3e50',
            fontSize: '1.1rem',
          }}
        >
          {product.title}
        </Text>

        <Text
          size="sm"
          c="dimmed"
          lineClamp={2}
          style={{
            flex: 1,
            lineHeight: 1.6,
            color: '#6c757d',
          }}
        >
          {product.description}
        </Text>

        <Group justify="space-between" mt="auto" gap="xs">
          <Badge
            color="gradient"
            variant="gradient"
            gradient={{ from: '#667eea', to: '#764ba2', deg: 135 }}
            size="xl"
            radius="md"
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              padding: '8px 16px',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
            }}
          >
            ${product.price}
          </Badge>
          <Badge
            color={getCategoryColor(product.category)}
            variant="light"
            size="md"
            radius="md"
            style={{
              textTransform: 'capitalize',
              fontWeight: 600,
            }}
          >
            {product.category.replace(/'/g, "'")}
          </Badge>
        </Group>

        <Group gap="xs" mt="md">
          <Button
            variant="gradient"
            gradient={{ from: '#667eea', to: '#764ba2', deg: 135 }}
            leftSection={<IconEdit size={18} />}
            onClick={() => onEdit(product)}
            fullWidth
            radius="md"
            style={{
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
            }}
          >
            Edit
          </Button>
          <Button
            variant="filled"
            color="red"
            leftSection={<IconTrash size={18} />}
            onClick={() => onDelete(product.id)}
            fullWidth
            radius="md"
            style={{
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
            }}
          >
            Delete
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default ProductCard;
