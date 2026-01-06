import React from 'react';
import { Group, TextInput, Select, Paper, Title, Box } from '@mantine/core';
import { IconSearch, IconFilter } from '@tabler/icons-react';
import { formatCategoryLabel } from '../utils/helpers';

const SearchAndFilter = ({ searchValue, onSearchChange, filterValue, onFilterChange, categories }) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map(cat => ({
      value: cat,
      label: formatCategoryLabel(cat)
    }))
  ];

  return (
    <Paper
      p="xl"
      withBorder
      mb="xl"
      radius="lg"
      style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        border: 'none',
      }}
    >
      <Box mb="md">
        <Title order={4} fw={600} c="dimmed" mb={4}>
          Search & Filter
        </Title>
      </Box>
      <Group gap="md" align="flex-end">
        <TextInput
          placeholder="Search by product title or category..."
          label="Search Products"
          leftSection={<IconSearch size={18} />}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ flex: 1 }}
          size="md"
          radius="md"
          styles={{
            input: {
              border: '2px solid #e9ecef',
              transition: 'all 0.3s ease',
            },
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#667eea';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#e9ecef';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <Select
          label="Filter by Category"
          placeholder="Select category"
          leftSection={<IconFilter size={18} />}
          data={categoryOptions}
          value={filterValue}
          onChange={onFilterChange}
          clearable
          size="md"
          radius="md"
          style={{ minWidth: '220px' }}
          styles={{
            input: {
              border: '2px solid #e9ecef',
              transition: 'all 0.3s ease',
            },
          }}
        />
      </Group>
    </Paper>
  );
};

export default SearchAndFilter;
