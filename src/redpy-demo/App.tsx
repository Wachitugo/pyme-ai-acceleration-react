/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Bot, 
  Cpu, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  FileCheck, 
  Scale, 
  ChevronRight, 
  Globe, 
  Zap, 
  Menu, 
  X,
  MessageSquare
} from 'lucide-react';
import { useState, useRef, ReactNode } from 'react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-black text-xl">R</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase italic">Redpy</span>
            </motion.div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-[0.2em]">Misión</a>
            <a href="#pillars" className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-[0.2em]">Pilares</a>
            <a href="#solutions" className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-[0.2em]">Soluciones</a>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 border border-red-600/50 text-red-500 text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
            >
              Consultoría
            </motion.button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 flex flex-col gap-4"
        >
          <a href="#about" onClick={() => setIsOpen(false)} className="text-xs font-bold text-slate-400 py-2 uppercase tracking-widest">Misión</a>
          <a href="#pillars" onClick={() => setIsOpen(false)} className="text-xs font-bold text-slate-400 py-2 uppercase tracking-widest">Pilares</a>
          <a href="#solutions" onClick={() => setIsOpen(false)} className="text-xs font-bold text-slate-400 py-2 uppercase tracking-widest">Soluciones</a>
          <button className="w-full px-6 py-3 bg-red-600 text-white rounded-none text-xs font-black uppercase tracking-widest">Contacto</button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img 
          src="/src/assets/images/redpy_hero_background_1778976312976.png" 
          alt="Redpy Hero Background" 
          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block px-3 py-1 bg-red-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8 w-fit mx-auto">
            Strategic AI Partners
          </div>
          <h1 className="text-6xl md:text-[100px] font-black text-white leading-[0.9] tracking-tighter mb-10 uppercase">
            Trasciende tus <br />
            <span className="text-red-600">Límites</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Transformamos datos complejos en <strong className="text-white">valor estratégico tangible</strong> mediante arquitecturas de alto impacto.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-12 py-5 bg-red-600 text-white font-black uppercase tracking-widest shadow-2xl shadow-red-950/50 text-sm hover:bg-red-700 transition-all flex items-center justify-center gap-2"
            >
              Nuestras Plataformas
              <ChevronRight size={18} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-12 py-5 bg-transparent text-white font-black uppercase tracking-widest border border-slate-700 hover:bg-slate-800 transition-all text-sm"
            >
              Misión Corporativa
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-700 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-red-600 to-transparent" />
      </motion.div>
    </section>
  );
};

