import React from 'react';
import { TextInput, NumberInput, Textarea, Select } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';

const Input = ({ name, label, type = 'text', required, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => {
        const commonProps = {
          ref,
          label,
          placeholder: props?.placeholder ?? `Enter ${label}`,
          value: value ?? (type === 'number' ? 0 : ''),
          onChange: onChange,
          onBlur: onBlur,
          error: error?.message,
          required: required,
          withAsterisk: required ?? false,
          size: props?.size ?? 'md',
          styles: {
            label: {},
            error: { fontSize: '14px' },
          },
          ...props,
        };

        switch (type) {
          case 'number':
            return (
              <NumberInput
                {...commonProps}
                min={props?.min ?? 0}
                step={props?.step ?? 0.01}
                leftSection={props?.leftSection}
              />
            );
          case 'textarea':
            return (
              <Textarea
                {...commonProps}
                minRows={props?.minRows ?? 4}
              />
            );
          case 'select':
            return (
              <Select
                {...commonProps}
                data={props?.data ?? []}
                searchable={props?.searchable ?? false}
              />
            );
          default:
            return (
              <TextInput
                type={props?.type ?? 'text'}
                {...commonProps}
                autoComplete="off"
              />
            );
        }
      }}
    />
  );
};

export default Input;
