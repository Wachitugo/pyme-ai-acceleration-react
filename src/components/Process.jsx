import { useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import {
    LinkSimpleIcon,
    CodeIcon,
    RocketLaunchIcon,
} from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        id: '01', Icon: LinkSimpleIcon, title: 'Conexión',
        description: 'Identificamos tus procesos críticos (esos que hoy haces "a mano"). Entendemos el ADN de tu negocio.',
        tags: ['Diagnóstico', 'Mapeo', 'Análisis'],
        iconColor: 'text-red-500',
        glow: 'drop-shadow(0 4px 14px rgba(239,68,68,0.5))',
        dot: 'bg-red-500',
    },
    {
        id: '02', Icon: CodeIcon, title: 'Desarrollo',
        description: 'Implementamos la herramienta de IA que mejor se adapte a tu presupuesto y meta. Sin complicaciones.',
        tags: ['IA Custom', 'Sin código', 'Integración'],
        iconColor: 'text-violet-400',
        glow: 'drop-shadow(0 4px 14px rgba(167,139,250,0.5))',
        dot: 'bg-violet-400',
    },
    {
        id: '03', Icon: RocketLaunchIcon, title: 'Optimización',
        description: 'Liberamos tu tiempo manual para que te enfoques en lo que realmente importa: hacer crecer tu negocio.',
        tags: ['Automatización', 'ROI', 'Crecimiento'],
        iconColor: 'text-emerald-400',
        glow: 'drop-shadow(0 4px 14px rgba(52,211,153,0.5))',
        dot: 'bg-emerald-400',
    },
];

export default function Process({ openModal }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.process-header', {
                opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: '.process-header', start: 'top 80%', once: true },
            });

            const stepEls = sectionRef.current?.querySelectorAll('.process-step');
            if (stepEls?.length) {
                gsap.fromTo(stepEls,
                    { opacity: 0, y: 28, scale: 0.94 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.65, stagger: 0.1, ease: 'back.out(1.4)', clearProps: 'all',
                        scrollTrigger: { trigger: '.process-grid', start: 'top 80%', once: true },
                    }
                );
            }

            gsap.from('.process-cta', {
                opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: '.process-cta', start: 'top 85%', once: true },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="proceso" className="py-20 sm:py-28 md:py-36 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

                {/* Header */}
                <div className="process-header text-center max-w-2xl mx-auto mb-16 sm:mb-20">
                    <span className="text-red-500 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] mb-5 block">Simple y Eficiente</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.92] mb-6">
                        Nuestro <span className="text-red-600">Proceso</span>
                    </h2>
                    <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed px-4 sm:px-0">
                        De la manualidad a la inteligencia artificial en tres pasos simples. Sin palabras complicadas, solo resultados.
                    </p>
                </div>

                {/* Steps */}
                <div className="process-grid grid md:grid-cols-3 gap-0 bg-slate-900 border border-slate-800 mb-16 sm:mb-20">
                    {steps.map((step, i) => {
                        const { Icon, iconColor, glow, dot } = step;
                        return (
                            <div
                                key={step.id}
                                className={`process-step bg-slate-950 p-8 sm:p-10 hover:-translate-y-0.5 hover:bg-slate-900/80 transition-all duration-300 group ${i < steps.length - 1 ? 'border-b md:border-b-0 md:border-r border-slate-800' : ''}`}
                            >
                                {/* Icon row */}
                                <div className="flex justify-between items-start mb-7">
                                    <div className={`${iconColor}`} style={{ filter: glow }}>
                                        <Icon size={38} weight="duotone" />
                                    </div>
                                    <span className="text-xl font-mono font-black text-slate-800">/{step.id}</span>
                                </div>

                                {/* Label */}
                                <div className="flex items-center gap-1.5 mb-2">
                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">{step.title}</h3>
                                </div>

                                <p className="text-slate-400 leading-relaxed font-light text-sm mb-7">{step.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {step.tags.map(tag => (
                                        <span key={tag} className="text-[9px] px-2 py-0.5 bg-red-950/30 text-red-500 border border-red-900/40 font-black uppercase tracking-widest">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div
                    className="process-cta p-8 sm:p-12 md:p-16 relative overflow-hidden"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <div className="absolute inset-0 bg-red-600/80 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-slate-950/30" />
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12">
                        <div className="flex-1">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase leading-[0.9] tracking-tighter mb-4">
                                ¿Listo/a para empezar<br />
                                <span className="text-white/50">tu transformación?</span>
                            </h3>
                            <p className="text-red-100 text-sm sm:text-base font-light max-w-lg">
                                No esperes a que la competencia adopte estas tecnologías antes que tú. El momento es ahora.
                            </p>
                        </div>
                        <button
                            className="flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-slate-950 text-white font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-white hover:text-slate-950 transition-all shadow-2xl shrink-0"
                            onClick={(e) => { e.preventDefault(); openModal(); }}
                        >
                            Agenda una Asesoría Gratuita
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