const MissionSection = () => {
  return (
    <section id="about" className="py-32 bg-slate-950 overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-red-500 text-xs font-black uppercase tracking-[0.4em] mb-6 block">Misión Corporativa</span>
            <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.9] mb-10 uppercase tracking-tighter">
              Empoderamos para <br/><span className="text-red-600">decidir el futuro</span>.
            </h2>
            <div className="space-y-8 text-slate-400 font-light text-xl leading-relaxed">
              <p>
                En <span className="font-black text-white italic tracking-tighter">Redpy</span>, nuestra misión es empoderar a las organizaciones para que trasciendan sus límites operacionales.
              </p>
              <p>
                No entregamos solo tecnología, entregamos resultados medibles que transforman datos complejos en <strong className="text-white font-bold">valor estratégico tangible</strong>.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-px bg-slate-900 border border-slate-900"
          >
            <div className="aspect-square bg-slate-950 flex flex-col items-center justify-center p-8 text-center gap-4 group">
              <Bot className="text-red-600 group-hover:scale-110 transition-transform" size={48} />
              <span className="font-black text-white uppercase text-[10px] tracking-widest">Agentes Inteligentes</span>
            </div>
            <div className="aspect-square bg-red-600 flex flex-col items-center justify-center p-8 text-center gap-4 group transition-colors hover:bg-red-700">
              <TrendingUp className="text-white group-hover:scale-110 transition-transform" size={48} />
              <span className="font-black text-white uppercase text-[10px] tracking-widest">Escalabilidad Real</span>
            </div>
            <div className="aspect-square bg-slate-900 flex flex-col items-center justify-center p-8 text-center gap-4 group">
              <Globe className="text-slate-400 group-hover:text-red-500 transition-all" size={48} />
              <span className="font-black text-white uppercase text-[10px] tracking-widest">Impacto Global</span>
            </div>
            <div className="aspect-square bg-slate-950 flex flex-col items-center justify-center p-8 text-center gap-4 group">
              <Layers className="text-red-600 group-hover:scale-110 transition-transform" size={48} />
              <span className="font-black text-white uppercase text-[10px] tracking-widest">Deep Learning</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PillarsSection = () => {
  const pillars = [
    {
      id: "01",
      title: "IA Aplicada",
      icon: <Cpu size={32} />,
      content: "Somos especialistas en la aplicación práctica, desde Agentes Inteligentes y NLP hasta modelos predictivos complejos para industrias como la minería.",
      tags: ["Agentes IA", "NLP", "Modelos Predictivos"]
    },
    {
      id: "02",
      title: "Escalabilidad",
      icon: <Layers size={32} />,
      content: "Reducimos tiempos de procesamiento manejando grandes volúmenes de datos mediante tecnologías de Machine Learning de última generación.",
      tags: ["Big Data", "Rendimiento", "Deep Learning"]
    },
    {
      id: "03",
      title: "Valor de Negocio",
      icon: <TrendingUp size={32} />,
      content: "Nuestras soluciones optimizan la toma de decisiones, predicen fallas y automatizan tareas críticas con un retorno de inversión (ROI) medible.",
      tags: ["ROI Estratégico", "Automatización", "UX Personalizada"]
    }
  ];

  return (
    <section id="pillars" className="py-24 bg-slate-950 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <span className="text-red-500 text-xs font-black uppercase tracking-[0.4em] mb-4 block">Nuestros Pilares</span>
          <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">Arquitectura de Alto Impacto</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-900 bg-slate-900">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-slate-950 p-12 hover:bg-slate-900 transition-all group relative"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="text-red-600 transition-transform group-hover:scale-110">
                  {pillar.icon}
                </div>
                <span className="text-2xl font-mono font-black text-slate-800">/{pillar.id}</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{pillar.title}</h3>
              <p className="text-slate-500 leading-relaxed font-light mb-10">
                {pillar.content}
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-widest">
                {pillar.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-red-950/30 text-red-500 border border-red-900/50">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PlatformCard = ({ title, description, icon, badges }: { title: string, description: string, icon: ReactNode, badges: string[] }) => (
  <motion.div 
    whileHover={{ x: 10 }}
    className="bg-slate-900/50 p-10 border border-slate-800 flex flex-col h-full group transition-all hover:bg-slate-900"
  >
    <div className="flex justify-between items-start mb-8">
      <div className="text-red-500">
        {icon}
      </div>
      <div className="w-2 h-2 bg-red-600 group-hover:scale-150 transition-transform"></div>
    </div>
    <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{title}</h3>
    <p className="text-slate-400 text-sm font-light leading-relaxed mb-8 flex-grow">{description}</p>
    <div className="flex flex-wrap gap-3 mt-auto">
      {badges.map(badge => (
        <span key={badge} className="text-[9px] text-slate-500 px-0 py-0 rounded-none font-black uppercase tracking-[0.2em]">{badge}</span>
      ))}
    </div>
  </motion.div>
);

const SolutionsSection = () => {
  const solutions = [
    {
      title: "Agentes por WhatsApp",
      description: "Atención y servicio al cliente asistido con Inteligencia Artificial para mejorar el tiempo de respuesta y la contactabilidad 24/7.",
      icon: <MessageSquare size={24} />,
      badges: ["NLP", "24/7 Support", "Omnichannel"]
    },
    {
      title: "Vista 360 del Cliente",
      description: "Gestión integral de flujos comerciales con una perspectiva completa del comportamiento y necesidades del cliente.",
      icon: <Users size={24} />,
      badges: ["Data Analytics", "CRM", "Business Flow"]
    },
    {
      title: "Seguridad Industrial e-Learning",
      description: "Seguridad y entrenamiento en procesos operacionales para industrias de alta exigencia como Minería, Forestal y Automotriz.",
      icon: <ShieldCheck size={24} />,
      badges: ["Mining", "Automotive", "Safety-First"]
    },
    {
      title: "Cumplimiento RCA",
      description: "Procesamiento automatizado de Resoluciones de Calificación Ambiental y construcción de Matrices de cumplimiento.",
      icon: <FileCheck size={24} />,
      badges: ["Environmental", "Auto-Compliance", "AI-Audit"]
    },
    {
      title: "Convivencia Laboral",
      description: "Plataforma especializada en la gestión de convivencia laboral bajo marcos legales como la Ley Karin (Ley N° 21.643).",
      icon: <Scale size={24} />,
      badges: ["Legislation", "HR Tech", "Compliance"]
    }
  ];

  return (
    <section id="solutions" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left mb-20 border-l border-red-600 pl-10">
        <span className="text-red-500 text-xs font-black uppercase tracking-[0.4em] mb-4 block">Especialización</span>
        <h2 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Plataformas Inteligentes</h2>
        <p className="text-slate-500 max-w-2xl tracking-widest text-xs font-bold uppercase">
          Combinamos experiencia técnica profunda con entendimiento agudo de desafíos operacionales.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 bg-slate-900 border border-slate-900">
          {solutions.map((solution, i) => (
            <motion.div 
              key={solution.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <PlatformCard {...solution} />
            </motion.div>
          ))}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-red-600 p-10 flex flex-col justify-center items-start text-left text-white"
          >
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 leading-none italic">¿Tienes un desafío <br/>específico?</h3>
            <p className="text-red-100 mb-10 text-sm font-light">Construimos soluciones personalizadas de alto impacto estratégico.</p>
            <button className="bg-slate-950 text-white px-10 py-4 font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-colors">
              Consultar Consultoría
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section className="py-32 bg-red-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/20 mix-blend-overlay" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="text-left flex-1">
          <h2 className="text-6xl md:text-8xl font-black mb-8 uppercase leading-[0.85] tracking-tighter">
            Trascendamos <br /> <span className="text-white opacity-40">Tus Límites</span>
          </h2>
          <p className="text-red-100 text-xl mb-0 max-w-xl font-light">
            En Redpy transformamos la complejidad en ventaja competitiva real. Hagamos que tus datos trabajen con un ROI garantizado.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-8 bg-slate-950 text-white font-black text-xl uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all shadow-2xl"
        >
          Consultoría
        </motion.button>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 flex items-center justify-center">
                <span className="text-white font-black text-xl">R</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase italic">Redpy</span>
            </div>
            <p className="text-slate-500 text-sm font-light leading-relaxed">
              Especialistas en consultoría y desarrollo de plataformas de IA de alto impacto para la optimización de procesos industriales.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-6 text-xs font-black text-white uppercase tracking-widest">
              <span className="text-slate-600">Compañía</span>
              <a href="#about" className="hover:text-red-500 transition-colors">Nosotros</a>
              <a href="#solutions" className="hover:text-red-500 transition-colors">Plataformas</a>
              <a href="#" className="hover:text-red-500 transition-colors">Carreras</a>
            </div>
            <div className="flex flex-col gap-6 text-xs font-black text-white uppercase tracking-widest">
              <span className="text-slate-600">Legal</span>
              <a href="#" className="hover:text-red-500 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-red-500 transition-colors">Términos</a>
              <a href="#" className="hover:text-red-500 transition-colors">Cumplimiento</a>
            </div>
            <div className="flex flex-col gap-6 text-xs font-black text-white uppercase tracking-widest">
              <span className="text-slate-600">Sede</span>
              <span className="text-red-500">Santiago, CL</span>
              <span className="text-slate-500 font-light lowercase">hola@redpy.cl</span>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
            © 2026 Redpy Chile. IA de alto impacto.
          </div>
          <div className="flex gap-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="font-sans antialiased bg-slate-950 text-slate-100 selection:bg-red-600 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <MissionSection />
        <PillarsSection />
        <SolutionsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
