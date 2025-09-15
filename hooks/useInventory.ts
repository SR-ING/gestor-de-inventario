
import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';

const INVENTORY_STORAGE_KEY = 'inventoryApp.products';
const INVENTORY_CHANNEL_NAME = 'inventory-sync';

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

  // Effect to handle synchronization between tabs
  useEffect(() => {
    const channel = new BroadcastChannel(INVENTORY_CHANNEL_NAME);

    const handleMessage = () => {
      console.log('Inventory update received from another tab.');
      try {
        const storedProducts = localStorage.getItem(INVENTORY_STORAGE_KEY);
        setProducts(storedProducts ? JSON.parse(storedProducts) : []);
      } catch (error) {
        console.error('Error syncing inventory from localStorage', error);
      }
    };

    channel.addEventListener('message', handleMessage);

    // Cleanup on component unmount
    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, []);

  // Effect to persist changes to localStorage and notify other tabs
  useEffect(() => {
    try {
      const serializedProducts = JSON.stringify(products);
      localStorage.setItem(INVENTORY_STORAGE_KEY, serializedProducts);
      
      // Notify other tabs about the change
      const channel = new BroadcastChannel(INVENTORY_CHANNEL_NAME);
      channel.postMessage({ type: 'update' });
      channel.close();

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
