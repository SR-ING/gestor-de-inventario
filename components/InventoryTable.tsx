
import React from 'react';
import { Product } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';

interface InventoryTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ products, onEdit, onDelete }) => {

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(dateString));
  }
  
  const getStockStatusClass = (quantity: number) => {
    if (quantity === 0) return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
    if (quantity < 10) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
    return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
        <p className="text-slate-500 dark:text-slate-400">No hay productos en el inventario.</p>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">¡Añade tu primer producto para empezar!</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
        <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-slate-700 dark:text-slate-300">
          <tr>
            <th scope="col" className="px-6 py-3">Producto</th>
            <th scope="col" className="px-6 py-3">SKU</th>
            <th scope="col" className="px-6 py-3 text-center">Cantidad</th>
            <th scope="col" className="px-6 py-3">Precio</th>
            <th scope="col" className="px-6 py-3">Última Actualización</th>
            <th scope="col" className="px-6 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">
                <div className="font-bold">{product.name}</div>
                <div className="text-xs text-slate-500">{product.category}</div>
              </th>
              <td className="px-6 py-4 font-mono text-xs">{product.sku}</td>
              <td className="px-6 py-4 text-center">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStockStatusClass(product.quantity)}`}>
                  {product.quantity}
                </span>
              </td>
              <td className="px-6 py-4">{formatCurrency(product.price)}</td>
              <td className="px-6 py-4">{formatDate(product.lastUpdated)}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => onEdit(product)} className="p-2 text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(product.id)} className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
