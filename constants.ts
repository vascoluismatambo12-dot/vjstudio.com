
import { ServiceCategory, PricingTableCategory } from './types';

export const COMPANY_INFO = {
  name: "VJ Studio",
  whatsappCatalogUrl: "https://wa.me/c/258876665429",
  contactNumber: "+258 87 666 5429",
  mission: "Oferecer serviços de alta qualidade com criatividade e inovação, atendendo às necessidades de clientes de diferentes perfis.",
  vision: "Tornar-se referência regional nos serviços prestados, reconhecida pela excelência e diversidade.",
  values: "Profissionalismo, inovação, compromisso com o cliente e sustentabilidade."
};

export const PAYMENT_ACCOUNTS = {
  mpesa: "84 666 5427",
  emola: "87 666 5429",
  bib: "000100000085405784157",
  recipient: "VASCO LUIS MATAMBO"
};

export const DETAILED_PRICING: Record<string, PricingTableCategory[]> = {
  "reprografia": [
    {
      category: "Fotocópias (Papel Normal)",
      items: [
        { name: "A4 Preto/Branco", price: 2.5 },
        { name: "A4 Colorido", price: 20 },
      ]
    },
    {
      category: "Fotocópias (Papel Cartolina)",
      items: [
        { name: "A4 Preto/Branco", price: 5 },
        { name: "A4 Colorido", price: 25 },
      ]
    },
    {
      category: "Impressão (Papel Normal)",
      items: [
        { name: "A4 Preto/Branco", price: 2.5 },
        { name: "A4 Colorido", price: 25 },
        { name: "A3 Preto/Branco", price: 10 },
        { name: "A3 Colorido", price: 30 },
      ]
    },
    {
      category: "Encadernação",
      items: [
        { name: "6mm", price: 20 },
        { name: "8mm", price: 25 },
        { name: "10mm", price: 30 },
        { name: "12mm", price: 40 },
        { name: "14mm", price: 50 },
        { name: "16mm", price: 60 },
        { name: "18mm", price: 80 },
      ]
    },
    {
      category: "Plastificação",
      items: [
        { name: "BI / Cartão Pequeno", price: 20 },
        { name: "Certificado / A5", price: 25 },
        { name: "Documento A4", price: 35 },
      ]
    },
    {
      category: "Digitalização (Scanner)",
      items: [
        { name: "Cartas/Documentos Simples", price: 25 },
        { name: "CV Simples", price: 15 },
        { name: "CV Personalizado", price: 20 },
        { name: "Trabalhos de Pesquisa (p/ página)", price: 15 },
      ]
    },
    {
      category: "Edição e Formatação",
      items: [
        { name: "Carta", price: 5 },
        { name: "Trabalhos Científicos (p/ página)", price: 5 },
        { name: "Documentos Formais (p/ página)", price: 10 },
      ]
    },
    {
      category: "Itens de Escritório",
      items: [
        { name: "Envelope", price: 10 },
        { name: "Folha A4", price: 2 },
        { name: "Folha Cartolina", price: 5 },
        { name: "Caneta", price: 10 },
      ]
    }
  ],
  "serigrafia": [
    {
      category: "Cartões de Visita",
      items: [
        { name: "Design (Criação da Arte)", price: 200 },
        { name: "Impressão em Cartolina (unid)", price: 15 },
        { name: "Impressão em Papel Glossy (unid)", price: 20 },
      ]
    },
    {
      category: "Cartazes e Flyers",
      items: [
        { name: "Design (Criação da Arte)", price: 250 },
        { name: "Impressão Papel Normal", price: 30 },
        { name: "Impressão Papel Cartolina", price: 40 },
        { name: "Impressão Papel Glossy", price: 100 },
      ]
    },
    {
      category: "Convites Simples",
      items: [
        { name: "Design (Criação da Arte)", price: 250 },
        { name: "Impressão A6", price: 30 },
        { name: "Impressão A5", price: 40 },
        { name: "Impressão A4", price: 50 },
      ]
    },
    {
      category: "Convites Personalizados",
      items: [
        { name: "Tamanho A6", price: 50 },
        { name: "Tamanho A5", price: 60 },
        { name: "Acabamento com Dobra", price: 60 },
        { name: "Com Envelope", price: 70 },
        { name: "Com Caricatura", price: 80 },
        { name: "Com Design Personalizado", price: 80 },
        { name: "Com Selo", price: 90 },
        { name: "Carimbo", price: 100 },
        { name: "Autocolantes", price: 120 },
      ]
    },
    {
      category: "Personalização de Roupas",
      items: [
        { name: "Estampa / Personalização (p/ peça)", price: 400, displayPrice: "400 – 1.500" }
      ]
    },
    {
      category: "Brindes Personalizados",
      items: [
        { name: "Unidade (Variável conforme brinde)", price: 300, displayPrice: "300 – 3.000" }
      ]
    },
    {
      category: "Adesivos e Etiquetas",
      items: [
        { name: "Serviço de Impressão", price: 300, displayPrice: "300 – 800" }
      ]
    },
    {
      category: "Banners e Faixas Promocionais",
      items: [
        { name: "Produção e Acabamento", price: 500, displayPrice: "500 – 2.000" }
      ]
    },
    {
      category: "Comunicação Visual e Grandes Formatos",
      items: [
        { name: "Lonas / Painéis Publicitários", price: 2000, displayPrice: "2.000 – 10.000+" },
        { name: "Adesivos Vinil para Vitrines / Veículos", price: 1000, displayPrice: "1.000 – 8.000+" },
        { name: "Plotagem de Murais / Paredes / Fachadas", price: 5000, displayPrice: "5.000 – 20.000+" },
      ]
    }
  ],
  "fotografia": [
     {
      category: "Impressão de Fotos",
      items: [
        { name: "Tamanho A6", price: 40 },
        { name: "Tamanho A5", price: 50 },
        { name: "Tamanho A4", price: 150 },
        { name: "Topper", price: 100 },
      ]
    },
    {
      category: "Quadros Personalizados",
      items: [
        { name: "Tamanho A6", price: 200 },
        { name: "Tamanho A5", price: 250 },
        { name: "Tamanho A4", price: 350 },
        { name: "Tamanho A3", price: 700 },
      ]
    }
  ],
  "web design": [
    {
      category: "Desenvolvimento de Sites",
      items: [
        { name: "Site Institucional / Portfólio", price: 10000, displayPrice: "10.000 – 35.000" },
        { name: "Landing Page", price: 5000, displayPrice: "5.000 – 15.000" },
        { name: "E-commerce Básico", price: 20000, displayPrice: "20.000 – 60.000" },
        { name: "Blog / Página Pessoal", price: 10000, displayPrice: "10.000 – 20.000" },
      ]
    }
  ],
  "audiografia": [
    {
      category: "Serviços de Audiografia",
      items: [
        { name: "Locuções Profissionais (p/ hora)", price: 2000, displayPrice: "2.000 – 6.000" },
        { name: "Spots Publicitários (p/ spot)", price: 3000, displayPrice: "3.000 – 10.000" },
        { name: "Jingles / Identidade Sonora", price: 8000, displayPrice: "8.000 – 35.000" },
        { name: "Captação e Tratamento de Áudio (p/ hora)", price: 800, displayPrice: "800 – 2.500" },
        { name: "Narração de Livros / Documentários (p/ hora)", price: 2000, displayPrice: "2.000 – 6.000" },
        { name: "Trilhas Sonoras Originais", price: 10000, displayPrice: "10.000 – 60.000" },
      ]
    }
  ]
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "reprografia",
    title: "Reprografia",
    services: [
      { id: "rep-imp", name: "Impressão de Documentos (P/B e Colorida)", category: "Reprografia" },
      { id: "rep-foto", name: "Fotocópias", category: "Reprografia" },
      { id: "rep-dig", name: "Digitalização de Documentos", category: "Reprografia" },
      { id: "rep-enc", name: "Encadernações", category: "Reprografia" },
      { id: "rep-plas", name: "Plastificação", category: "Reprografia" },
      { id: "rep-mat", name: "Criação e impressão de materiais escolares/empresariais", category: "Reprografia" },
      { id: "rep-pers", name: "Personalização de Materiais", category: "Reprografia" },
    ]
  },
  {
    id: "serigrafia",
    title: "Serigrafia",
    services: [
      { id: "ser-roupa", name: "Personalização de Roupas", category: "Serigrafia" },
      { id: "ser-brinde", name: "Produção de Brindes Personalizados", category: "Serigrafia" },
      { id: "ser-adesivo", name: "Adesivos e Etiquetas", category: "Serigrafia" },
      { id: "ser-banner", name: "Banners e faixas promocionais", category: "Serigrafia" },
      { id: "ser-lona", name: "Lonas e painéis publicitários", category: "Serigrafia" },
      { id: "ser-vinil", name: "Adesivos vinil para vitrines e veículos", category: "Serigrafia" },
      { id: "ser-plot", name: "Plotagem de murais, paredes e fachadas", category: "Serigrafia" },
    ]
  },
  {
    id: "fotografia",
    title: "Fotografia Profissional",
    services: [
      { id: "foto-ensaio", name: "Ensaios Fotográficos", category: "Fotografia Profissional" },
      { id: "foto-prod", name: "Fotografia de Produtos", category: "Fotografia Profissional" },
      { id: "foto-corp", name: "Fotografia Corporativa e Empresarial", category: "Fotografia Profissional" },
      { id: "foto-cob", name: "Cobertura de Eventos (Casamentos, etc)", category: "Fotografia Profissional" },
      { id: "foto-imp", name: "Impressão de Fotos e Quadros", category: "Fotografia Profissional" }, 
    ]
  },
  {
    id: "videografia",
    title: "Videografia",
    services: [
      { id: "vid-inst", name: "Vídeos Institucionais", category: "Videografia" },
      { id: "vid-pub", name: "Vídeos Publicitários e Promocionais", category: "Videografia" },
      { id: "vid-evento", name: "Cobertura de Eventos", category: "Videografia" },
      { id: "vid-social", name: "Vídeos para Redes Sociais e YouTube", category: "Videografia" },
      { id: "vid-doc", name: "Documentários e Mini-Docs", category: "Videografia" },
      { id: "vid-edu", name: "Vídeos Educacionais e Institucionais", category: "Videografia" },
    ]
  },
  {
    id: "audiografia",
    title: "Audiografia",
    services: [
      { id: "aud-loc", name: "Locuções Profissionais", category: "Audiografia" },
      { id: "aud-spot", name: "Spots Publicitários", category: "Audiografia" },
      { id: "aud-jing", name: "Jingles e Identidade Sonora", category: "Audiografia" },
      { id: "aud-cap", name: "Captação e Tratamento de Áudio", category: "Audiografia" },
      { id: "aud-nar", name: "Narração de Livros/Documentários", category: "Audiografia" },
      { id: "aud-trilha", name: "Trilhas Sonoras Originais", category: "Audiografia" },
    ]
  },
  {
    id: "podcast",
    title: "Podcast",
    services: [
      { id: "pod-plan", name: "Planejamento e Estruturação", category: "Podcast" },
      { id: "pod-grav", name: "Gravação em Estúdio Profissional", category: "Podcast" },
      { id: "pod-edit", name: "Edição, Mixagem e Masterização", category: "Podcast" },
      { id: "pod-id", name: "Identidade Sonora e Vinhetas", category: "Podcast" },
      { id: "pod-pub", name: "Publicação e Distribuição", category: "Podcast" },
      { id: "pod-prom", name: "Criação de Material Visual e Promocional", category: "Podcast" },
    ]
  },
  {
    id: "design",
    title: "Design Gráfico",
    services: [
      { id: "des-logo", name: "Criação de Logotipos e Identidade Visual", category: "Design Gráfico" },
      { id: "des-pap", name: "Materiais de Papelaria Corporativa", category: "Design Gráfico" },
      { id: "des-social", name: "Design para Mídias Sociais", category: "Design Gráfico" },
      { id: "des-promo", name: "Materiais Promocionais e Publicitários", category: "Design Gráfico" },
      { id: "des-edit", name: "Design Editorial e Diagramação", category: "Design Gráfico" },
      { id: "des-apres", name: "Apresentações Visuais Profissionais", category: "Design Gráfico" },
      { id: "des-emb", name: "Design para Produtos e Embalagens", category: "Design Gráfico" },
    ]
  },
  {
    id: "marketing",
    title: "Marketing e Publicidade",
    services: [
      { id: "mkt-plan", name: "Planejamento Estratégico de Marketing", category: "Marketing e Publicidade" },
      { id: "mkt-camp", name: "Campanhas Publicitárias (Online e Offline)", category: "Marketing e Publicidade" },
      { id: "mkt-social", name: "Gestão de Redes Sociais", category: "Marketing e Publicidade" },
      { id: "mkt-traf", name: "Tráfego Pago (Anúncios Online)", category: "Marketing e Publicidade" },
      { id: "mkt-brand", name: "Branding e Posicionamento de Marca", category: "Marketing e Publicidade" },
      { id: "mkt-copy", name: "Copywriting e Redação Persuasiva", category: "Marketing e Publicidade" },
      { id: "mkt-cons", name: "Consultoria e Mentoria para Pequenos Negócios", category: "Marketing e Publicidade" },
    ]
  },
  {
    id: "web",
    title: "Web Design",
    services: [
      { id: "web-site", name: "Sites institucionais e portfólios", category: "Web Design" },
      { id: "web-landing", name: "Landing pages para campanhas", category: "Web Design" },
      { id: "web-ecom", name: "E-commerce básico", category: "Web Design" },
      { id: "web-blog", name: "Blogs e páginas pessoais", category: "Web Design" },
    ]
  },
  {
    id: "aluguer",
    title: "Aluguer de Equipamentos",
    services: [
      { id: "alug-est", name: "Estúdio fotográfico com iluminação/fundo infinito", category: "Aluguer de Equipamentos" },
      { id: "alug-mic", name: "Microfones, câmeras e acessórios", category: "Aluguer de Equipamentos" },
      { id: "alug-pod", name: "Espaço para gravação de podcast", category: "Aluguer de Equipamentos" },
      { id: "alug-sup", name: "Suporte técnico", category: "Aluguer de Equipamentos" },
    ]
  }
];
