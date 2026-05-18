import { useRef, useEffect } from 'react';
import {
    RocketLaunchIcon,
    ClockCountdownIcon,
    ChartLineUpIcon,
    CalendarCheckIcon,
} from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    {
        value: 40,
        suffix: '%',
        label: 'Más retención de clientes',
        sublabel: 'Promedio entre nuestros clientes',
        Icon: RocketLaunchIcon,
        iconColor: 'text-red-500',
        glow: 'drop-shadow(0 4px 14px rgba(239,68,68,0.5))',
        dot: 'bg-red-500',
        accent: 'hover:border-red-800/60',
    },
    {
        value: 60,
        suffix: '%',
        label: 'Reducción de tiempo manual',
        sublabel: 'En tareas administrativas',
        Icon: ClockCountdownIcon,
        iconColor: 'text-orange-400',
        glow: 'drop-shadow(0 4px 14px rgba(251,146,60,0.5))',
        dot: 'bg-orange-400',
        accent: 'hover:border-orange-800/60',
    },
    {
        value: 95,
        suffix: '%',
        label: 'Ocupación máxima lograda',
        sublabel: 'En sector gastronómico',
        Icon: ChartLineUpIcon,
        iconColor: 'text-emerald-400',
        glow: 'drop-shadow(0 4px 14px rgba(52,211,153,0.5))',
        dot: 'bg-emerald-400',
        accent: 'hover:border-emerald-800/60',
    },
    {
        value: 15,
        suffix: ' días',
        label: 'De implementación',
        sublabel: 'Promedio por proyecto',
        Icon: CalendarCheckIcon,
        iconColor: 'text-violet-400',
        glow: 'drop-shadow(0 4px 14px rgba(167,139,250,0.5))',
        dot: 'bg-violet-400',
        accent: 'hover:border-violet-800/60',
    },
];

export default function Stats() {
    const containerRef = useRef(null);
    const numRefs = useRef([]);

    // Entrada con back.out — igual que StatsGrid
    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = containerRef.current?.querySelectorAll('.stat-card');
            if (!cards?.length) return;
            gsap.fromTo(
                cards,
                { opacity: 0, y: 28, scale: 0.94 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.65,
                    stagger: 0.09,
                    ease: 'back.out(1.4)',
                    clearProps: 'all',
                    scrollTrigger: { trigger: containerRef.current, start: 'top 82%', once: true },
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Count-up de números — mismo patrón que StatsGrid
    useEffect(() => {
        const ctx = gsap.context(() => {
            numRefs.current.forEach((el, i) => {
                if (!el) return;
                const target = STATS[i].value;
                const proxy = { val: 0 };
                gsap.to(proxy, {
                    val: target,
                    duration: 1.4,
                    delay: 0.3 + i * 0.08,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: containerRef.current, start: 'top 82%', once: true },
                    onUpdate() {
                        if (el) el.textContent = Math.round(proxy.val);
                    },
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="py-14 sm:py-16 bg-slate-950 border-b border-slate-900 relative overflow-hidden">
            {/* Subtle red gradient line at top */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />

            <div ref={containerRef} className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {STATS.map(({ value, suffix, label, sublabel, Icon, iconColor, glow, dot, accent }, i) => (
                        <div key={label} className="stat-card">
                            <div className={`bg-slate-900 border border-slate-800 px-5 py-5 sm:px-6 sm:py-6 flex items-center gap-4 ${accent} hover:-translate-y-1 hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-default h-full`}>

                                {/* Icon with glow */}
                                <div className={`shrink-0 ${iconColor}`} style={{ filter: glow }}>
                                    <Icon size={36} weight="duotone" />
                                </div>

                                {/* Content */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                                        <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">{label}</p>
                                    </div>
                                    <div className="flex items-baseline gap-0.5">
                                        <p
                                            ref={el => { numRefs.current[i] = el; }}
                                            className="text-2xl sm:text-3xl font-black text-white leading-none tabular-nums"
                                        >
                                            0
                                        </p>
                                        <span className="text-sm sm:text-base font-black text-slate-400">{suffix}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-600 font-light mt-1 leading-tight hidden sm:block">{sublabel}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
