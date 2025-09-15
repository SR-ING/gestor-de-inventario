
import React from 'react';
import { BoxIcon } from './icons/BoxIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <BoxIcon className="w-8 h-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Gestor de Inventario IA
            </h1>
        </div>
        {/* Placeholder for future elements like user profile */}
      </div>
    </header>
  );
};

export default Header;
