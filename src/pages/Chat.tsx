import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Coffee, Sparkles, User, Minus, Plus, ShoppingBag } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants/products';
import { cn, formatPrice } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
  isOrdering?: boolean;
  suggestions?: any[];
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to the Starbucks AI Lounge. I am your concierge barista. How may I assist your ritual today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const prompt = `
        You are an elite and sophisticated Starbucks Concierge. 
        Your tone is professional, refined, and helpful.
        Help the user find a drink from the menu.
        
        Available Menu:
        ${JSON.stringify(PRODUCTS.map(p => ({ id: p.id, name: p.name, desc: p.description, price: p.price, tags: p.tags })))}
        
        User Input: "${input}"
        
        Response limit: 2 small sentences. 
        Append: [SUGGESTION_IDS: id1, id2] at the end for matching items.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const aiText = response.text || "I apologize, my connection to the reserve is temporarily interrupted.";
      
      const suggestionMatch = aiText.match(/\[SUGGESTION_IDS: (.*?)\]/);
      let suggestions: any[] = [];
      let cleanedText = aiText;
      
      if (suggestionMatch) {
        const ids = suggestionMatch[1].split(',').map(id => id.trim());
        suggestions = PRODUCTS.filter(p => ids.includes(p.id));
        cleanedText = aiText.replace(/\[SUGGESTION_IDS: .*?\]/, '');
      }

      setMessages(prev => [...prev, { role: 'model', text: cleanedText, suggestions }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, I am currently indisposed." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col bg-bg-black md:rounded-[3rem] md:my-8 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden border sb-border">
      <header className="bg-sb-dark-green p-8 text-white flex items-center justify-between border-b sb-border">
        <div className="flex items-center gap-4">
           <div className="bg-white/5 p-3 rounded-full border sb-border">
              <Sparkles className="w-6 h-6 text-sb-gold" />
           </div>
           <div>
              <h2 className="serif text-2xl italic tracking-wide">Concierge Barista</h2>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black">AI Powered Enrichment</p>
           </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
             {[...Array(3)].map((_,i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-sb-dark-green bg-sb-gold/20 flex items-center justify-center text-[8px] font-bold">
                   {String.fromCharCode(65 + i)}
                </div>
             ))}
          </div>
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">12 Active Users</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-10 space-y-10 no-scrollbar">
        {messages.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "flex gap-6 max-w-[85%]",
              msg.role === 'user' ? "ml-auto flex-row-reverse text-right" : ""
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center shrink-0 border sb-border shadow-2xl",
              msg.role === 'model' ? "bg-sb-dark-green text-sb-gold" : "bg-white/5 text-white/40"
            )}>
              {msg.role === 'model' ? <Coffee className="w-6 h-6" /> : <User className="w-6 h-6" />}
            </div>
            <div className="space-y-6">
              <div className={cn(
                "p-6 rounded-[2rem] text-sm leading-relaxed",
                msg.role === 'model' ? "bg-white/[0.03] text-sb-cream border sb-border rounded-tl-none font-medium serif text-lg italic" : "bg-sb-green text-white rounded-tr-none font-semibold shadow-[0_10px_30px_rgba(0,112,74,0.2)]"
              )}>
                {msg.text}
              </div>
              
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {msg.suggestions.map(p => (
                    <motion.button 
                      key={p.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-white/[0.02] border sb-border p-4 rounded-2xl flex items-center gap-4 shadow-xl hover:bg-white/[0.05] group transition-all"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-sb-dark-green">
                         <img src={p.imageUrl} className="w-full h-full object-cover opacity-80" alt="" referrerPolicy="no-referrer" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-white mb-1">{p.name}</p>
                        <p className="text-[10px] text-sb-gold font-black uppercase tracking-widest">{formatPrice(p.price)}</p>
                      </div>
                      <Plus className="w-4 h-4 text-sb-gold group-hover:rotate-90 transition-transform" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex gap-6 max-w-[85%] animate-pulse">
            <div className="w-12 h-12 rounded-full bg-sb-dark-green border sb-border flex items-center justify-center">
              <Coffee className="w-6 h-6 text-sb-gold" />
            </div>
            <div className="bg-white/[0.03] p-6 rounded-[2.5rem] rounded-tl-none flex gap-2">
              <div className="w-1.5 h-1.5 bg-sb-gold rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-sb-gold/60 rounded-full animate-bounce delay-100" />
              <div className="w-1.5 h-1.5 bg-sb-gold/30 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-10 bg-sb-dark-green/30 border-t sb-border">
        <div className="flex gap-6">
          <input 
            type="text" 
            placeholder="Type your refined order here..." 
            className="flex-1 bg-white/[0.03] border sb-border px-8 py-5 rounded-full shadow-2xl focus:ring-1 focus:ring-sb-gold outline-none text-sb-cream placeholder:text-white/20 font-medium"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isTyping}
            className="bg-sb-cream text-bg-black w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(233,224,210,0.1)] hover:scale-110 active:scale-90 disabled:opacity-30 transition-all shrink-0"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
        <p className="text-[10px] text-white/20 text-center font-bold uppercase tracking-[0.4em] mt-6">
           Secure AI Processing Active
        </p>
      </div>
    </div>
  );
}
