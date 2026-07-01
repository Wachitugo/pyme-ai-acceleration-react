import { useRef, useEffect } from 'react';
import { MessageSquare, ShieldCheck, FileCheck, Scale, Box, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
    {
        Icon: MessageSquare,
        title: 'Agentes de Inteligencia Artificial',
        description: 'Atención y servicio al cliente asistido con Inteligencia Artificial para mejorar el tiempo de respuesta y la contactabilidad 24/7.',
        tags: ['NLP', '24/7 Support', 'Omnichannel'],
        iconColor: 'text-red-500',
        glow: 'drop-shadow(0 4px 12px rgba(239,68,68,0.45))',
        dot: 'bg-red-500',
    },
    {
        Icon: Box,
        title: 'Auditoría Planta Ácido Sulfúrico 3D',
        description: 'Gemelo digital interactivo para inspección virtual de infraestructura crítica con sensores en tiempo real, auditorías IA y análisis Eddy Current.',
        tags: ['Gemelo Digital', '3D', 'Sensores Live'],
        iconColor: 'text-cyan-400',
        glow: 'drop-shadow(0 4px 12px rgba(34,211,238,0.45))',
        dot: 'bg-cyan-400',
        link: 'https://planta-cido-sulf-rico-3d-1033665533045.us-west2.run.app',
    },
    {
        Icon: ShieldCheck,
        title: 'Seguridad Industrial e-Learning',
        description: 'Seguridad y entrenamiento en procesos operacionales para industrias de alta exigencia como Minería, Forestal y Automotriz.',
        tags: ['Mining', 'Automotive', 'Safety-First'],
        iconColor: 'text-violet-400',
        glow: 'drop-shadow(0 4px 12px rgba(167,139,250,0.45))',
        dot: 'bg-violet-400',
    },
    {
        Icon: FileCheck,
        title: 'Cumplimiento RCA',
        description: 'Procesamiento automatizado de Resoluciones de Calificación Ambiental y construcción de Matrices de cumplimiento.',
        tags: ['Ambiental', 'Auto-Compliance', 'AI-Audit'],
        iconColor: 'text-emerald-400',
        glow: 'drop-shadow(0 4px 12px rgba(52,211,153,0.45))',
        dot: 'bg-emerald-400',
    },
    {
        Icon: Scale,
        title: 'Convivencia Laboral',
        description: 'Plataforma especializada en la gestión de convivencia laboral bajo marcos legales como la Ley Karin (Ley N° 21.643).',
        tags: ['Legislación', 'HR Tech', 'Compliance'],
        iconColor: 'text-blue-400',
        glow: 'drop-shadow(0 4px 12px rgba(96,165,250,0.45))',
        dot: 'bg-blue-400',
    },
];

export default function SolucionesSection({ openModal }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.sol-header', {
                opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: '.sol-header', start: 'top 80%', once: true },
            });

            const cards = sectionRef.current?.querySelectorAll('.sol-card');
            if (cards?.length) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 28, scale: 0.94 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.6, stagger: 0.09, ease: 'back.out(1.4)', clearProps: 'all',
                        scrollTrigger: { trigger: '.sol-grid', start: 'top 80%', once: true },
                    }
                );
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="soluciones" className="py-14 sm:py-20 md:py-24 bg-slate-950 border-y border-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

                {/* Header */}
                <div className="sol-header mb-8 sm:mb-10 pl-6 sm:pl-8 border-l border-red-600">
                    <span className="text-red-500 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] mb-4 block">Especialización</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 uppercase tracking-tighter leading-[0.92]">
                        Plataformas Inteligentes
                    </h2>
                    <p className="text-slate-500 max-w-xl text-xs sm:text-sm font-bold uppercase tracking-widest leading-relaxed">
                        Combinamos experiencia técnica profunda con entendimiento agudo de desafíos operacionales.
                    </p>
                </div>

                {/* Grid 3 cols */}
                <div className="sol-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800 border border-slate-800">
                    {solutions.map((sol) => {
                        const { Icon, iconColor, glow, dot } = sol;
                        return (
                            <div
                                key={sol.title}
                                className="sol-card bg-slate-950 p-7 sm:p-8 hover:-translate-y-0.5 hover:bg-slate-900/80 transition-all duration-300 group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`shrink-0 mt-0.5 ${iconColor}`} style={{ filter: glow }}>
                                        <Icon size={30} strokeWidth={1.5} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                                            <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{sol.title}</h3>
                                        </div>
                                        <p className="text-slate-400 leading-relaxed text-sm font-light mb-4">{sol.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {sol.tags.map(tag => (
                                                <span key={tag} className="text-[9px] px-2 py-0.5 bg-red-950/30 text-red-500 border border-red-900/40 font-black uppercase tracking-widest">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* CTA card */}
                    <div className="sol-card bg-red-600 p-7 sm:p-8 flex flex-col justify-between hover:bg-red-700 transition-all duration-300 group">
                        <div className="mb-6 lg:mb-0">
                            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-3 leading-none italic text-white">
                                ¿Tienes un desafío <br />específico?
                            </h3>
                            <p className="text-red-100 text-sm font-light">
                                Construimos soluciones personalizadas de alto impacto estratégico.
                            </p>
                        </div>
                        <button
                            onClick={openModal}
                            className="flex items-center gap-2 px-6 py-3 bg-slate-950 text-white font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-colors"
                        >
                            Consultar Consultoría
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
