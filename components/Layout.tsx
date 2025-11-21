import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../constants';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Cast motion.div to any to avoid strict TypeScript version mismatch errors
const MotionDiv = motion.div as any;

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-black text-gray-100 selection:bg-gold-500 selection:text-black relative">
      
      {/* Background Animation Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <MotionDiv 
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-gold-600/20 rounded-full blur-3xl"
        />
        <MotionDiv 
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-3xl"
        />
        <MotionDiv 
           animate={{ 
            opacity: [0, 0.05, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-1/4 w-full h-64 bg-gradient-to-t from-gold-900/10 to-transparent"
        />
      </div>

      {/* Top Header Style - z-10 to sit above background */}
      <header className="border-b border-gray-800 bg-zinc-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          {/* Simplified Title Row */}
          <div className="p-4 text-center md:text-left flex justify-between items-center">
            <div className="font-bold text-2xl tracking-tighter flex items-center">
              <Link to="/" className="block">
                <img 
                  src="https://file.notion.so/f/f/4652908e-5509-4806-9923-3f30a686322b/b0d1391d-28e4-4c53-9b99-70d416777a34/VJ_Studio_Logo.png?table=block&id=1a355199-108c-8037-b29d-e4435e5d6453&spaceId=4652908e-5509-4806-9923-3f30a686322b&expirationTimestamp=1741125600000&signature=kI-vCjL8Ww65mQO52l_nC4Kj3zJ9kZc97Z6d6C8t-b8&downloadName=VJ+Studio+Logo.png" 
                  alt={COMPANY_INFO.name}
                  className="h-24 w-auto object-contain invert" 
                />
              </Link>
            </div>
             {/* Mobile Toggle */}
             <div className="md:hidden p-2 flex justify-between items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gold-500">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
           </div>
          </div>
          
          {/* Mission Vision Values - Clean Layout without borders, Serif Font */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 p-6 text-center border-t border-zinc-800/50">
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-gold-500 font-serif font-bold text-xl">Missão</h3>
              <p className="text-gray-400 font-serif italic text-sm leading-relaxed">{COMPANY_INFO.mission}</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
               <h3 className="text-gold-500 font-serif font-bold text-xl">Visão</h3>
               <p className="text-gray-400 font-serif italic text-sm leading-relaxed">{COMPANY_INFO.vision}</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
               <h3 className="text-gold-500 font-serif font-bold text-xl">Valores</h3>
               <p className="text-gray-400 font-serif italic text-sm leading-relaxed">{COMPANY_INFO.values}</p>
            </div>
          </div>

           {isMenuOpen && (
             <div className="md:hidden bg-zinc-900 p-6 border-t border-gray-800 space-y-6 text-sm font-serif">
                <div className="text-center">
                  <strong className="block text-gold-500 text-lg mb-1">Missão</strong> 
                  <span className="italic text-gray-400">{COMPANY_INFO.mission}</span>
                </div>
                <div className="text-center">
                  <strong className="block text-gold-500 text-lg mb-1">Visão</strong> 
                  <span className="italic text-gray-400">{COMPANY_INFO.vision}</span>
                </div>
                <div className="text-center">
                  <strong className="block text-gold-500 text-lg mb-1">Valores</strong> 
                  <span className="italic text-gray-400">{COMPANY_INFO.values}</span>
                </div>
             </div>
           )}
        </div>
      </header>

      <main className="flex-grow relative z-10">
        {children}
      </main>

      <footer className="bg-zinc-900 border-t border-gray-800 py-8 text-center text-sm text-gray-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};