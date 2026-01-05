import React, { useState } from 'react';
import { X, Search, Filter } from 'lucide-react';


const ServiceExplorerModal = ({ isOpen, onClose, onBookService }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!isOpen) return null;

  const categories = ['All', ...new Set(ALL_POOJAS.map(p => p.category))];

  const filteredPoojas = ALL_POOJAS.filter(pooja => {
    const matchesSearch = pooja.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pooja.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-6 flex-shrink-0">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900">Explore Divine Services</h2>
              <p className="text-gray-500 text-sm">Find the perfect ritual for your needs</p>
            </div>
            <button onClick={onClose} className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition">
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search for a Puja, Havan or Sanskar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                      ? 'bg-orange-600 text-white shadow-md' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPoojas.length > 0 ? (
              filteredPoojas.map((pooja) => (
                <div key={pooja.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition border border-gray-100 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
                      {pooja.icon}
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                      {pooja.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{pooja.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex-grow">{pooja.description}</p>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-orange-600 text-lg">{pooja.price}</span>
                    <button 
                      onClick={() => onBookService(pooja.title)}
                      className="bg-gray-900 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500">
                <Filter size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-lg">No services found matching your search.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                  className="mt-4 text-orange-600 font-medium hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceExplorerModal;
