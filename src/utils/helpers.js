/**
 * Get unique categories from products array
 * @param {Array} products - Array of products
 * @returns {Array} - Sorted array of unique categories
 */
export const getUniqueCategories = (products) => {
  const uniqueCategories = [...new Set(products.map(p => p.category))];
  return uniqueCategories.sort();
};

/**
 * Filter products based on search value and category filter
 * @param {Array} products - Array of products
 * @param {string} searchValue - Search term
 * @param {string} filterValue - Selected category filter
 * @returns {Array} - Filtered products
 */
export const filterProducts = (products, searchValue, filterValue) => {
  return products.filter(product => {
    const matchesSearch = searchValue === '' || 
      product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.category.toLowerCase().includes(searchValue.toLowerCase());
    
    const matchesFilter = filterValue === 'all' || product.category === filterValue;
    
    return matchesSearch && matchesFilter;
  });
};

/**
 * Get category color for badges
 * @param {string} category - Product category
 * @returns {string} - Color name
 */
export const getCategoryColor = (category) => {
  const colors = {
    "men's clothing": "blue",
    "women's clothing": "pink",
    "electronics": "violet",
    "jewelery": "yellow",
  };
  return colors[category] || "gray";
};

/**
 * Format category name for display
 * @param {string} category - Category value
 * @returns {string} - Formatted category label
 */
export const formatCategoryLabel = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1).replace(/'/g, "'");
};

