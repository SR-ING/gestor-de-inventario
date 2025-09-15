
import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Product } from '../types';

const productsCollectionRef = collection(db, 'products');

export const addProductToFirestore = async (productData: Omit<Product, 'id' | 'lastUpdated'>) => {
  const newProductData = {
    ...productData,
    lastUpdated: new Date().toISOString(), // Mantenemos el formato ISO para consistencia
  };
  await addDoc(productsCollectionRef, newProductData);
};

export const updateProductInFirestore = async (id: string, updatedData: Omit<Product, 'id' | 'lastUpdated'>) => {
  const productDoc = doc(db, 'products', id);
  const newProductData = {
    ...updatedData,
    lastUpdated: new Date().toISOString(),
  };
  await updateDoc(productDoc, newProductData);
};

export const deleteProductFromFirestore = async (id: string) => {
  const productDoc = doc(db, 'products', id);
  await deleteDoc(productDoc);
};
