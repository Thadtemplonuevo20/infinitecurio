import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Badge, Button } from '@blinkdotnew/ui';
import { Heart, Plus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  is_rare: number | boolean;
  category: string;
}

export const ProductCard = ({ product }: { product: Product }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group bg-white/5 border border-white/10 rounded-3xl p-4 transition-all duration-300 hover:border-primary/50 hover:bg-white/10"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl mb-4" style={{ transform: "translateZ(50px)" }}>
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {Number(product.is_rare) > 0 && (
          <div className="absolute top-3 left-3">
            <Badge variant="default" className="bg-primary text-white border-none neon-glow uppercase text-[10px] tracking-widest px-2 py-0.5">
              Rare Drop
            </Badge>
          </div>
        )}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full glass-card flex items-center justify-center text-white/60 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
          <Heart size={16} />
        </button>
      </div>

      <div style={{ transform: "translateZ(30px)" }}>
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
            {product.category}
          </span>
          <span className="text-sm font-bold text-primary">
            ${product.price.toLocaleString()}
          </span>
        </div>
        <h3 className="text-base font-semibold text-white/90 truncate mb-4">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2">
          <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 border-white/5 text-white text-xs h-10 rounded-xl">
            View Details
          </Button>
          <Button size="sm" variant="ghost" className="shrink-0 h-10 w-10 p-0 rounded-xl bg-primary/10 text-primary hover:bg-primary/20">
            <Plus size={18} />
          </Button>
        </div>
      </div>

      {/* Holographic light effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 pointer-events-none bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 transition-opacity duration-500" />
    </motion.div>
  );
};
