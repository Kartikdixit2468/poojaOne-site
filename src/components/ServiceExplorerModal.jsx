import React, { useState } from 'react';
import { X, Search, Filter } from 'lucide-react';


const ServiceExplorerModal = ({ isOpen, onClose, onBookService, ALL_POOJAS }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  console.log('ServiceExplorerModal rendered');
  console.log('isOpen:', isOpen);
  console.log('searchTerm:', searchTerm);

  if (!isOpen) return null;

  const categories = ['All', ...new Set(ALL_POOJAS.map(p => p.category))];

  const filteredPoojas = ALL_POOJAS.filter(pooja => {
    const matchesSearch = pooja.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pooja.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-fade-in-up relative">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-brand-soft to-transparent rounded-full blur-2xl opacity-20"></div>
        
        {/* Header */}
        <div className="bg-surface border-b border-border p-6 flex-shrink-0">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-text">Explore Divine Services</h2>
              <p className="text-text-muted text-sm">Find the perfect ritual for your needs</p>
            </div>
            <button onClick={onClose} className="bg-brand-soft hover:bg-border p-2 rounded-full transition">
              <X size={24} className="text-text-muted" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 text-muted" size={20} />
              <input 
                type="text" 
                placeholder="Search for a Puja, Havan or Sanskar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 p-3 bg-section border border-border rounded-xl focus:ring-2 focus:ring-brand outline-none"
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
                      ? 'bg-gradient-to-br from-brand to-brand-dark text-white shadow-md' 
                      : 'bg-surface border border-border text-text-muted hover:bg-brand-soft hover:text-brand'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-6 bg-section">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPoojas.length > 0 ? (
              filteredPoojas.map((pooja) => (
                <div key={pooja.id} className="h-full group relative">
                  {/* Inner wrapper - all hover animations applied here */}
                  <div
                    className="bg-surface rounded-2xl overflow-hidden shadow-sm border border-border h-full flex flex-col relative transition-all duration-300 ease-out"
                    style={{
                      transform: "translateY(0) scale(1)",
                      boxShadow:
                        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-4px) scale(1.03)";
                      e.currentTarget.style.boxShadow =
                        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
                      e.currentTarget.style.borderColor =
                        "rgba(208, 106, 31, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
                      e.currentTarget.style.borderColor = "rgb(240 226 214)";
                    }}
                  >
                    {/* Subtle gradient glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-soft/0 via-brand-soft/0 to-brand-soft/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-brand-soft to-brand-soft/50">
                      <img
                        src={pooja.image}
                        alt={pooja.title}
                        className="w-full h-full object-cover transition-all duration-700 ease-out"
                        style={{ transform: "scale(1) rotate(0deg)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform =
                            "scale(1.1) rotate(1deg)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform =
                            "scale(1) rotate(0deg)")
                        }
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {/* Category Badge */}
                      <div
                        className="absolute top-3 right-3 transform transition-transform duration-300 ease-out"
                        style={{ transform: "scale(1)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.1)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      >
                        <span className="bg-surface/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-brand shadow-lg">
                          {pooja.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-5 lg:p-6 flex flex-col flex-grow">
                      <h3 className="text-lg lg:text-xl font-bold mb-2 text-text group-hover:text-brand transition-all duration-300 group-hover:tracking-wide">{pooja.title}</h3>
                      <p className="text-text-muted text-sm mb-4 leading-relaxed flex-grow line-clamp-2 group-hover:text-text transition-colors duration-300">
                        {pooja.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border group-hover:border-brand/30 transition-colors duration-300">
                        <span className="text-brand font-bold text-lg inline-block transition-transform duration-300 ease-out"
                          style={{ transform: 'scale(1)' }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >{pooja.price}</span>
                        <button
                          onClick={() => onBookService(pooja.title)}
                          className="bg-footer hover:bg-gradient-to-b hover:from-brand hover:to-brand-dark text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-text-muted">
                <Filter size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-lg">No services found matching your search.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                  className="mt-4 text-brand font-medium hover:underline"
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
