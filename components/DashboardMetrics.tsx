
import React, { useMemo } from 'react';
import { Product } from '../types';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { PackageIcon } from './icons/PackageIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface DashboardMetricsProps {
  products: Product[];
}

const MetricCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg ring-1 ring-slate-900/5 flex items-start gap-4">
    <div className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
    </div>
  </div>
);

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ products }) => {
  const metrics = useMemo(() => {
    const totalValue = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const totalItems = products.reduce((acc, p) => acc + p.quantity, 0);
    const lowStockItems = products.filter(p => p.quantity > 0 && p.quantity < 10).length;
    const outOfStockItems = products.filter(p => p.quantity === 0).length;
    
    return {
      totalValue,
      totalItems,
      lowStockItems,
      outOfStockItems
    };
  }, [products]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard 
        title="Valor Total del Inventario"
        value={formatCurrency(metrics.totalValue)}
        icon={<DollarSignIcon className="w-6 h-6 text-white" />}
        color="bg-green-500"
      />
      <MetricCard 
        title="Total de Artículos"
        value={metrics.totalItems}
        icon={<PackageIcon className="w-6 h-6 text-white" />}
        color="bg-blue-500"
      />
      <MetricCard 
        title="Bajo Stock (<10)"
        value={metrics.lowStockItems}
        icon={<AlertTriangleIcon className="w-6 h-6 text-white" />}
        color="bg-yellow-500"
      />
      <MetricCard 
        title="Agotados"
        value={metrics.outOfStockItems}
        icon={<CheckCircleIcon className="w-6 h-6 text-white" />}
        color="bg-red-500"
      />
    </div>
  );
};

export default DashboardMetrics;
