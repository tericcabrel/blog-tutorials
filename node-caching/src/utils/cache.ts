type ProductSearchQuery = {
  name: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  available?: string;
};

export const buildSearchProductsCacheKey = (keyPrefix: string, searchQuery: ProductSearchQuery) => {
  const { available, category, maxPrice, minPrice, name } = searchQuery;

  const keyParts: string[] = [keyPrefix, '-', name];

  [category, minPrice, maxPrice, available].forEach((criteria) => {
    if (criteria) {
      keyParts.push('-', criteria);
    }
  });

  return keyParts.join('');
};
