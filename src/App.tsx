import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { blinkAPI } from './lib/blink-api';
import { motion } from 'framer-motion';
import { Badge } from '@blinkdotnew/ui';
import { ChevronRight, Filter, SortDesc } from 'lucide-react';

// Final Fixed Version - Resolving featuredProducts reference error
const App = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => blinkAPI('db/rest/v1/categories')
  });

  const { data: featuredProducts = [], isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => blinkAPI('db/rest/v1/products?is_featured=eq.1&order=created_at.desc')
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />

        {/* Categories Scroller */}
        <section className="py-20 border-y border-white/5 bg-white/[0.01]">
          <div className="container px-6 mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-white">Curated Collections</h2>
              <div className="flex items-center gap-2 text-primary text-sm font-medium cursor-pointer group">
                Browse all categories 
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories?.map((cat: { id: string; name: string; slug: string; image_url: string }) => (
                <motion.div 
                  key={cat.id}
                  whileHover={{ y: -5 }}
                  className="group relative h-40 rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img 
                    src={cat.image_url || `https://images.unsplash.com/photo-1608319917470-9d9179430f6a?q=80&w=600&auto=format&fit=crop`} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                    <p className="text-[10px] text-white/60 uppercase tracking-widest">
                      {cat.slug}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24">
          <div className="container px-6 mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <Badge variant="outline" className="border-primary/30 text-primary mb-3 uppercase tracking-[0.2em] text-[10px]">
                  Limited Inventory
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Rare Drops & Treasures</h2>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors text-white">
                  <Filter size={16} /> Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors text-white">
                  <SortDesc size={16} /> Sort
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-[3/4] rounded-3xl bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts?.map((product: any) => (
                  <ProductCard key={product.id} product={{
                    ...product,
                    category: categories.find((c: any) => c.id === product.category_id)?.name || 'Collectible'
                  }} />
                ))}
              </div>
            )}

            <div className="mt-20 text-center">
              <button className="px-10 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all text-sm font-semibold tracking-widest uppercase text-white">
                View Entire Marketplace
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="py-24 bg-primary/5 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="container px-6 mx-auto text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6 text-white">NEVER MISS A DROP.</h2>
            <p className="text-white/40 max-w-xl mx-auto mb-10">
              Join the Infinite Curio circle for early access to the world's rarest collectibles and designer pieces.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full h-14 bg-white/5 border border-white/10 rounded-full px-8 outline-none focus:border-primary transition-colors text-white"
              />
              <button className="w-full sm:w-auto h-14 px-10 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">IC</span>
              </div>
              <span className="font-bold tracking-tighter text-sm text-white">INFINITE CURIO</span>
            </div>
            
            <div className="flex items-center gap-8 text-xs text-white/40 uppercase tracking-widest font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Shipping</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
            
            <p className="text-xs text-white/20">
              &copy; 2026 INFINITE CURIO MARKETPLACE. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
