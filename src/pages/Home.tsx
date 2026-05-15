import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Star, CloudRain, Sun, Clock, MapPin } from 'lucide-react';
import { PRODUCTS } from '../constants/products';
import { formatPrice, cn } from '../lib/utils';
import { generateRecommendation } from '../lib/gemini';

export default function Home() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulated Context for now
  const context = {
    time: "Morning",
    weather: "Cloudy",
    preferences: { favoriteCategory: "espresso" },
    history: ["Nitro Cold Brew"]
  };

  useEffect(() => {
    async function loadRecs() {
      const data = await generateRecommendation(context);
      setRecommendations(data.recommendations);
      setLoading(false);
    }
    loadRecs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-20"
      >
        {/* 1. Landing Layer - Ritual Refined */}
        <section className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs tracking-[0.2em] font-bold uppercase text-white/50">
              <MapPin className="w-4 h-4 text-sb-gold" /> Chattogram Central
            </div>
            <h1 className="serif text-7xl md:text-9xl leading-[0.9] font-light italic tracking-tight text-white">
              Your Daily Ritual,<br/>
              <span className="not-italic font-semibold text-sb-cream">Refined.</span>
            </h1>
            <p className="text-xl text-white/40 max-w-md leading-relaxed font-light mx-auto lg:mx-0">
              Engineered for the coffee connoisseur. Personalised recommendations powered by Gemini 3.0 Pro.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4 justify-center lg:justify-start">
              <button className="bg-sb-cream text-sb-dark-green px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all">
                Express Checkout
              </button>
              <button className="px-12 py-5 border sb-border rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-white">
                View Collection
              </button>
            </div>
          </div>
          <div className="flex-1 relative group w-full lg:w-auto">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden sb-border border shadow-2xl">
              <img 
                src="https://picsum.photos/seed/refined-coffee/1200/1500" 
                alt="Premium Coffee" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-sb-dark-green p-8 rounded-3xl ai-gradient shadow-2xl max-w-[280px]">
               <div className="flex items-center gap-3 mb-2">
                  <Sun className="text-sb-gold w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-sb-gold">Morning Brew</span>
               </div>
               <p className="serif text-lg italic leading-tight text-white">"A double-shot Flat White with hints of hazelnut."</p>
            </div>
          </div>
        </section>

        {/* 2. AI Context Block */}
        <section className="ai-gradient p-10 md:p-16 rounded-[3rem] relative overflow-hidden group">
          <div className="absolute top-8 right-12 text-[10px] tracking-[0.3em] font-bold text-sb-gold uppercase">AI Context Engine</div>
          <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            <div className="text-8xl md:text-9xl animate-pulse">☔</div>
            <div className="space-y-4 text-center md:text-left">
              <h3 className="serif text-4xl md:text-5xl italic font-light">Rainy day in Chattogram</h3>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
                It's 18°C and drizzling. We recommend a <span className="text-white font-semibold italic">Hot Caramel Macchiato</span> with an extra shot to brighten your morning mood.
              </p>
              <button className="mt-8 bg-sb-green text-white px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-sb-green/20">
                Add Suggested Order
              </button>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-sb-gold/5 rounded-full blur-3xl" />
        </section>

        {/* 3. Curated Selection */}
        <section className="space-y-10">
          <div className="flex justify-between items-end border-b sb-border pb-6">
            <h2 className="serif text-4xl italic">Curated Selection</h2>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Based on History</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.slice(0, 4).map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -10 }}
                className="bg-white/[0.02] border sb-border p-6 rounded-[2.5rem] group cursor-pointer hover:bg-white/[0.05] transition-all"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-sb-dark-green relative">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 px-2 py-1 rounded bg-sb-gold text-bg-black text-[9px] font-extrabold uppercase">
                    Order
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-lg">{product.name}</h4>
                    <span className="text-sm text-sb-gold font-bold">{formatPrice(product.price)}</span>
                  </div>
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.1em] font-medium leading-relaxed">
                    {product.category} • {product.tags[0]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Reward Progress */}
        <section className="bg-sb-dark-green rounded-[3rem] p-12 border sb-border flex flex-col md:flex-row justify-between items-center gap-12 relative overflow-hidden">
          <div className="space-y-4 relative z-10 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Reward Progress</span>
            <h2 className="serif text-5xl italic">142 Stars Earned</h2>
            <p className="text-white/40 text-sm">8 Stars away from your next complimentary beverage.</p>
          </div>
          <div className="flex gap-4 relative z-10">
             {[...Array(5)].map((_, i) => (
               <div key={i} className={cn(
                 "w-4 h-8 rounded-full transition-all duration-500",
                 i < 4 ? "bg-sb-gold shadow-[0_0_15px_rgba(203,162,88,0.3)]" : "bg-white/10"
               )} />
             ))}
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.01] rounded-full -translate-y-1/2 translate-x-1/2" />
        </section>
      </motion.div>

      {/* 5. Sticky Intent (Floating Reorder) */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-bg-black border sb-border shadow-2xl px-8 py-3 rounded-full flex items-center gap-3 font-bold text-sb-gold uppercase text-[10px] tracking-widest backdrop-blur-xl"
        >
          <Clock className="w-4 h-4" /> Ritual Reorder? <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
