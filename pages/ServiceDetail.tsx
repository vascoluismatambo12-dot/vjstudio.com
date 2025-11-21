
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SERVICE_CATEGORIES, DETAILED_PRICING } from '../constants';
import { ArrowLeft, Calendar, Check } from 'lucide-react';

export const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Flatten categories to find service
  const service = SERVICE_CATEGORIES.flatMap(c => c.services).find(s => s.id === id);

  if (!service) {
    return <Navigate to="/services" />;
  }

  const pricingTable = DETAILED_PRICING[service.category.toLowerCase()];

  return (
    <div className="max-w-5xl mx-auto p-4 py-12">
      <Link to="/services" className="inline-flex items-center text-gray-400 hover:text-gold-500 mb-8 transition-colors">
        <ArrowLeft size={20} className="mr-2" /> Voltar aos Serviços
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Visuals Column */}
        <div className="space-y-6">
          <div className="aspect-video bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 relative">
            {/* Mock Video Player */}
            <img 
              src={`https://picsum.photos/800/450?random=${service.id}`} 
              alt="Video Thumbnail" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-black border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-xs text-white">
              Vídeo Demonstrativo
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <img 
              src={`https://picsum.photos/400/300?random=${service.id}1`} 
              alt="Detail 1" 
              className="rounded-lg border border-zinc-800 hover:border-gold-500 transition-colors"
            />
             <img 
              src={`https://picsum.photos/400/300?random=${service.id}2`} 
              alt="Detail 2" 
              className="rounded-lg border border-zinc-800 hover:border-gold-500 transition-colors"
            />
          </div>

          {/* Pricing Table Visualization (If applicable) */}
          {pricingTable && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mt-8">
              <h3 className="text-gold-500 font-bold text-lg mb-4 uppercase tracking-wider">Tabela de Preços</h3>
              <div className="space-y-6">
                {pricingTable.map((group, idx) => (
                  <div key={idx}>
                    <h4 className="text-white font-semibold text-sm bg-zinc-800 p-2 rounded-t border-b border-zinc-700">
                      {group.category}
                    </h4>
                    <table className="w-full text-sm text-gray-400">
                      <tbody>
                        {group.items.map((item, itemIdx) => (
                          <tr key={itemIdx} className="border-b border-zinc-800 last:border-0">
                            <td className="py-2 px-2">{item.name}</td>
                            <td className="py-2 px-2 text-right font-mono text-gold-400">
                              {item.displayPrice ? `${item.displayPrice} MT` : `${item.price} MT`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="flex flex-col justify-start space-y-8">
          <div>
            <h2 className="text-sm text-gold-500 font-bold uppercase tracking-widest mb-2">{service.category}</h2>
            <h1 className="text-4xl font-bold text-white mb-6">{service.name}</h1>
            <p className="text-gray-400 leading-relaxed">
              Este serviço oferece soluções completas e personalizadas para suas necessidades de {service.category.toLowerCase()}. 
              Nossa equipe garante qualidade excepcional, equipamentos de ponta e um resultado final que supera expectativas.
            </p>
          </div>

          <div className="space-y-4 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Check className="text-gold-500" size={18} /> O que está incluído:
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Execução profissional com equipamentos de ponta</li>
              <li>• Atendimento personalizado</li>
              <li>• Materiais de alta durabilidade</li>
              <li>• Garantia de satisfação</li>
            </ul>
          </div>

          <div className="pt-4 sticky top-24">
            <Link 
              to={`/booking/${service.id}`}
              className="w-full bg-gold-500 hover:bg-gold-400 text-black font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]"
            >
              <Calendar size={20} />
              Solicitar Orçamento
            </Link>
            <p className="text-xs text-gray-500 text-center mt-2">
              Configure os detalhes e valores na próxima etapa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
