/**
 * Get product image from localStorage
 * @param {number} productId - Product ID
 * @returns {string|null} - Base64 image string or null
 */
export const getProductImage = (productId) => {
  return localStorage.getItem(`product_image_${productId}`);
};

/**
 * Save product image to localStorage
 * @param {number} productId - Product ID
 * @param {string} imageData - Base64 image string
 */
export const saveProductImage = (productId, imageData) => {
  if (imageData) {
    localStorage.setItem(`product_image_${productId}`, imageData);
  }
};

/**
 * Remove product image from localStorage
 * @param {number} productId - Product ID
 */
export const removeProductImage = (productId) => {
  localStorage.removeItem(`product_image_${productId}`);
};

