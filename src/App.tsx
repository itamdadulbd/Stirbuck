import React, { Suspense, lazy, ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, User, MessageSquare, Coffee } from 'lucide-react';
import { cn } from './lib/utils';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Chat = lazy(() => import('./pages/Chat'));
const Checkout = lazy(() => import('./pages/Checkout'));

function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg-black/90 backdrop-blur-xl border-t border-white/5 px-6 py-3 z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b sb-border">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="hidden md:flex items-center gap-3 group">
          <div className="w-10 h-10 bg-sb-green rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
             <Coffee className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-sb-cream text-xl tracking-[0.2em] uppercase">STARBUCKS</span>
        </Link>
        
        <div className="flex gap-8 md:gap-12 w-full justify-around md:w-auto md:justify-end">
          <NavLink to="/" icon={<Coffee />} label="Order" active={location.pathname === '/'} />
          <NavLink to="/menu" icon={<Search />} label="Menu" active={location.pathname === '/menu'} />
          <NavLink to="/chat" icon={<MessageSquare />} label="AI Assistant" active={location.pathname === '/chat'} />
          <NavLink to="/checkout" icon={<ShoppingBag />} label="Cart" active={location.pathname === '/checkout'} />
          <NavLink to="/profile" icon={<User />} label="Stars" active={location.pathname === '/profile'} />
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, label, active }: { to: string; icon: ReactElement; label: string; active: boolean }) {
  return (
    <Link to={to} className={cn(
      "flex flex-col items-center gap-1 transition-all duration-300",
      active ? "text-sb-gold" : "text-white/40 hover:text-white"
    )}>
      <motion.div 
        whileTap={{ scale: 0.8 }}
        className={cn(
          "p-1 rounded-xl transition-colors",
          active && "bg-white/5"
        )}
      >
        {linkIcon(icon)}
      </motion.div>
      <span className="text-[10px] font-bold tracking-[0.1em] uppercase">{label}</span>
    </Link>
  );
}

function linkIcon(icon: ReactElement) {
  return React.cloneElement(icon, {
    className: cn((icon.props as any).className, "w-6 h-6")
  } as any);
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-black text-sb-cream font-sans">
        <Navbar />
        
        <main className="pb-24 md:pb-0 md:pt-24 min-h-screen">
          <AnimatePresence mode="wait">
            <Suspense fallback={
              <div className="h-screen flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-12 h-12 border-4 border-[#006241] border-t-transparent rounded-full"
                />
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}
