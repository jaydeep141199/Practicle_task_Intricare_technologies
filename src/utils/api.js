import { API_BASE_URL } from './constants';

/**
 * Fetch all products from API
 * @returns {Promise<Array>} - Array of products
 */
export const fetchProducts = async () => {
  console.log('Fetching products from:', `${API_BASE_URL}/products`);
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    cache: 'no-cache',
  });
  console.log('Fetch response status:', response.status);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

/**
 * Add a new product via API
 * @param {Object} productData - Product data
 * @returns {Promise<Object>} - Created product
 */
export const createProduct = async (productData) => {
  const apiData = {
    title: productData.title,
    price: productData.price,
    description: productData.description,
    category: productData.category,
    image: 'https://via.placeholder.com/300', // Placeholder since API doesn't accept base64
  };

  console.log('Creating product:', apiData);
  console.log('API URL:', `${API_BASE_URL}/products`);

  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(apiData),
    cache: 'no-cache',
  });

  console.log('Create response status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Create product error:', errorText);
    throw new Error('Failed to add product');
  }

  const result = await response.json();
  console.log('Created product result:', result);
  return result;
};

/**
 * Update an existing product via API
 * @param {number} productId - Product ID
 * @param {Object} productData - Updated product data
 * @param {string} originalImage - Original image URL
 * @returns {Promise<Object>} - Updated product
 */
export const updateProduct = async (productId, productData, originalImage) => {
  const apiData = {
    title: productData.title,
    price: productData.price,
    description: productData.description,
    category: productData.category,
    image: originalImage || 'https://via.placeholder.com/300',
  };

  console.log('Updating product:', productId, apiData);
  console.log('API URL:', `${API_BASE_URL}/products/${productId}`);

  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(apiData),
    cache: 'no-cache',
  });

  console.log('Update response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Update product error:', errorText);
    throw new Error('Failed to update product');
  }

  const result = await response.json();
  console.log('Updated product result:', result);
  return result;
};

/**
 * Delete a product via API
 * @param {number} productId - Product ID
 * @returns {Promise<void>}
 */
export const deleteProduct = async (productId) => {
  console.log('Deleting product:', productId);
  console.log('API URL:', `${API_BASE_URL}/products/${productId}`);

  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    cache: 'no-cache',
  });

  console.log('Delete response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Delete product error:', errorText);
    throw new Error('Failed to delete product');
  }

  const result = await response.json().catch(() => ({}));
  console.log('Delete product result:', result);
  return result;
};

