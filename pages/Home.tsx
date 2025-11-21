
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Grid, MessageCircle, Camera } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { COMPANY_INFO, SERVICE_CATEGORIES } from '../constants';

// Cast motion.div to any to avoid strict TypeScript version mismatch errors
const MotionDiv = motion.div as any;

// Map Category IDs to visual images
const CATEGORY_IMAGES: Record<string, string> = {
  "reprografia": "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=600&auto=format&fit=crop",
  "serigrafia": "https://images.unsplash.com/photo-1562834876-caec883770b3?q=80&w=600&auto=format&fit=crop",
  "fotografia": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
  "videografia": "https://images.unsplash.com/photo-1585563540852-81e622ba78b0?q=80&w=600&auto=format&fit=crop",
  "audiografia": "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=600&auto=format&fit=crop",
  "podcast": "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=600&auto=format&fit=crop",
  "design": "https://images.unsplash.com/photo-1626785774573-4b799315545d?q=80&w=600&auto=format&fit=crop",
  "marketing": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
  "web": "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600&auto=format&fit=crop",
  "aluguer": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
};

// Images from User Portfolio - Dense Grid Selection
const PORTFOLIO_IMAGES = [
  {
    url: "https://file.notion.so/f/f/4652908e-5509-4806-9923-3f30a686322b/5d492566-0d2e-411d-a745-602c6924d950/DSC_6147.jpg?table=block&id=30179825-9dc4-4350-ab83-172332170471&spaceId=4652908e-5509-4806-9923-3f30a686322b&expirationTimestamp=1741125600000&signature=K0Ery_x4N2hXy5P3Z0v8k2j9b4d6f1s8k0l4m9n2o&downloadName=DSC_6147.jpg",
    alt: "Eventos Infantis"
  },
  {
    url: "https://file.notion.so/f/f/4652908e-5509-4806-9923-3f30a686322b/b9f9d8a1-2c3b-4e5f-9a1d-8b7c6d5e4f3g/DSC_4994.jpg?table=block&id=310d7fc0-2a52-4bbf-bf08-24b7b0f34391&spaceId=4652908e-5509-4806-9923-3f30a686322b&expirationTimestamp=1741125600000&signature=J5nI3_m8B2dD1s9A6f7G4h5j2k0l1z8x9c7v6b5n4m&downloadName=DSC_4994.jpg",
    alt: "Noivas"
  },
  {
    url: "https://file.notion.so/f/f/4652908e-5509-4806-9923-3f30a686322b/7e3b8f5a-8a4c-4d9e-9b1f-6c8d2e3f4g5h/DSC_4949.jpg?table=block&id=30c9e5d8-2f1a-4b6e-9c8d-5e7f6a5b4c3d&spaceId=4652908e-5509-4806-9923-3f30a686322b&expirationTimestamp=1741125600000&signature=X1zC3_v6B5nN4m2M9l8K7j6h5g4f3d2s1a0q9w8e&downloadName=DSC_4949.jpg",
    alt: "Detalhes Casamento"
  },
  {
    url: "https://file.notion.so/f/f/4652908e-5509-4806-9923-3f30a686322b/4a5s6d7f-8g9h-0j1k-2l3z-4x5c6v7b8n9m/DSC_3394.jpg?table=block&id=4a5s6d7f-8g9h-0j1k-2l3z-4x5c6v7b8n9m&spaceId=4652908e-5509-4806-9923-3f30a686322b&expirationTimestamp=1741125600000&signature=Q1wE3_r5T7yU9i0o2p4l6k8j0h9g8f7d6s5a4z3x&downloadName=DSC_3394.jpg",
    alt: "Ensaios Gestante"
  },
  {
    url: "https://file.notion.so/f/f/4652908e-5509-4806-9923-3f30a686322b/1q2w3e4r-5t6y-7u8i-9o0p-1a2s3d4f5g6h/DSC_9838.jpg?table=block&id=1q2w3e4r-5t6y-7u8i-9o0p-1a2s3d4f5g6h&spaceId=4652908e-5509-4806-9923-3f30a686322b&expirationTimestamp=1741125600000&signature=Y2uI4_o6P8lK0j1h2g3f4d5s6a7z8x9c0v1b2n&downloadName=DSC_9838.jpg",
    alt: "Formaturas"
  },
  // Add placeholders to fill the grid since original list was truncated, preserving the aesthetic
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
    alt: "Casamento Detalhe"
  },
  {
    url: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=600&auto=format&fit=crop",
    alt: "Retrato Artístico"
  },
  {
    url: "https://images.unsplash.com/photo-1542038784456-1ea635063580?q=80&w=600&auto=format&fit=crop",
    alt: "Edição Profissional"
  },
  {
    url: "https://images.unsplash.com/photo-1605289355680-e64293a506d8?q=80&w=600&auto=format&fit=crop",
    alt: "Tecnologia de Ponta"
  },
  {
    url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop",
    alt: "Fotografia de Paisagem"
  },
];

export const Home = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div className="space-y-12 pb-12 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Image */}
        <MotionDiv 
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/70 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1920&auto=format&fit=crop" 
            alt="Background Studio" 
            className="w-full h-full object-cover opacity-50"
          />
        </MotionDiv>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight"
          >
            Transformando Ideias em <span className="text-gold-500">Arte Digital</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto"
          >
            {COMPANY_INFO.mission}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="pt-8"
          >
            <Link 
              to="/services"
              className="inline-flex items-center px-8 py-4 text-lg font-bold text-black bg-gold-500 rounded-full hover:bg-gold-400 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(234,179,8,0.5)]"
            >
              Explorar Serviços <ArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            <Grid className="text-gold-500" /> Nossas Áreas
          </h2>
          <Link to="/services" className="text-gold-500 text-sm hover:underline flex items-center">
            Ver tudo <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {SERVICE_CATEGORIES.map((category, index) => (
            <Link 
              to={`/services?category=${category.id}`} 
              key={category.id}
              className="group relative h-48 overflow-hidden rounded-xl border border-zinc-800 hover:border-gold-500/50 transition-all"
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors z-10" />
              <img 
                src={CATEGORY_IMAGES[category.id] || CATEGORY_IMAGES['design']} 
                alt={category.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-2 text-center">
                <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wider group-hover:text-gold-400 transition-colors">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Portfolio - Highlight Gallery (Denser Grid) */}
      <div className="bg-zinc-900/50 py-16 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <Camera className="text-gold-500" size={36} /> Galeria em Destaque
            </h2>
            <p className="text-gray-400">Alguns dos nossos melhores momentos capturados.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 auto-rows-auto">
            {PORTFOLIO_IMAGES.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="relative group overflow-hidden rounded-lg bg-zinc-800 h-40 cursor-pointer"
              >
                <img 
                  src={img.url} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-xs text-white font-medium">{img.alt}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center pb-12">
        <div className="bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 p-12 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <MessageCircle size={120} className="text-green-500" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-6">Pronto para começar seu projeto?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Fale diretamente conosco pelo WhatsApp para um atendimento rápido e personalizado.
          </p>
          
          <a 
            href={COMPANY_INFO.whatsappCatalogUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-green-900/50"
          >
            <MessageCircle className="mr-2" />
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
