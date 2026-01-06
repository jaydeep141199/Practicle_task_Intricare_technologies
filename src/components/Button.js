import React from 'react';
import { Button as MantineButton } from '@mantine/core';

const Button = ({ children, variant = 'filled', color = 'blue', fullWidth, loading, ...props }) => {
  return (
    <MantineButton
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      loading={loading}
      {...props}
    >
      {children}
    </MantineButton>
  );
};

export default Button;

