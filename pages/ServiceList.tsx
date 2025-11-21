import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SERVICE_CATEGORIES } from '../constants';
import { motion } from 'framer-motion';
import { ChevronRight, Filter, ArrowUpDown } from 'lucide-react';

export const ServiceList = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const location = useLocation();

  // Effect to handle URL query parameters for deep linking from Home page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);

  const filteredCategories = useMemo(() => {
    // 1. Filter Categories
    let categories = selectedCategory === 'all'
      ? [...SERVICE_CATEGORIES]
      : SERVICE_CATEGORIES.filter(c => c.id === selectedCategory);

    // 2. Sort Services within Categories
    if (sortOrder !== 'default') {
      categories = categories.map(cat => ({
        ...cat,
        services: [...cat.services].sort((a, b) => {
          if (sortOrder === 'asc') return a.name.localeCompare(b.name);
          if (sortOrder === 'desc') return b.name.localeCompare(a.name);
          return 0;
        })
      }));
    }

    return categories;
  }, [selectedCategory, sortOrder]);

  return (
    <div className="max-w-7xl mx-auto p-4 py-12 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">Nossos Serviços</h2>
        <p className="text-gray-400">Selecione uma categoria para ver as opções</p>
      </div>

      {/* Controls Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-900/80 p-6 rounded-xl border border-zinc-800 backdrop-blur-sm sticky top-24 z-30 shadow-xl"
      >
        {/* Filter Control */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-gold-500 font-bold uppercase text-xs tracking-wider">
            <Filter size={16} />
            Filtrar por:
          </div>
          <select 
            className="w-full sm:w-64 bg-black border border-zinc-700 text-white p-3 rounded-lg outline-none focus:border-gold-500 transition-colors appearance-none cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todas as Categorias</option>
            {SERVICE_CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.title}</option>
            ))}
          </select>
        </div>

        {/* Sort Control */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-gold-500 font-bold uppercase text-xs tracking-wider">
            <ArrowUpDown size={16} />
            Ordenar:
          </div>
          <select 
            className="w-full sm:w-64 bg-black border border-zinc-700 text-white p-3 rounded-lg outline-none focus:border-gold-500 transition-colors appearance-none cursor-pointer"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Padrão</option>
            <option value="asc">Nome (A-Z)</option>
            <option value="desc">Nome (Z-A)</option>
          </select>
        </div>
      </motion.div>

      <div className="space-y-16">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, catIndex) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden"
            >
              {/* Category Header */}
              <div className="bg-zinc-800/50 p-4 border-b border-zinc-700 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gold-500 uppercase tracking-wider">
                  {category.title}
                </h3>
                <span className="text-xs font-mono text-zinc-500">{category.services.length} opções</span>
              </div>

              {/* Horizontal Scrollable Table/List */}
              <div className="p-4 overflow-x-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-[300px]">
                  {category.services.map((service) => (
                    <Link 
                      key={service.id} 
                      to={`/service/${service.id}`}
                      className="group relative p-6 bg-black border border-zinc-800 hover:border-gold-500/50 rounded-lg transition-all hover:-translate-y-1 flex flex-col justify-between h-full"
                    >
                      <div className="mb-4">
                        <h4 className="font-semibold text-white group-hover:text-gold-400 transition-colors">
                          {service.name}
                        </h4>
                        <p className="text-sm text-gray-500 mt-2">
                          {category.title}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-900">
                        <span className="text-xs text-zinc-500 uppercase tracking-wider">Detalhes</span>
                        <ChevronRight size={16} className="text-gold-500 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">Nenhum serviço encontrado.</p>
            <button 
              onClick={() => {setSelectedCategory('all'); setSortOrder('default');}}
              className="mt-4 text-gold-500 hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};