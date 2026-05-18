import { useRef, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import {
    FilesIcon,
    ChatCircleDotsIcon,
    HourglassMediumIcon,
    ChartLineDownIcon,
} from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        Icon: FilesIcon,
        id: '01', title: "Planillas Infinitas",
        description: "Gestión manual de datos que aumenta el riesgo de errores y consume horas clave de tu día.",
        iconColor: 'text-red-500',
        glow: 'drop-shadow(0 4px 12px rgba(239,68,68,0.45))',
        dot: 'bg-red-500',
    },
    {
        Icon: ChatCircleDotsIcon,
        id: '02', title: "Mensajes Perdidos",
        description: "Clientes esperando respuestas por horas mientras intentas organizar tu bandeja de entrada.",
        iconColor: 'text-orange-400',
        glow: 'drop-shadow(0 4px 12px rgba(251,146,60,0.45))',
        dot: 'bg-orange-400',
    },
    {
        Icon: HourglassMediumIcon,
        id: '03', title: "Falta de Tiempo",
        description: "Días enteros que se van en tareas rutinarias que podrían estar automatizadas ahora mismo.",
        iconColor: 'text-violet-400',
        glow: 'drop-shadow(0 4px 12px rgba(167,139,250,0.45))',
        dot: 'bg-violet-400',
    },
    {
        Icon: ChartLineDownIcon,
        id: '04', title: "Fuga de Capital",
        description: "Pérdida de potenciales prospectos de ventas por falta de seguimiento y atención lenta.",
        iconColor: 'text-emerald-400',
        glow: 'drop-shadow(0 4px 12px rgba(52,211,153,0.45))',
        dot: 'bg-emerald-400',
    },
];

export default function PainPoints() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.pain-text', {
                opacity: 0, x: -50, duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: '.pain-text', start: 'top 80%', once: true },
            });

            const cardEls = sectionRef.current?.querySelectorAll('.pain-card');
            if (cardEls?.length) {
                gsap.fromTo(cardEls,
                    { opacity: 0, y: 28, scale: 0.94 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.6, stagger: 0.09, ease: 'back.out(1.4)', clearProps: 'all',
                        scrollTrigger: { trigger: '.pain-grid', start: 'top 80%', once: true },
                    }
                );
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="desafios" className="py-20 sm:py-28 md:py-36 bg-slate-950 border-y border-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 xl:gap-28 items-center">

                    {/* Text */}
                    <div className="pain-text">
                        <span className="text-red-500 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] mb-5 flex items-center gap-2">
                            <AlertCircle size={13} /> El desafío de escalar
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-black text-white leading-[0.92] mb-8 uppercase tracking-tighter">
                            ¿Sientes que el día{' '}
                            <span className="text-red-600">no te alcanza</span>{' '}
                            para todo?
                        </h2>
                        <div className="pl-5 sm:pl-6 border-l border-red-600 mb-8 py-1">
                            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-light italic">
                                "No te falta personal, te sobra trabajo manual en tareas repetitivas."
                            </p>
                        </div>
                        <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-light">
                            Muchos emprendedores quedan atrapados en la operación diaria. Inviertes gran parte de tu día gestionando planillas y mensajes, en lugar de enfocarte en hacer crecer tu negocio.
                        </p>
                    </div>

                    {/* Cards + image strip */}
                    <div className="flex flex-col gap-0 border border-slate-800">
                        {/* Image strip */}
                        <div className="relative h-36 sm:h-44 overflow-hidden bg-slate-900">
                            <img
                                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=900"
                                alt="Tecnología"
                                className="w-full h-full object-cover opacity-30"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/80" />
                            <div className="absolute bottom-4 left-5">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">El problema</span>
                                <p className="text-white font-black text-sm uppercase tracking-tight">¿Te suena familiar?</p>
                            </div>
                        </div>

                        {/* 2×2 cards */}
                        <div className="pain-grid grid grid-cols-1 sm:grid-cols-2 gap-0 bg-slate-900">
                            {cards.map((card, i) => {
                                const { Icon, iconColor, glow, dot } = card;
                                const borderRight  = i % 2 === 0 ? 'sm:border-r border-slate-800' : '';
                                const borderBottom = i < 2 ? 'border-b border-slate-800' : '';
                                return (
                                    <div key={card.id} className={`pain-card bg-slate-950 p-6 sm:p-7 hover:-translate-y-0.5 hover:bg-slate-900/80 transition-all duration-300 group ${borderRight} ${borderBottom}`}>
                                        <div className="flex items-start gap-4">
                                            {/* Phosphor icon with glow */}
                                            <div className={`shrink-0 mt-0.5 ${iconColor}`} style={{ filter: glow }}>
                                                <Icon size={30} weight="duotone" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-1.5 mb-1.5">
                                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{card.title}</h3>
                                                </div>
                                                <p className="text-slate-400 leading-relaxed text-sm font-light">{card.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
