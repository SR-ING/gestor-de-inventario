
import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { addProductToFirestore, updateProductInFirestore, deleteProductFromFirestore } from '../services/firestoreService';


export const useInventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsCollectionRef = collection(db, 'products');
    
    // onSnapshot crea un listener en tiempo real
    const unsubscribe = onSnapshot(productsCollectionRef, (snapshot) => {
      const productsData = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data(),
      } as Product));
      setProducts(productsData);
      setLoading(false);
    }, (error) => {
      console.error("Error al obtener los productos de Firestore:", error);
      setLoading(false);
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  const addProduct = useCallback(async (productData: Omit<Product, 'id' | 'lastUpdated'>) => {
    try {
      await addProductToFirestore(productData);
    } catch (error) {
      console.error("Error al añadir el producto:", error);
      // Opcional: manejar el error en la UI
    }
  }, []);

  const updateProduct = useCallback(async (id: string, updatedData: Omit<Product, 'id' | 'lastUpdated'>) => {
    try {
      await updateProductInFirestore(id, updatedData);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      await deleteProductFromFirestore(id);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }, []);

  return { products, addProduct, updateProduct, deleteProduct, loading };
};
