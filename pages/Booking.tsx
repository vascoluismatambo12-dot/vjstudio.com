import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVICE_CATEGORIES, COMPANY_INFO, PAYMENT_ACCOUNTS } from '../constants';
import { PAYMENT_METHODS, BookingFormState } from '../types';
import { PricingCalculator } from '../components/PricingCalculator';
import { Send, ArrowLeft, Smartphone, Loader2, CheckCircle } from 'lucide-react';

export const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find service or default to first
  const allServices = SERVICE_CATEGORIES.flatMap(c => c.services);
  const preSelectedService = allServices.find(s => s.id === id);
  
  const [selectedServiceId, setSelectedServiceId] = useState(preSelectedService?.id || '');
  const [formData, setFormData] = useState<BookingFormState>({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    serviceId: selectedServiceId,
    date: '',
    location: '',
    paymentMethod: PAYMENT_METHODS[0],
  });
  
  const [estimatedTotal, setEstimatedTotal] = useState(0);

  // Payment Simulation State
  const [paymentStep, setPaymentStep] = useState<'idle' | 'processing' | 'completed'>('idle');
  const [paymentPhoneNumber, setPaymentPhoneNumber] = useState('');

  // Update local state when ID param changes
  useEffect(() => {
    if (id) setSelectedServiceId(id);
  }, [id]);

  const currentService = allServices.find(s => s.id === selectedServiceId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'serviceId') setSelectedServiceId(value);
    if (name === 'phone' && !paymentPhoneNumber) setPaymentPhoneNumber(value);
  };

  const handlePricingUpdate = (updates: Partial<BookingFormState>, total: number) => {
    setFormData(prev => ({ ...prev, ...updates }));
    setEstimatedTotal(total);
  };

  const handleAutoPayment = () => {
    if (!paymentPhoneNumber) {
      alert("Por favor, insira o número para pagamento.");
      return;
    }
    setPaymentStep('processing');
    
    // Simulate API delay
    setTimeout(() => {
      alert(`Foi enviado um pedido de autorização para o número ${paymentPhoneNumber}.\n\nPor favor, insira o seu PIN no celular para confirmar a transação.`);
      
      // Simulate success after user confirms on phone
      setTimeout(() => {
        setPaymentStep('completed');
      }, 2000);
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.paymentMethod === "M-Pesa / e-Mola" && paymentStep !== 'completed') {
      alert("Por favor, realize o pagamento automático antes de confirmar o agendamento.");
      return;
    }

    // Construct WhatsApp Message
    let message = `*Novo Pedido de Serviço - ${COMPANY_INFO.name}*\n\n`;
    message += `*Cliente:* ${formData.name}\n`;
    message += `*Serviço:* ${currentService?.name}\n`;
    message += `*Data:* ${formData.date}\n`;
    message += `*Local:* ${formData.location}\n`;
    message += `*Email:* ${formData.email}\n`;
    message += `*Contato:* ${formData.phone}\n`;
    message += `*Pagamento:* ${formData.paymentMethod}\n`;
    
    if (formData.paymentMethod === "M-Pesa / e-Mola") {
      message += `*Status Pagamento:* Confirmado via Sistema Automático (Simulação)\n`;
    }

    if (estimatedTotal > 0) {
      message += `\n*Detalhes do Orçamento:*\n`;
      if (formData.weddingPackage) message += `- Pacote Casamento: ${formData.weddingPackage}\n`;
      if (formData.photoCount) message += `- Qtd Fotos: ${formData.photoCount}\n`;
      if (formData.droneService) message += `- Drone Incluso: Sim\n`;
      message += `*Total Estimado:* ${estimatedTotal.toLocaleString('pt-MZ')} MT\n`;
    }

    message += `\nAguardo confirmação.`;

    // Redirect to WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/258876665429?text=${encodedMessage}`; 
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={20} className="mr-2" /> Cancelar
      </button>

      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Agendamento de Serviço</h1>
          <p className="text-gray-400 mb-8">Preencha o formulário para solicitar o orçamento ou confirmar a compra.</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Personal Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gold-500 border-b border-zinc-800 pb-2">1. Dados Pessoais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Nome Completo</label>
                  <input required name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Email</label>
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Nº de Celular</label>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Nº de WhatsApp</label>
                  <input required name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} type="tel" className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none" />
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gold-500 border-b border-zinc-800 pb-2">2. Seleção do Serviço</h2>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1">Serviço Desejado</label>
                <select 
                  name="serviceId" 
                  value={selectedServiceId} 
                  onChange={handleInputChange}
                  className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none"
                >
                  <option value="">Selecione um serviço...</option>
                  {SERVICE_CATEGORIES.map(cat => (
                    <optgroup key={cat.id} label={cat.title}>
                      {cat.services.map(svc => (
                        <option key={svc.id} value={svc.id}>{svc.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Data Preferencial</label>
                  <input required name="date" value={formData.date} onChange={handleInputChange} type="date" className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Local (Bairro, Cidade)</label>
                  <input required name="location" value={formData.location} onChange={handleInputChange} type="text" className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-gold-500 outline-none" />
                </div>
              </div>

              {/* Pricing Calculator Integration */}
              {currentService && (
                <PricingCalculator 
                  category={currentService.category}
                  serviceName={currentService.name}
                  onUpdate={handlePricingUpdate}
                />
              )}
            </div>

            {/* Payment */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gold-500 border-b border-zinc-800 pb-2">3. Pagamento</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PAYMENT_METHODS.map(method => (
                  <label key={method} className={`flex items-center p-4 border rounded cursor-pointer transition-colors ${formData.paymentMethod === method ? 'border-gold-500 bg-gold-500/10' : 'border-zinc-700 hover:border-zinc-600'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value={method} 
                      checked={formData.paymentMethod === method}
                      onChange={(e) => {
                        handleInputChange(e);
                        setPaymentStep('idle'); // Reset automatic flow if switched
                      }}
                      className="mr-3 accent-gold-500"
                    />
                    <span className="text-sm text-white font-medium">{method}</span>
                  </label>
                ))}
              </div>

              {/* Automatic Payment Flow (M-Pesa / e-Mola) */}
              {formData.paymentMethod === "M-Pesa / e-Mola" && (
                 <div className="p-6 bg-zinc-800/50 rounded border border-zinc-700 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <Smartphone className="text-gold-500" />
                      Pagamento Automático
                    </h3>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 rounded bg-red-600/20 text-red-500 text-xs font-bold">M-PESA</span>
                      <span className="px-2 py-1 rounded bg-orange-600/20 text-orange-500 text-xs font-bold">E-MOLA</span>
                    </div>
                  </div>

                  {paymentStep === 'idle' && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-400">
                        Insira o número de celular registado no M-Pesa ou e-Mola para receber o pedido de pagamento.
                      </p>
                      <div className="flex gap-2">
                         <input 
                          type="tel" 
                          placeholder="84/85/86/87..."
                          value={paymentPhoneNumber}
                          onChange={(e) => setPaymentPhoneNumber(e.target.value)}
                          className="flex-1 bg-black border border-zinc-600 rounded p-3 text-white focus:border-gold-500 outline-none"
                        />
                        <button 
                          type="button"
                          onClick={handleAutoPayment}
                          disabled={!paymentPhoneNumber || estimatedTotal === 0}
                          className="bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold px-6 rounded transition-colors"
                        >
                          Pagar
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                         <p>Números Autorizados da Empresa:</p>
                         <p>M-Pesa: {PAYMENT_ACCOUNTS.mpesa} ({PAYMENT_ACCOUNTS.recipient})</p>
                         <p>e-Mola: {PAYMENT_ACCOUNTS.emola} ({PAYMENT_ACCOUNTS.recipient})</p>
                      </div>
                    </div>
                  )}

                  {paymentStep === 'processing' && (
                    <div className="text-center py-8 space-y-4">
                      <Loader2 className="w-10 h-10 text-gold-500 animate-spin mx-auto" />
                      <h4 className="text-white font-bold">Aguardando Confirmação...</h4>
                      <p className="text-sm text-gray-400 animate-pulse">
                        Por favor, verifique o seu celular e insira o PIN para confirmar a transação de {estimatedTotal.toLocaleString('pt-MZ')} MT.
                      </p>
                    </div>
                  )}

                  {paymentStep === 'completed' && (
                    <div className="text-center py-6 space-y-2 bg-green-900/20 border border-green-500/30 rounded">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                      <h4 className="text-white font-bold text-lg">Pagamento Confirmado!</h4>
                      <p className="text-sm text-green-400">A transação foi processada com sucesso.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Bank Transfer Details */}
              {formData.paymentMethod === "Transferência Bancária" && (
                <div className="p-6 bg-blue-950/30 rounded border border-blue-900/50 animate-in fade-in">
                  <p className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Dados Bancários (BIB)</p>
                  <div className="flex flex-col space-y-4">
                    <div>
                      <span className="text-gray-400 text-xs uppercase block mb-1">Número da Conta / NIB</span>
                      <span className="text-2xl font-mono text-white tracking-widest">{PAYMENT_ACCOUNTS.bib}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs uppercase block mb-1">Titular</span>
                      <span className="text-white font-medium">{PAYMENT_ACCOUNTS.recipient}</span>
                    </div>
                  </div>
                  <p className="text-xs text-blue-300 mt-4 border-t border-blue-900/50 pt-2">
                    Por favor, envie o comprovativo no WhatsApp após finalizar o pedido.
                  </p>
                </div>
              )}

              <div className="bg-zinc-900 p-4 rounded border border-zinc-700 text-sm text-gray-400">
                <p>Nota: Para brindes de casamento, é emitida uma nota após a 1ª prestação (50%). O trabalho final é entregue após o pagamento total.</p>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={formData.paymentMethod === "M-Pesa / e-Mola" && paymentStep !== 'completed'}
              className="w-full bg-gold-500 hover:bg-gold-400 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-black font-bold text-lg py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)]"
            >
              Confirmar Agendamento <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}