import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@blinkdotnew/ui';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden cyber-grid pt-16">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 blur-[120px] rounded-full animate-pulse delay-700" />
      
      <div className="container px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6 uppercase tracking-widest"
        >
          <Sparkles size={12} />
          <span>The Next Frontier of Collecting</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]"
        >
          CURATING THE <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-accent">
            FUTURE OF RARE
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
        >
          Infinite Curio reimagines the premium marketplace as an immersive galactic gallery. 
          Discover rare comics, luxury sneakers, and one-of-a-kind designer pieces.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-14 text-base font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)] group">
            Explore Collection
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5 rounded-full px-8 h-14 text-base font-medium">
            View Rare Drops
          </Button>
        </motion.div>
      </div>

      {/* Floating Elements decoration */}
      <motion.div 
        className="absolute top-20 right-[10%] w-24 h-24 glass-card rounded-2xl rotate-12 hidden lg:block"
        animate={{ y: [0, -20, 0], rotate: [12, 15, 12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-40 left-[15%] w-32 h-32 glass-card rounded-full -rotate-12 hidden lg:block"
        animate={{ y: [0, 20, 0], rotate: [-12, -15, -12] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
};
