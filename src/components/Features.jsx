import { useRef, useEffect } from 'react';
import { ShieldCheck, Users, Cpu, TrendingUp, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const imageGrid = [
    {
        img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600',
        label: 'Agentes IA',
        bg: 'bg-slate-950',
    },
    {
        img: null,
        label: 'Escalabilidad Real',
        bg: 'bg-red-600',
        icon: TrendingUp,
    },
    {
        img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=600',
        label: 'Impacto Real',
        bg: 'bg-slate-900',
    },
    {
        img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=600',
        label: 'Deep Learning',
        bg: 'bg-slate-950',
    },
];

const reasons = [
    { icon: Users,       title: "Chile Real",    desc: "Entendemos el mercado local, sus modismos y desafíos financieros." },
    { icon: Cpu,         title: "Sin Fricción",  desc: "No necesitas ser programador ni contratar IT caro." },
    { icon: TrendingUp,  title: "Escalabilidad", desc: "Soluciones que crecen contigo, desde 1 persona hasta cientos." },
    { icon: ShieldCheck, title: "Tranquilidad",  desc: "Soporte en español e implementaciones en menos de 15 días." },
];

export default function Features() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.feat-text', {
                opacity: 0, x: 60, duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: '.feat-text', start: 'top 80%', once: true },
            });
            gsap.from('.feat-grid', {
                opacity: 0, scale: 0.95, duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: '.feat-grid', start: 'top 80%', once: true },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="nosotros" className="py-20 sm:py-28 md:py-36 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 xl:gap-24 items-center">

                    {/* 2×2 image grid */}
                    <div className="feat-grid grid grid-cols-2 gap-px bg-slate-800 border border-slate-800 order-2 lg:order-1">
                        {imageGrid.map((cell, i) => {
                            const Icon = cell.icon;
                            return (
                                <div key={i} className={`relative aspect-square ${cell.bg} overflow-hidden group`}>
                                    {cell.img && (
                                        <img
                                            src={cell.img}
                                            alt={cell.label}
                                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500 scale-105 group-hover:scale-100 transition-transform"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                                    {Icon && !cell.img && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Icon size={48} className="text-white/80 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                                        </div>
                                    )}
                                    <div className="absolute bottom-3 left-3">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-white/70 bg-black/30 px-2 py-0.5 backdrop-blur-sm">
                                            {cell.label}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Text + reasons */}
                    <div className="feat-text order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 text-[10px] sm:text-[11px] font-black mb-7 uppercase tracking-[0.25em]">
                            <Zap size={12} className="text-red-500" />
                            Aterrizado a tu realidad
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-black text-white leading-[0.92] mb-7 uppercase tracking-tighter">
                            ¿Por qué elegir{' '}
                            <span className="text-red-600">REDPY</span>{' '}
                            para tu negocio?
                        </h2>

                        <div className="pl-5 border-l border-red-600 mb-10 py-1">
                            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light italic">
                                "El puente perfecto entre la alta tecnología global y la operación real de la empresa local."
                            </p>
                        </div>

                        {/* Reasons list */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {reasons.map(({ icon: Icon, title, desc }) => (
                                <div key={title} className="flex items-start gap-3 group">
                                    <div className="w-8 h-8 shrink-0 bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-red-600 transition-colors">
                                        <Icon size={16} className="text-red-600" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-white uppercase tracking-wide mb-1">{title}</h4>
                                        <p className="text-slate-500 text-xs font-light leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
