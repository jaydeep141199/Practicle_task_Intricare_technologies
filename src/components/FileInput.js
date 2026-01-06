import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { FileInput as MantineFileInput, Image, Text, Stack, Group, Paper } from '@mantine/core';
import { IconPhoto, IconX } from '@tabler/icons-react';
import { Controller, useFormContext } from 'react-hook-form';

const FileInput = ({ name, label, required, ...props }) => {
  const { control } = useFormContext();
  const fileInputRef = useRef(null);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        return (
          <FileInputWithPreview 
            onChange={onChange}
            value={value}
            ref={ref}
            error={error}
            label={label}
            required={required}
            fileInputRef={fileInputRef}
            {...props}
          />
        );
      }}
    />
  );
};

const FileInputWithPreview = forwardRef(({ onChange, value, error, label, required, fileInputRef, ...props }, ref) => {
  // Helper to check if value is a valid image
  const isValidImage = (val) => {
    if (!val || typeof val !== 'string' || val.trim() === '') return false;
    return val.startsWith('data:image') || val.startsWith('http://') || val.startsWith('https://');
  };

  // Initialize preview from value if it exists
  const [preview, setPreview] = useState(() => {
    return isValidImage(value) ? value : null;
  });

  // Update preview when value changes (for edit mode)
  useEffect(() => {
    if (isValidImage(value)) {
      setPreview(value);
    } else if (value === '' || value === null || value === undefined) {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreview(base64String);
        onChange(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      onChange(null);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Stack gap="xs">
      <MantineFileInput
        ref={(e) => {
          if (fileInputRef) {
            fileInputRef.current = e;
          }
          if (ref) {
            if (typeof ref === 'function') {
              ref(e);
            } else {
              ref.current = e;
            }
          }
        }}
        label={label}
        placeholder={preview ? "Change image file" : "Choose image file"}
        accept="image/*"
        required={required}
        error={error?.message}
        onChange={handleFileChange}
        leftSection={<IconPhoto size={16} />}
        clearable
        withAsterisk={required ?? false}
        size={props?.size ?? 'md'}
        styles={{
          label: {},
          error: { fontSize: '14px' },
        }}
        {...props}
      />
      
      {preview && (
        <Paper
          p="md"
          withBorder
          style={{
            position: 'relative',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '2px solid #e9ecef',
          }}
        >
          <Group justify="space-between" mb="xs">
            <Text size="sm" fw={600} c="blue">
              Image Preview
            </Text>
            <IconX
              size={18}
              style={{ cursor: 'pointer', color: '#868e96' }}
              onClick={handleRemove}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fa5252'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#868e96'}
            />
          </Group>
          <Image
            src={preview}
            alt="Preview"
            width="100%"
            height={200}
            fit="contain"
            style={{
              borderRadius: '4px',
              border: '1px solid #dee2e6',
              backgroundColor: '#fff',
              objectFit: 'contain',
              padding: '8px',
            }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image';
            }}
          />
          <Text size="xs" c="dimmed" mt="xs" ta="center">
            Click the X button to remove this image
          </Text>
        </Paper>
      )}
    </Stack>
  );
});

FileInputWithPreview.displayName = 'FileInputWithPreview';

export default FileInput;
