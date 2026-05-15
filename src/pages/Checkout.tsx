import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, CreditCard, ChevronRight, Minus, Plus, Trash2, ArrowRight, ShieldCheck, Zap, Star } from 'lucide-react';
import { PRODUCTS } from '../constants/products';
import { formatPrice } from '../lib/utils';

export default function Checkout() {
  const [items, setItems] = useState([
    { ...PRODUCTS[0], quantity: 1 },
    { ...PRODUCTS[1], quantity: 1 },
  ]);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-20">
        {/* Left Column: Cart items */}
        <div className="flex-1 space-y-12">
          <header className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">Your Collection</span>
            <h1 className="serif text-6xl italic">Review Bag</h1>
            <p className="text-sb-gold font-bold text-xs uppercase tracking-widest pt-2">You're earning 120 Stars on this ritual</p>
          </header>

          <div className="space-y-6">
            {items.map((item) => (
              <motion.div 
                key={item.id}
                layout
                className="bg-white/[0.02] p-8 rounded-[3rem] flex items-center gap-8 border sb-border group relative overflow-hidden"
              >
                <div className="w-32 h-32 bg-sb-dark-green rounded-2xl overflow-hidden shrink-0 border sb-border">
                  <img src={item.imageUrl} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" alt="" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 space-y-2">
                   <h3 className="serif text-2xl italic leading-none">{item.name}</h3>
                   <p className="text-[10px] text-white/30 uppercase tracking-widest font-black">{item.category} • Whole Milk</p>
                   <p className="text-sb-gold text-lg font-light pt-2">{formatPrice(item.price)}</p>
                </div>
                <div className="flex flex-col items-end gap-6 relative z-10">
                   <div className="flex items-center gap-6 bg-bg-black/40 border sb-border p-2 rounded-2xl">
                      <button className="text-white/20 hover:text-sb-cream transition-colors"><Minus className="w-4 h-4" /></button>
                      <span className="font-bold text-sm text-sb-cream">{item.quantity}</span>
                      <button className="text-white/20 hover:text-sb-cream transition-colors"><Plus className="w-4 h-4" /></button>
                   </div>
                   <button className="text-white/10 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full blur-2xl translate-x-12 -translate-y-12" />
              </motion.div>
            ))}
          </div>

          {/* Upsell - Goes Great With */}
          <section className="bg-white/[0.01] rounded-[3rem] p-10 border border-white/5 space-y-8">
             <div className="flex justify-between items-center">
                <h4 className="serif text-2xl italic">Goes Great With...</h4>
                <div className="flex gap-2">
                   <div className="w-1.5 h-1.5 bg-sb-gold rounded-full" />
                   <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                </div>
             </div>
             <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
               {PRODUCTS.filter(p => p.category === 'bakery').slice(0, 3).map(p => (
                 <div key={p.id} className="bg-bg-black border sb-border p-6 rounded-3xl min-w-[280px] flex items-center gap-6 group cursor-pointer hover:border-sb-gold/40 transition-all shadow-xl">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-sb-dark-green">
                       <img src={p.imageUrl} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-100" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-bold text-white mb-1">{p.name}</p>
                       <p className="text-[10px] text-sb-gold font-black uppercase">+ {formatPrice(p.price)}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-sb-gold group-hover:text-bg-black transition-all">
                       <Plus className="w-4 h-4" />
                    </div>
                 </div>
               ))}
             </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-[450px] h-fit sticky top-32">
          <div className="bg-sb-dark-green border sb-border rounded-[4rem] p-12 text-sb-cream space-y-10 shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
             <header className="space-y-2 text-center">
                <span className="text-[10px] uppercase font-black tracking-[0.4em] text-white/20">Finalization</span>
                <h2 className="serif text-4xl italic">Order Summary</h2>
                <div className="flex items-center justify-center gap-2 pt-2">
                   <Zap className="w-3 h-3 text-sb-gold fill-sb-gold" />
                   <span className="text-[10px] text-sb-gold font-black uppercase tracking-widest">Free Express Shipping</span>
                </div>
             </header>

             <div className="space-y-6 pt-6 border-t sb-border">
                <div className="flex justify-between text-white/40 text-sm font-medium tracking-wide">
                   <span>Subtotal</span>
                   <span className="text-white">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-white/40 text-sm font-medium tracking-wide">
                   <span>Concierge Fee</span>
                   <span className="text-sb-gold font-black text-[10px] uppercase tracking-widest">Waived</span>
                </div>
                <div className="flex justify-between text-3xl font-light pt-8 border-t sb-border">
                   <span className="serif italic">Total</span>
                   <span className="text-sb-gold">{formatPrice(total)}</span>
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex items-center justify-between bg-bg-black/40 p-6 rounded-3xl border sb-border hover:border-white/20 transition-all cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className="bg-white/5 p-3 rounded-2xl group-hover:bg-sb-gold group-hover:text-bg-black transition-all">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Bkash</p>
                        <p className="text-[10px] text-white/20 uppercase tracking-widest font-black">**** 4291</p>
                      </div>
                   </div>
                   <ArrowRight className="w-4 h-4 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
             </div>

             <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               className="w-full bg-sb-cream text-bg-black py-8 rounded-full font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:brightness-110 active:brightness-90 transition-all flex items-center justify-center gap-4 mt-4"
             >
                Express Checkout <ChevronRight className="w-5 h-5" />
             </motion.button>

             <div className="flex items-center justify-center gap-2 text-[10px] font-black text-white/10 uppercase tracking-[0.4em]">
                <ShieldCheck className="w-4 h-4" /> Secure End-to-End
             </div>
          </div>

          <div className="mt-10 p-10 bg-white/[0.02] border sb-border rounded-[3rem] flex items-center gap-6 relative overflow-hidden">
             <div className="p-4 bg-sb-dark-green rounded-2xl border sb-border relative z-10 shrink-0">
                <Star className="w-6 h-6 text-sb-gold" />
             </div>
             <div className="relative z-10">
                <p className="font-bold text-sm tracking-wide">Ritual Rewards</p>
                <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mt-1">Unlock 1-tap ordering</p>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full blur-2xl translate-x-12 -translate-y-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
