import React, { useState, useEffect, useMemo } from 'react';
import { Container, Title, Grid, LoadingOverlay, Text, Group, Badge, Box } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import SearchAndFilter from './components/SearchAndFilter';
import Button from './components/Button';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from './utils/api';
import { saveProductImage, removeProductImage } from './utils/localStorage';
import { getUniqueCategories, filterProducts } from './utils/helpers';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpened, setFormOpened] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formMode, setFormMode] = useState('add');
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch products. Please try again later.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from products
  const categories = useMemo(() => getUniqueCategories(products), [products]);

  // Filter and search products
  const filteredProducts = useMemo(() => 
    filterProducts(products, searchValue, filterValue),
    [products, searchValue, filterValue]
  );

  const handleAdd = async (productData) => {
    try {
      setApiLoading(true);
      const newProduct = await createProduct(productData);
      
      // Store image in localStorage with the new product ID
      saveProductImage(newProduct.id, productData.image);

      // Add the new product to the list
      setProducts([newProduct, ...products]);
      
      notifications.show({
        title: 'Success',
        message: 'Product added successfully!',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to add product. Please try again.',
        color: 'red',
      });
    } finally {
      setApiLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormMode('edit');
    setFormOpened(true);
  };

  const handleUpdate = async (productData) => {
    try {
      setApiLoading(true);
      const productId = editingProduct.id;
      const updatedProduct = await updateProduct(
        productId,
        productData,
        editingProduct.image
      );

      // Update image in localStorage if changed
      saveProductImage(productId, productData.image);

      // Update the product in the list
      setProducts(products.map((p) => 
        p.id === productId ? { ...updatedProduct, ...productData } : p
      ));
      
      setEditingProduct(null);
      notifications.show({
        title: 'Success',
        message: 'Product updated successfully!',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update product. Please try again.',
        color: 'red',
      });
    } finally {
      setApiLoading(false);
    }
  };

  const handleDeleteClick = (productId) => {
    const product = products.find((p) => p.id === productId);
    setProductToDelete({ id: productId, title: product?.title });
    setDeleteModalOpened(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        setApiLoading(true);
        await deleteProduct(productToDelete.id);

        // Remove image from localStorage
        removeProductImage(productToDelete.id);
        
        // Remove from products list
        setProducts(products.filter((p) => p.id !== productToDelete.id));
        
        notifications.show({
          title: 'Success',
          message: 'Product deleted successfully!',
          color: 'green',
        });
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete product. Please try again.',
          color: 'red',
        });
      } finally {
        setApiLoading(false);
        setDeleteModalOpened(false);
        setProductToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpened(false);
    setProductToDelete(null);
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setFormMode('add');
    setFormOpened(true);
  };

  const closeForm = () => {
    setFormOpened(false);
    setEditingProduct(null);
  };

  const handleFormSubmit = (productData) => {
    if (formMode === 'edit') {
      handleUpdate(productData);
    } else {
      handleAdd(productData);
    }
  };

  return (
    <Box style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
      <LoadingOverlay visible={loading || apiLoading} />
      
      {/* Header Section */}
      <Box
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          padding: '3rem 0',
          marginBottom: '2rem',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative gradient overlay */}
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />
        <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
          <Group justify="space-between" align="center">
            <Box>
              <Title
                order={1}
                style={{
                  color: '#ffffff',
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  marginBottom: '0.5rem',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                }}
              >
                Product Management System
              </Title>
              <Text
                size="lg"
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                }}
              >
                Manage your products with ease
              </Text>
            </Box>
            <Button
              variant="white"
              leftSection={<IconPlus size={20} />}
              onClick={openAddForm}
              size="lg"
              radius="md"
              style={{
                fontWeight: 700,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
              }}
            >
              Add New Product
            </Button>
          </Group>
        </Container>
      </Box>

      <Container size="xl" pos="relative">
      {!loading && products.length > 0 && (
        <SearchAndFilter
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          filterValue={filterValue}
          onFilterChange={setFilterValue}
          categories={categories}
        />
      )}

      {!loading && filteredProducts.length === 0 ? (
        <Box
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Text size="xl" fw={600} c="dimmed" mb="xs">
            {products.length === 0 
              ? 'No products found' 
              : 'No products match your search criteria'}
          </Text>
          <Text size="sm" c="dimmed">
            {products.length === 0 
              ? 'Start by adding your first product' 
              : 'Try adjusting your search or filter criteria'}
          </Text>
        </Box>
      ) : (
        <>
          {!loading && filteredProducts.length > 0 && (
            <Group mb="lg" justify="space-between" align="center">
              <Box
                style={{
                  backgroundColor: '#ffffff',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Text size="sm" fw={600} c="dimmed">
                  Showing <Text span fw={700} c="blue" style={{ fontSize: '1.1rem' }}>
                    {filteredProducts.length}
                  </Text> of {products.length} products
                </Text>
              </Box>
              {(searchValue || filterValue !== 'all') && (
                <Badge
                  color="blue"
                  variant="gradient"
                  gradient={{ from: '#667eea', to: '#764ba2', deg: 135 }}
                  size="lg"
                  radius="md"
                  style={{
                    cursor: 'pointer',
                    fontWeight: 600,
                    padding: '0.5rem 1rem',
                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => {
                    setSearchValue('');
                    setFilterValue('all');
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Clear filters
                </Badge>
              )}
            </Group>
          )}
          <Grid gutter="lg">
            {filteredProducts.map((product) => (
              <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <ProductCard
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              </Grid.Col>
            ))}
          </Grid>
        </>
      )}

      <ProductForm
        opened={formOpened}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
        initialValues={editingProduct}
        mode={formMode}
      />

      <DeleteConfirmationModal
        opened={deleteModalOpened}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        productTitle={productToDelete?.title}
      />
      </Container>
    </Box>
  );
}

export default App;
