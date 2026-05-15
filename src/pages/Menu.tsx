import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Plus, X, Star, Info } from 'lucide-react';
import { PRODUCTS } from '../constants/products';
import { Category, Product } from '../types';
import { cn, formatPrice } from '../lib/utils';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories: { id: Category | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'espresso', label: 'Espresso' },
    { id: 'brewed', label: 'Brewed' },
    { id: 'blended', label: 'Blended' },
    { id: 'bakery', label: 'Bakery' },
    { id: 'seasonal', label: 'Seasonal' },
  ];

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-6 py-12 space-y-12"
    >
      <header className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b sb-border pb-8">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">The Collection</span>
            <h1 className="serif text-6xl italic">Explore Our Menu</h1>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by flavor or name..." 
              className="w-full pl-14 pr-6 py-4 bg-white/[0.03] border sb-border rounded-full focus:ring-1 focus:ring-sb-gold focus:border-sb-gold transition-all outline-none text-sm font-medium tracking-wide"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all border",
                selectedCategory === cat.id 
                  ? "bg-sb-gold border-sb-gold text-bg-black shadow-[0_0_20px_rgba(203,162,88,0.2)]" 
                  : "bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:text-white"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map(product => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -12 }}
              className="bg-white/[0.02] rounded-[3rem] overflow-hidden shadow-2xl transition-all border sb-border group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-sb-dark-green">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-bg-black/60 backdrop-blur px-3 py-1 rounded font-bold text-[9px] text-sb-gold uppercase tracking-widest">
                  {product.nutrition?.calories} Cal
                </div>
              </div>
              <div className="p-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="serif text-2xl italic">{product.name}</h3>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">{product.category}</p>
                  </div>
                  <span className="text-xl font-light text-sb-gold">{formatPrice(product.price)}</span>
                </div>
                <p className="text-white/40 text-xs leading-relaxed line-clamp-2 italic serif text-lg">
                  "{product.description}"
                </p>
                <div className="flex justify-between items-center pt-4 border-t sb-border">
                  <div className="flex gap-2">
                    {product.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px] bg-white/5 text-white/60 px-2 py-1 rounded font-bold uppercase tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-sb-green rounded-full flex items-center justify-center text-white shadow-lg hover:brightness-110 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Customization Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-2xl bg-bg-black border sb-border rounded-t-[3rem] md:rounded-[4rem] overflow-hidden max-h-[90vh] overflow-y-auto shadow-[0_0_100px_rgba(0,0,0,1)]"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-8 right-8 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors z-10 text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="aspect-[21/9] bg-sb-dark-green relative relative border-b sb-border">
                 <img src={selectedProduct.imageUrl} className="w-full h-full object-cover opacity-70" alt="" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 bg-gradient-to-t from-bg-black to-transparent" />
              </div>

              <div className="p-12 space-y-12">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-sb-gold font-black">Selection Confirmed</span>
                  <h2 className="serif text-5xl md:text-6xl italic leading-none">{selectedProduct.name}</h2>
                  <p className="text-white/40 text-lg serif italic leading-relaxed max-w-xl">"{selectedProduct.description}"</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="flex items-center gap-2 text-xs uppercase tracking-widest font-black text-white/50">
                       Size Selection <div className="h-px bg-white/10 flex-1" />
                    </h4>
                    <div className="flex gap-4">
                      {['Tall', 'Grande', 'Venti'].map(size => (
                        <button key={size} className={cn(
                          "flex-1 py-4 border rounded-2xl font-bold uppercase text-[10px] tracking-widest transition-all",
                          size === 'Grande' ? "bg-sb-gold border-sb-gold text-bg-black" : "border-white/10 text-white/40 hover:border-white/30"
                        )}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="flex items-center gap-2 text-xs uppercase tracking-widest font-black text-white/50">
                       Custom Milk <div className="h-px bg-white/10 flex-1" />
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {['Whole Milk', 'Oatmilk (+৳60)', 'Almondmilk (+৳60)', 'Soymilk'].map(milk => (
                        <button key={milk} className="py-4 px-4 text-[9px] uppercase tracking-widest text-center border border-white/10 rounded-xl font-black text-white/40 hover:border-sb-gold hover:text-sb-gold transition-all">
                          {milk}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ai-gradient p-8 rounded-3xl space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-sb-gold">AI Recommended Add-ons</h4>
                    <div className="flex items-center justify-between bg-bg-black/40 p-5 rounded-2xl border sb-border group cursor-pointer hover:bg-bg-black/60 transition-all">
                       <div className="flex flex-col">
                          <span className="font-bold text-sm tracking-wide">Extra Espresso Shot</span>
                          <span className="text-[10px] text-white/40 uppercase">Recommended for a morning boost</span>
                       </div>
                       <button className="bg-sb-gold text-bg-black px-4 py-2 rounded-lg text-[9px] font-black uppercase">+ ৳40</button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t sb-border pt-10">
                  <div className="text-center md:text-left">
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Crafted Total</span>
                    <p className="text-4xl font-light text-sb-gold">{formatPrice(selectedProduct.price)}</p>
                  </div>
                  <button className="w-full md:w-auto bg-sb-cream text-bg-black px-20 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(233,224,210,0.1)] hover:scale-105 active:scale-95 transition-all">
                    Confirm Order
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
