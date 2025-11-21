
import React, { useEffect, useState } from 'react';
import { BookingFormState } from '../types';
import { DETAILED_PRICING } from '../constants';

interface Props {
  category: string;
  serviceName: string;
  onUpdate: (updates: Partial<BookingFormState>, total: number) => void;
}

export const PricingCalculator: React.FC<Props> = ({ category, serviceName, onUpdate }) => {
  const [total, setTotal] = useState(0);
  
  // Local states for specific logic
  const [photoCount, setPhotoCount] = useState(5);
  const [weddingPkg, setWeddingPkg] = useState<'simple'|'medium'|'premium'>('simple');
  const [eventVideoDuration, setEventVideoDuration] = useState(5);
  const [drone, setDrone] = useState(false);

  // Logic for Detailed Pricing Tables (Reprografia, Serigrafia, Quadros, Web Design)
  const categoryKey = category.toLowerCase();
  const hasDetailedPricing = DETAILED_PRICING[categoryKey] !== undefined;
  const [selectedItemName, setSelectedItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);

  // Initialize default selection for detailed pricing
  useEffect(() => {
    if (hasDetailedPricing && !selectedItemName) {
      const firstItem = DETAILED_PRICING[categoryKey][0]?.items[0];
      if (firstItem) setSelectedItemName(firstItem.name);
    }
  }, [hasDetailedPricing, categoryKey, selectedItemName]);

  const normalizedName = serviceName.toLowerCase();
  
  // Category/Type Logic
  const isWedding = normalizedName.includes('casamento');
  // Photo session is specifically photography services that are NOT weddings and NOT unit-based prints
  const isPhotoSession = category.toLowerCase().includes('fotografia') && !isWedding && !normalizedName.includes('impressão') && !normalizedName.includes('quadros');
  const isEventCoverage = !isWedding && (normalizedName.includes('cobertura') || normalizedName.includes('evento'));

  // Drone Eligibility Logic
  const isCorporate = normalizedName.includes('empresarial') || normalizedName.includes('corporativ') || normalizedName.includes('institucional');
  const isCultural = normalizedName.includes('cultural') || normalizedName.includes('evento');
  const canHaveDrone = isWedding || (isEventCoverage && (isCorporate || isCultural));

  useEffect(() => {
    let calculatedTotal = 0;
    const updates: Partial<BookingFormState> = {};

    if (hasDetailedPricing) {
      // Find the selected item price
      let pricePerUnit = 0;
      DETAILED_PRICING[categoryKey].forEach(cat => {
        const item = cat.items.find(i => i.name === selectedItemName);
        if (item) pricePerUnit = item.price;
      });

      calculatedTotal = pricePerUnit * itemQuantity;
      updates.selectedItemName = selectedItemName;
      updates.itemQuantity = itemQuantity;

    } else if (isWedding) {
      // Wedding Packages Updated Prices
      if (weddingPkg === 'simple') calculatedTotal = 10000;
      if (weddingPkg === 'medium') calculatedTotal = 15000;
      if (weddingPkg === 'premium') calculatedTotal = 20000;
      
      updates.weddingPackage = weddingPkg;
    } else if (isPhotoSession) {
      // Photo Session: 150mt per photo, min 5
      const count = Math.max(5, photoCount);
      calculatedTotal = count * 150;
      
      if (count <= 9) updates.photoPackage = 'lite';
      else if (count <= 19) updates.photoPackage = 'medium';
      else updates.photoPackage = 'premium'; 
      
      updates.photoCount = count;
    } else if (isEventCoverage) {
      // General Event Coverage
      const minPhotos = 100;
      calculatedTotal += minPhotos * 50; 

      if (eventVideoDuration <= 5) calculatedTotal += 2000;
      else if (eventVideoDuration <= 15) calculatedTotal += 3500;
      else calculatedTotal += 4500;
      
      updates.videoDuration = eventVideoDuration;
    }

    // Drone add-on (Only if allowed)
    if (drone && canHaveDrone) {
      calculatedTotal += 5000;
      updates.droneService = true;
    } else {
      updates.droneService = false;
    }

    setTotal(calculatedTotal);
    onUpdate(updates, calculatedTotal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoCount, weddingPkg, eventVideoDuration, drone, isPhotoSession, isWedding, isEventCoverage, canHaveDrone, hasDetailedPricing, selectedItemName, itemQuantity]);

  return (
    <div className="space-y-6 bg-zinc-900 p-6 rounded-lg border border-zinc-800">
      <h3 className="text-lg font-bold text-gold-500 border-b border-zinc-800 pb-2 mb-4">
        Configuração do Orçamento
      </h3>

      {hasDetailedPricing && (
         <div className="space-y-4 animate-in fade-in">
           <div>
             <label className="block text-sm font-medium text-gray-300 mb-2">Selecione o Item Específico</label>
             <select 
                value={selectedItemName}
                onChange={(e) => setSelectedItemName(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none"
              >
                {DETAILED_PRICING[categoryKey].map((group) => (
                  <optgroup key={group.category} label={group.category}>
                    {group.items.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name} - {item.displayPrice ? item.displayPrice + ' MT' : item.price + ' MT'}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
           </div>
           <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Quantidade</label>
              <input 
                type="number" 
                min="1"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none"
              />
           </div>
         </div>
      )}

      {isWedding && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">Selecione o Pacote de Casamento</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setWeddingPkg('simple')}
              className={`p-4 border rounded-lg text-left transition-all ${weddingPkg === 'simple' ? 'border-gold-500 bg-gold-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}
            >
              <div className="font-bold text-white">Simples (10.000 MT)</div>
              <div className="text-xs text-gray-400 mt-1">1 Dia, Fotos Ilimitadas, Vídeo 30min, Pendrive</div>
            </button>
            <button
              type="button"
              onClick={() => setWeddingPkg('medium')}
              className={`p-4 border rounded-lg text-left transition-all ${weddingPkg === 'medium' ? 'border-gold-500 bg-gold-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}
            >
              <div className="font-bold text-white">Medium (15.000 MT)</div>
              <div className="text-xs text-gray-400 mt-1">2 Dias, Vídeo 1h, Chávenas Simples, A3 Foto</div>
            </button>
            <button
              type="button"
              onClick={() => setWeddingPkg('premium')}
              className={`p-4 border rounded-lg text-left transition-all ${weddingPkg === 'premium' ? 'border-gold-500 bg-gold-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}
            >
              <div className="font-bold text-white">Premium (20.000 MT)</div>
              <div className="text-xs text-gray-400 mt-1">3 Dias, Chávenas Mágicas, Acesso Vitalício Nuvem</div>
            </button>
          </div>
        </div>
      )}

      {isPhotoSession && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Número de Fotos (Min: 5) - 150mt/foto
          </label>
          <input 
            type="number" 
            min="5"
            value={photoCount}
            onChange={(e) => setPhotoCount(parseInt(e.target.value) || 5)}
            className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none"
          />
          <div className="text-xs text-gray-500 mt-2">
            Pacote Atual: {photoCount < 10 ? 'Lite' : photoCount < 20 ? 'Medium' : 'Max/Premium'}
          </div>
        </div>
      )}

      {isEventCoverage && (
        <div className="space-y-4">
          <div>
             <p className="text-sm text-gray-400 mb-2">Fotos: 50mt/cada (Mínimo 100 fotos cobrado no total)</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Duração do Vídeo Final</label>
            <select 
              value={eventVideoDuration}
              onChange={(e) => setEventVideoDuration(parseInt(e.target.value))}
              className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none"
            >
              <option value={5}>Trailer (5 min) - 2000mt</option>
              <option value={15}>Curta (15 min) - 3500mt</option>
              <option value={30}>Longa (30 min) - 4500mt</option>
            </select>
          </div>
        </div>
      )}

      {/* Drone Option - Restricted visibility */}
      {canHaveDrone && (
        <div className="flex items-center space-x-3 p-4 bg-black/30 rounded border border-zinc-800 animate-in fade-in">
          <input 
            type="checkbox" 
            id="drone"
            checked={drone}
            onChange={(e) => setDrone(e.target.checked)}
            className="w-5 h-5 accent-gold-500"
          />
          <label htmlFor="drone" className="text-white font-medium cursor-pointer select-none">
            Adicionar Imagens Aéreas com Drone (+5000mt)
          </label>
        </div>
      )}

      <div className="pt-4 border-t border-zinc-800 flex justify-between items-end">
        <span className="text-gray-400">Total Estimado:</span>
        <span className="text-3xl font-bold text-gold-500">{total.toLocaleString('pt-MZ')} MT</span>
      </div>
      <p className="text-xs text-gray-500 text-right mt-1">
        *50% no ato da contratação
      </p>
    </div>
  );
};
