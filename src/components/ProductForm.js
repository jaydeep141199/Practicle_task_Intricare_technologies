import React, { useEffect } from 'react';
import { Modal, Stack, Group, Title, Box } from '@mantine/core';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from './Input';
import FileInput from './FileInput';
import Button from './Button';
import { productSchema } from '../validations/productSchema';
import { CATEGORIES } from '../utils/constants';
import { getProductImage, saveProductImage } from '../utils/localStorage';

const ProductForm = ({ opened, onClose, onSubmit, initialValues, mode }) => {
  const methods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      price: 0,
      description: '',
      image: '',
      category: '',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (opened) {
      if (initialValues) {
        // Get image from localStorage if it exists, otherwise use product image
        const storedImage = getProductImage(initialValues.id);
        const imageData = storedImage || initialValues.image || '';
        
        // Reset form with all values including image
        reset({
          title: initialValues.title || '',
          price: initialValues.price || 0,
          description: initialValues.description || '',
          image: imageData,
          category: initialValues.category || '',
        }, {
          keepDefaultValues: false,
        });
      } else {
        reset({
          title: '',
          price: 0,
          description: '',
          image: '',
          category: '',
        }, {
          keepDefaultValues: false,
        });
      }
    }
  }, [opened, initialValues, reset]);

  const onSubmitForm = (data) => {
    // Store image in localStorage with product ID
    const productId = mode === 'edit' ? initialValues.id : Date.now();
    saveProductImage(productId, data.image);
    
    onSubmit({
      ...data,
      id: productId,
    });
    
    reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="md">
          <Box
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Title order={3} fw={800} style={{ color: '#ffffff', margin: 0 }}>
              {mode === 'edit' ? '✏️' : '➕'}
            </Title>
          </Box>
          <Title order={2} fw={700} style={{ color: '#1f2937' }}>
            {mode === 'edit' ? 'Edit Product' : 'Add New Product'}
          </Title>
        </Group>
      }
      size="lg"
      centered
      radius="lg"
      styles={{
        header: {
          borderBottom: '2px solid #f3f4f6',
          paddingBottom: '1.5rem',
          marginBottom: '1.5rem',
          background: 'linear-gradient(to right, #f8f9fa, #ffffff)',
        },
        body: {
          padding: '2rem',
          backgroundColor: '#ffffff',
        },
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Stack gap="lg">
            <Input
              name="title"
              label="Product Title"
              placeholder="Enter product title (e.g., Fjallraven - Foldsack No. 1 Backpack)"
              type="text"
              required
            />

            <Input
              name="price"
              label="Price"
              placeholder="Enter price"
              type="number"
              required
              min={0}
              step={0.01}
              leftSection="$"
            />

            <Input
              name="description"
              label="Description"
              placeholder="Enter detailed product description"
              type="textarea"
              required
              minRows={4}
            />

            <FileInput
              name="image"
              label="Product Image"
              required
            />

            <Input
              name="category"
              label="Category"
              placeholder="Select a category"
              type="select"
              required
              data={CATEGORIES}
            />

          <Group justify="flex-end" gap="md" mt="md">
            <Button
              type="button"
              variant="outline"
              color="gray"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="filled"
              color="blue"
              loading={isSubmitting}
            >
              {mode === 'edit' ? 'Update Product' : 'Add Product'}
            </Button>
          </Group>
        </Stack>
      </form>
      </FormProvider>
    </Modal>
  );
};

export default ProductForm;
