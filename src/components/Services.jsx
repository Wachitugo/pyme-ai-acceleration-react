import { useState, useRef, useEffect } from 'react';
import { Car, Scale, Utensils, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industries = [
    {
        id: 'automotora', name: 'Automotoras', icon: Car,
        title: 'Gestión inteligente de leads y ventas',
        impact: 'Aumenta un 40% la retención de prospectos interesados fuera de horario laboral.',
        features: ['Agentes de venta disponibles 24/7', 'Gestión de inventario predictiva', 'Calificación de leads integrada al CRM'],
        image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-man-in-a-car-dealership-4263-large.mp4',
        tags: ['24/7 Support', 'CRM', 'Lead Gen'],
    },
    {
        id: 'legal', name: 'Salud y Abogados', icon: Scale,
        title: 'Automatización administrativa y agendamiento',
        impact: 'Reduce un 60% el tiempo invertido en tareas de gestión de agenda y documentación.',
        features: ['Asistente de agendamiento autónomo', 'Resumen inteligente de expedientes', 'Envío automatizado de recordatorios'],
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-lawyer-signing-documents-4261-large.mp4',
        tags: ['Agendamiento', 'Docs IA', 'Notificaciones'],
    },
    {
        id: 'gastronomia', name: 'Gastronomía', icon: Utensils,
        title: 'Reservas centralizadas y control de flujo',
        impact: 'Logra hasta un 95% de ocupación evitando reservas fantasma y cancelaciones tardías.',
        features: ['Bot de reservas por WhatsApp / RRSS', 'Confirmaciones automáticas', 'Optimización de precios dinámica'],
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-4187-large.mp4',
        tags: ['WhatsApp Bot', 'Pricing', 'Ocupación'],
    },
    {
        id: 'construccion', name: 'Inmobiliaria', icon: Building2,
        title: 'Prospección y seguimiento de ventas acelerado',
        impact: 'Reduce a la mitad el ciclo de ventas de proyectos inmobiliarios.',
        features: ['Calificación automática de prospectos', 'Respuestas instantáneas de cotizaciones', 'Visualización de avances de obra'],
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-construction-site-at-sunset-4309-large.mp4',
        tags: ['Prospectos', 'Cotización IA', 'Pipeline'],
    },
];

export default function Services() {
    const [activeTab, setActiveTab] = useState(industries[0]);
    const [key, setKey] = useState(0);
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.services-header', {
                opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: '.services-header', start: 'top 80%', once: true },
            });
            gsap.from('.services-panel', {
                opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: '.services-panel', start: 'top 85%', once: true },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleTabChange = (industry) => {
        if (contentRef.current) {
            gsap.fromTo(contentRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
        }
        setActiveTab(industry);
        setKey(p => p + 1);
    };

    const getYouTubeId = (url) => {
        if (!url) return null;
        const m = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
        return (m && m[2].length === 11) ? m[2] : null;
    };
    const isYouTube = (url) => url && (url.includes('youtube.com') || url.includes('youtu.be'));

    return (
        <section ref={sectionRef} id="servicios" className="py-20 sm:py-28 md:py-36 bg-slate-950 border-y border-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

                {/* Header */}
                <div className="services-header mb-12 sm:mb-16 pl-6 sm:pl-8 border-l border-red-600">
                    <span className="text-red-500 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] mb-4 block">Especialización</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 uppercase tracking-tighter leading-[0.92]">
                        Automatización a medida<br className="hidden sm:block" /> para tu sector
                    </h2>
                    <p className="text-slate-500 max-w-xl text-xs sm:text-sm font-bold uppercase tracking-widest leading-relaxed">
                        Selecciona tu industria y descubre cómo resolvemos los problemas específicos de tu rubro.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-0 mb-8 border border-slate-800 bg-slate-900 w-fit max-w-full overflow-x-auto">
                    {industries.map((industry) => (
                        <button
                            key={industry.id}
                            className={`flex items-center gap-2 px-4 sm:px-5 py-3 text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all border-r border-slate-800 last:border-r-0 whitespace-nowrap
                                ${activeTab.id === industry.id ? 'bg-red-600 text-white' : 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800'}`}
                            onClick={() => handleTabChange(industry)}
                        >
                            <industry.icon size={13} strokeWidth={2} />
                            {industry.name}
                        </button>
                    ))}
                </div>

                {/* Panel */}
                <div ref={contentRef} className="services-panel border border-slate-800 bg-slate-900/50 grid lg:grid-cols-[1.3fr_1fr] overflow-hidden">

                    {/* Left: Content */}
                    <div className="p-7 sm:p-10 md:p-12 flex flex-col justify-center order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 text-red-500 font-black tracking-widest uppercase text-[10px] mb-5">
                            <activeTab.icon size={13} />
                            {activeTab.name}
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
                            {activeTab.title}
                        </h3>
                        <ul className="mb-7 space-y-3">
                            {activeTab.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 size={15} className="text-red-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                                    <span className="text-slate-400 text-sm font-light">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Impact */}
                        <div className="p-5 bg-slate-950 border border-slate-800 mb-7 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-0.5 h-full bg-red-600" />
                            <h4 className="text-[10px] font-black text-white mb-2 uppercase tracking-widest pl-4">Impacto Directo</h4>
                            <p className="text-slate-400 font-light text-sm pl-4">{activeTab.impact}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-7">
                            {activeTab.tags.map(tag => (
                                <span key={tag} className="text-[9px] px-2 py-0.5 bg-red-950/30 text-red-500 border border-red-900/40 font-black uppercase tracking-widest">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <a href="#contacto" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-black uppercase tracking-widest text-[11px] hover:bg-red-700 transition-all w-fit">
                            Solicitar asesoría
                            <ArrowRight size={13} />
                        </a>
                    </div>

                    {/* Right: Media — image always visible, video on top */}
                    <div className="relative h-[220px] sm:h-[280px] lg:h-auto overflow-hidden bg-slate-900 order-1 lg:order-2 border-b lg:border-b-0 lg:border-l border-slate-800">
                        {/* Always-visible poster image */}
                        <img
                            key={`img-${activeTab.id}`}
                            src={activeTab.image}
                            alt={activeTab.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-500"
                        />
                        {/* Video layered on top when available */}
                        {!isYouTube(activeTab.video) && activeTab.video && (
                            <video
                                key={key}
                                className="absolute inset-0 w-full h-full object-cover opacity-70"
                                src={activeTab.video}
                                autoPlay loop muted playsInline
                            />
                        )}
                        {/* Red gradient overlay at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                        {/* Industry name badge */}
                        <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest">
                            {activeTab.name}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
