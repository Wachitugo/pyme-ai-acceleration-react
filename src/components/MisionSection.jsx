import { useRef, useEffect } from 'react';
import { Bot, TrendingUp, Globe, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconGrid = [
    { label: 'Agentes Inteligentes', bg: 'bg-slate-950', Icon: Bot,        iconColor: 'text-red-600' },
    { label: 'Escalabilidad Real',   bg: 'bg-red-600',   Icon: TrendingUp, iconColor: 'text-white'   },
    { label: 'Impacto Global',       bg: 'bg-slate-900', Icon: Globe,      iconColor: 'text-slate-400' },
    { label: 'Deep Learning',        bg: 'bg-slate-950', Icon: Layers,     iconColor: 'text-red-600' },
];

export default function MisionSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.mision-text', {
                opacity: 0, x: 60, duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: '.mision-text', start: 'top 80%', once: true },
            });
            gsap.from('.mision-grid', {
                opacity: 0, scale: 0.95, duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: '.mision-grid', start: 'top 80%', once: true },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="mision" className="py-20 sm:py-28 md:py-36 bg-slate-950 border-y border-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 xl:gap-24 items-center">

                    {/* 2x2 icon grid */}
                    <div className="mision-grid grid grid-cols-2 gap-px bg-slate-800 border border-slate-800 order-2 lg:order-1">
                        {iconGrid.map((cell, i) => {
                            const Icon = cell.Icon;
                            return (
                                <div key={i} className={`relative aspect-square ${cell.bg} overflow-hidden group flex flex-col items-center justify-center gap-4 p-8`}>
                                    <Icon
                                        size={48}
                                        className={`${cell.iconColor} group-hover:scale-110 transition-transform duration-300`}
                                        strokeWidth={1.5}
                                    />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-white/70">{cell.label}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Text */}
                    <div className="mision-text order-1 lg:order-2">
                        <span className="text-red-500 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] mb-6 block">
                            Misión Corporativa
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-black text-white leading-[0.92] mb-8 uppercase tracking-tighter">
                            Empoderamos para <br />
                            <span className="text-red-600">decidir el futuro</span>.
                        </h2>

                        <div className="pl-5 border-l border-red-600 mb-8 py-1">
                            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light italic">
                                "Empoderar a las organizaciones para que trasciendan sus límites operacionales."
                            </p>
                        </div>

                        <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-light">
                            No entregamos solo tecnología, entregamos resultados medibles que transforman datos complejos en{' '}
                            <strong className="text-white font-semibold">valor estratégico tangible</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
