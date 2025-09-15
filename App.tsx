
import React, { useState, useCallback } from 'react';
import { Product } from './types';
import { useInventory } from './hooks/useInventory';
import Header from './components/Header';
import DashboardMetrics from './components/DashboardMetrics';
import InventoryTable from './components/InventoryTable';
import ProductModal from './components/ProductModal';
import AiAssistant from './components/AiAssistant';
import { PlusIcon } from './components/icons/PlusIcon';

const App: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useInventory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleOpenModal = useCallback(() => {
    setProductToEdit(null);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setProductToEdit(null);
  }, []);

  const handleEditProduct = useCallback((product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  }, []);
  
  const handleSaveProduct = useCallback((product: Omit<Product, 'id' | 'lastUpdated'>, id?: string) => {
    if (id) {
      updateProduct(id, product);
    } else {
      addProduct(product);
    }
    handleCloseModal();
  }, [addProduct, updateProduct, handleCloseModal]);

  const handleDeleteProduct = useCallback((id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      deleteProduct(id);
    }
  }, [deleteProduct]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <DashboardMetrics products={products} />
        
        <div className="mt-8 bg-white dark:bg-slate-800 shadow-lg rounded-xl overflow-hidden ring-1 ring-slate-900/5">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">Inventario de Productos</h2>
              <button
                onClick={handleOpenModal}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
              >
                <PlusIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Añadir Producto</span>
              </button>
            </div>
            <InventoryTable 
              products={products} 
              onEdit={handleEditProduct} 
              onDelete={handleDeleteProduct} 
            />
          </div>
        </div>
        
        <AiAssistant products={products} />

      </main>
      
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />
    </div>
  );
};

export default App;
