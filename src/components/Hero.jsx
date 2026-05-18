import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';

const screens = [
    { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200", alt: "Dashboard de Analytics" },
    { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200", alt: "Panel de Métricas" },
    { src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200", alt: "Visualización de Datos" },
];

const positionStyles = [
    { zIndex: 30, x: '0%',   y: '0px',  scale: 1,    opacity: 1,   rotate: 0  },
    { zIndex: 10, x: '-20%', y: '12px', scale: 0.88, opacity: 0.4, rotate: -4 },
    { zIndex: 20, x: '20%',  y: '12px', scale: 0.88, opacity: 0.4, rotate: 4  },
];

function DesktopMockup({ src, alt, style }) {
    return (
        <div className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={style}>
            <div className="overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-900">
                <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600/80" />
                </div>
                <img src={src} alt={alt} className="w-full h-auto block opacity-80" />
            </div>
        </div>
    );
}

export default function Hero({ openModal }) {
    const [typedText, setTypedText] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const fullText = "Tu Empresa, ahora con superpoderes de IA.";
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.15 });
            tl.from('.hero-badge',    { opacity: 0, y: 24, duration: 0.6, ease: 'power3.out' })
              .from('.hero-title',    { opacity: 0, y: 48, duration: 0.8, ease: 'power3.out' }, '-=0.3')
              .from('.hero-desc',     { opacity: 0, y: 32, duration: 0.7, ease: 'power3.out' }, '-=0.5')
              .from('.hero-btns',     { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.4')
              .from('.hero-mockup',   { opacity: 0, y: 60, duration: 1,   ease: 'power3.out' }, '-=0.3')
              .from('.hero-scroll',   { scaleY: 0, opacity: 0, duration: 0.8, ease: 'power2.out', transformOrigin: 'top' }, '-=0.5');
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const startTypewriter = useCallback(() => {
        setTypedText('');
        let cur = '';
        let i = 0;
        const t = setTimeout(() => {
            const iv = setInterval(() => {
                if (i < fullText.length) { cur += fullText[i]; setTypedText(cur); i++; }
                else clearInterval(iv);
            }, 50);
        }, 700);
        return () => clearTimeout(t);
    }, [fullText]);

    useEffect(() => { const c = startTypewriter(); return c; }, [startTypewriter]);

    useEffect(() => {
        const iv = setInterval(() => setActiveIndex(p => (p + 1) % 3), 4000);
        return () => clearInterval(iv);
    }, []);

    const renderStyledText = () => {
        const breakIdx = "Tu Empresa, ahora con ".length;
        const cursor = <span className="inline-block w-[3px] h-[0.75em] bg-red-500 animate-pulse ml-1 align-middle" />;
        if (typedText.length <= breakIdx) return <span>{typedText}{cursor}</span>;
        return (
            <>
                <span>{typedText.substring(0, breakIdx)}</span>
                <br className="hidden sm:block" />
                <span className="text-red-500">{typedText.substring(breakIdx)}</span>
                {cursor}
            </>
        );
    };

    const getStyle = (idx) => {
        const p = positionStyles[(3 + idx - activeIndex) % 3];
        return { zIndex: p.zIndex, transform: `translateX(${p.x}) translateY(${p.y}) scale(${p.scale}) rotate(${p.rotate}deg)`, opacity: p.opacity };
    };

    return (
        <section ref={sectionRef} id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1800"
                    alt=""
                    className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none z-0" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-900/15 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full flex flex-col items-center text-center py-16 sm:py-20 md:py-24">

                {/* Badge */}
                <div className="hero-badge inline-block px-4 py-1.5 bg-red-600 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] mb-8 sm:mb-10 text-white">
                    Strategic AI Partners · Chile
                </div>

                {/* Title */}
                <h1
                    className="hero-title text-[2.4rem] sm:text-6xl md:text-7xl lg:text-[88px] font-black text-white leading-[0.9] tracking-tighter mb-8 sm:mb-10 uppercase cursor-pointer max-w-5xl min-h-[5.5rem] sm:min-h-[8rem] md:min-h-[10rem] lg:min-h-[13rem]"
                    onClick={startTypewriter}
                    title="Haz clic para repetir"
                >
                    {renderStyledText()}
                </h1>

                {/* Description */}
                <p className="hero-desc text-base sm:text-lg md:text-xl text-slate-400 max-w-xl sm:max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed font-light px-2 sm:px-0">
                    En REDPY transformamos los procesos manuales que te quitan tiempo en{' '}
                    <strong className="text-white font-semibold">soluciones automatizadas que generan valor real</strong>.
                </p>

                {/* Buttons */}
                <div className="hero-btns flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <button
                        className="group w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-red-600 text-white font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-950/40"
                        onClick={(e) => { e.preventDefault(); openModal(); }}
                    >
                        Diagnostica tu Empresa Gratis
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                    <a
                        href="#servicios"
                        className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 border border-slate-700 text-white font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-slate-800 transition-all flex items-center justify-center"
                    >
                        Ver Soluciones
                    </a>
                </div>

                {/* Mockups */}
                <div className="hero-mockup mt-14 sm:mt-18 md:mt-20 w-full max-w-4xl lg:max-w-5xl relative" style={{ paddingBottom: '52%' }}>
                    {screens.map((screen, idx) => (
                        <DesktopMockup key={idx} src={screen.src} alt={screen.alt} style={getStyle(idx)} />
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-px h-10 bg-gradient-to-b from-red-600 to-transparent" />
            </div>
        </section>
    );
}
