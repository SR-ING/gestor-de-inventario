
import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';

const INVENTORY_STORAGE_KEY = 'inventoryApp.products';

export const useInventory = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const storedProducts = localStorage.getItem(INVENTORY_STORAGE_KEY);
      return storedProducts ? JSON.parse(storedProducts) : [];
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [products]);

  const addProduct = useCallback((productData: Omit<Product, 'id' | 'lastUpdated'>) => {
    const newProduct: Product = {
      ...productData,
      id: crypto.randomUUID(),
      lastUpdated: new Date().toISOString(),
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  }, []);

  const updateProduct = useCallback((id: string, updatedData: Omit<Product, 'id' | 'lastUpdated'>) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === id ? { ...p, ...updatedData, lastUpdated: new Date().toISOString() } : p
      )
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
  }, []);

  return { products, addProduct, updateProduct, deleteProduct };
};
