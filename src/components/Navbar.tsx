import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, User, Menu, Globe } from 'lucide-react';
import { Button } from '@blinkdotnew/ui';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/40 backdrop-blur-md border-b border-white/5 h-16 flex items-center px-6 md:px-12 justify-between">
      <div className="flex items-center gap-8">
        <motion.div 
          className="text-xl font-bold tracking-tighter flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(157,0,255,0.5)]">
            <span className="text-white text-xs">IC</span>
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            INFINITE CURIO
          </span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
          <a href="#" className="hover:text-primary transition-colors">Shop</a>
          <a href="#" className="hover:text-primary transition-colors">Collections</a>
          <a href="#" className="hover:text-primary transition-colors">Rare Drops</a>
          <a href="#" className="hover:text-primary transition-colors">Marketplace</a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-white/40">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search treasures..." 
            className="bg-transparent border-none outline-none text-xs w-32 focus:w-48 transition-all text-white"
          />
        </div>
        <Button variant="ghost" size="icon" className="text-white/60 hover:text-primary">
          <ShoppingCart size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-white/60 hover:text-primary">
          <User size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden text-white/60">
          <Menu size={20} />
        </Button>
      </div>
    </nav>
  );
};
