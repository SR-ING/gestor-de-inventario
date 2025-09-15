import { db } from '../firebaseConfig';
// FIX: Removed unused v9 modular imports from 'firebase/firestore'.
import { Product } from '../types';

// FIX: Switched to Firebase v8 syntax.
const productsCollectionRef = db.collection('products');

export const addProductToFirestore = async (productData: Omit<Product, 'id' | 'lastUpdated'>) => {
  const newProductData = {
    ...productData,
    lastUpdated: new Date().toISOString(), // Mantenemos el formato ISO para consistencia
  };
  // FIX: Switched to Firebase v8 syntax.
  await productsCollectionRef.add(newProductData);
};

export const updateProductInFirestore = async (id: string, updatedData: Omit<Product, 'id' | 'lastUpdated'>) => {
  // FIX: Switched to Firebase v8 syntax.
  const productDoc = productsCollectionRef.doc(id);
  const newProductData = {
    ...updatedData,
    lastUpdated: new Date().toISOString(),
  };
  await productDoc.update(newProductData);
};

export const deleteProductFromFirestore = async (id: string) => {
  // FIX: Switched to Firebase v8 syntax.
  const productDoc = productsCollectionRef.doc(id);
  await productDoc.delete();
};
