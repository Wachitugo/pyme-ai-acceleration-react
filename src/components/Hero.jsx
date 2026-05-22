import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
    const [typedText, setTypedText] = useState('');
    const fullText = "Trasciende tus Límites.";
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.15 });
            tl.from('.hero-badge',  { opacity: 0, y: 24, duration: 0.6, ease: 'power3.out' })
              .from('.hero-title',  { opacity: 0, y: 48, duration: 0.8, ease: 'power3.out' }, '-=0.3')
              .from('.hero-desc',   { opacity: 0, y: 32, duration: 0.7, ease: 'power3.out' }, '-=0.5')
              .from('.hero-btns',   { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.4')
              .from('.hero-scroll', { scaleY: 0, opacity: 0, duration: 0.8, ease: 'power2.out', transformOrigin: 'top' }, '-=0.5');
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

    const renderStyledText = () => {
        const breakIdx = "Trasciende tus ".length;
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

    return (
        <section ref={sectionRef} id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
            {/* Background */}
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
                    Socios Estratégicos en Inteligencia Artificial
                </div>

                {/* Title */}
                <h1
                    className="hero-title text-[2.4rem] sm:text-6xl md:text-7xl lg:text-[88px] font-black text-white leading-[0.9] tracking-tighter uppercase cursor-pointer max-w-5xl min-h-[5.5rem] sm:min-h-[8rem] md:min-h-[10rem] lg:min-h-[13rem]"
                    onClick={startTypewriter}
                    title="Haz clic para repetir"
                >
                    {renderStyledText()}
                </h1>

                {/* Description */}
                <p className="hero-desc text-base sm:text-lg md:text-xl text-slate-400 max-w-xl sm:max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed font-light px-2 sm:px-0">
                    Transformamos datos complejos en{' '}
                    <strong className="text-white font-semibold">valor estratégico tangible</strong>{' '}
                    mediante arquitecturas de alto impacto.
                </p>

                {/* Buttons */}
                <div className="hero-btns flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <a
                        href="#soluciones"
                        className="group w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-red-600 text-white font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-950/40"
                    >
                        Nuestras Plataformas
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </a>
                    <a
                        href="#mision"
                        className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 border border-slate-700 text-white font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-slate-800 transition-all flex items-center justify-center"
                    >
                        Misión Corporativa
                    </a>
                </div>

            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-px h-10 bg-gradient-to-b from-red-600 to-transparent" />
            </div>
        </section>
    );
}
