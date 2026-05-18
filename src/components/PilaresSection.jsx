import { useRef, useEffect } from 'react';
import { Cpu, Layers, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
    {
        id: '01', Icon: Cpu, title: 'IA Aplicada',
        description: 'Somos especialistas en la aplicación práctica, desde Agentes Inteligentes y NLP hasta modelos predictivos complejos para industrias como la minería.',
        tags: ['Agentes IA', 'NLP', 'Modelos Predictivos'],
        iconColor: 'text-red-500',
        glow: 'drop-shadow(0 4px 14px rgba(239,68,68,0.5))',
        dot: 'bg-red-500',
    },
    {
        id: '02', Icon: Layers, title: 'Escalabilidad',
        description: 'Reducimos tiempos de procesamiento manejando grandes volúmenes de datos mediante tecnologías de Machine Learning de última generación.',
        tags: ['Big Data', 'Rendimiento', 'Deep Learning'],
        iconColor: 'text-violet-400',
        glow: 'drop-shadow(0 4px 14px rgba(167,139,250,0.5))',
        dot: 'bg-violet-400',
    },
    {
        id: '03', Icon: TrendingUp, title: 'Valor de Negocio',
        description: 'Nuestras soluciones optimizan la toma de decisiones, predicen fallas y automatizan tareas críticas con un retorno de inversión (ROI) medible.',
        tags: ['ROI Estratégico', 'Automatización', 'UX Personalizada'],
        iconColor: 'text-emerald-400',
        glow: 'drop-shadow(0 4px 14px rgba(52,211,153,0.5))',
        dot: 'bg-emerald-400',
    },
];

export default function PilaresSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.pilares-header', {
                opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: '.pilares-header', start: 'top 80%', once: true },
            });

            const cards = sectionRef.current?.querySelectorAll('.pilar-card');
            if (cards?.length) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 28, scale: 0.94 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.65, stagger: 0.1, ease: 'back.out(1.4)', clearProps: 'all',
                        scrollTrigger: { trigger: '.pilares-grid', start: 'top 80%', once: true },
                    }
                );
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="pilares" className="py-20 sm:py-28 md:py-36 bg-slate-950 border-b border-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

                <div className="pilares-header text-center max-w-2xl mx-auto mb-16 sm:mb-20">
                    <span className="text-red-500 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] mb-5 block">Nuestros Pilares</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.92] mb-6">
                        Arquitectura de <span className="text-red-600">Alto Impacto</span>
                    </h2>
                </div>

                <div className="pilares-grid grid md:grid-cols-3 gap-0 bg-slate-900 border border-slate-800">
                    {pillars.map((pillar, i) => {
                        const { Icon, iconColor, glow, dot } = pillar;
                        return (
                            <div
                                key={pillar.id}
                                className={`pilar-card bg-slate-950 p-8 sm:p-10 hover:-translate-y-0.5 hover:bg-slate-900/80 transition-all duration-300 group ${i < pillars.length - 1 ? 'border-b md:border-b-0 md:border-r border-slate-800' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-7">
                                    <div className={iconColor} style={{ filter: glow }}>
                                        <Icon size={38} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-xl font-mono font-black text-slate-800">/{pillar.id}</span>
                                </div>

                                <div className="flex items-center gap-1.5 mb-2">
                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">{pillar.title}</h3>
                                </div>

                                <p className="text-slate-400 leading-relaxed font-light text-sm mb-7">{pillar.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {pillar.tags.map(tag => (
                                        <span key={tag} className="text-[9px] px-2 py-0.5 bg-red-950/30 text-red-500 border border-red-900/40 font-black uppercase tracking-widest">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
