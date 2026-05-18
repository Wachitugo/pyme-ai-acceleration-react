import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';

const img1 = new URL('../assets/image.png',         import.meta.url).href;
const img2 = new URL('../assets/image copy.png',    import.meta.url).href;
const img3 = new URL('../assets/image copy 2.png',  import.meta.url).href;

const screens = [
    { src: img1, alt: 'Vista 1' },
    { src: img2, alt: 'Vista 2' },
    { src: img3, alt: 'Vista 3' },
];

function LaptopMockup({ activeIndex }) {
    return (
        <div className="w-full max-w-3xl mx-auto select-none">
            {/* Lid */}
            <div className="relative bg-gradient-to-b from-slate-700 to-slate-800 rounded-t-2xl pt-3 px-3 pb-0 border border-slate-600/60 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.8)]">
                {/* Camera */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-600/80" />

                {/* Screen inner */}
                <div className="bg-slate-950 rounded-t-lg overflow-hidden border border-slate-900/80">
                    {/* Browser bar */}
                    <div className="bg-slate-900 px-3 py-2 flex items-center gap-2 border-b border-slate-800">
                        <div className="flex gap-1.5 shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-600/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-600/80" />
                        </div>
                        <div className="flex-1 mx-2 bg-slate-800 rounded-full px-3 py-0.5 text-[9px] text-slate-500 font-mono tracking-wide">
                            redpy.cl
                        </div>
                    </div>

                    {/* Screen content — 16:9 */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        {screens.map((screen, i) => (
                            <img
                                key={i}
                                src={screen.src}
                                alt={screen.alt}
                                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out ${
                                    i === activeIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Hinge */}
            <div className="h-1.5 bg-slate-600 mx-3 shadow-md" />

            {/* Base / keyboard */}
            <div className="bg-gradient-to-b from-slate-700 to-slate-800 h-6 rounded-b-2xl border-x border-b border-slate-600/60 flex items-center justify-center shadow-xl">
                <div className="w-14 h-0.5 bg-slate-600/60 rounded-full" />
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-5">
                {screens.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === activeIndex ? 'w-5 bg-red-500' : 'w-1.5 bg-slate-700'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function Hero() {
    const [typedText, setTypedText] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const fullText = "Trasciende tus Límites.";
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.15 });
            tl.from('.hero-badge',  { opacity: 0, y: 24, duration: 0.6, ease: 'power3.out' })
              .from('.hero-title',  { opacity: 0, y: 48, duration: 0.8, ease: 'power3.out' }, '-=0.3')
              .from('.hero-desc',   { opacity: 0, y: 32, duration: 0.7, ease: 'power3.out' }, '-=0.5')
              .from('.hero-btns',   { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.4')
              .from('.hero-mockup', { opacity: 0, y: 60, duration: 1,   ease: 'power3.out' }, '-=0.3')
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

    useEffect(() => {
        const iv = setInterval(() => setActiveIndex(p => (p + 1) % screens.length), 4000);
        return () => clearInterval(iv);
    }, []);

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
                    Socios Estratégicos en IA · Chile
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

                {/* Laptop mockup */}
                <div className="hero-mockup mt-14 sm:mt-16 md:mt-20 w-full max-w-3xl lg:max-w-4xl">
                    <LaptopMockup activeIndex={activeIndex} />
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-px h-10 bg-gradient-to-b from-red-600 to-transparent" />
            </div>
        </section>
    );
}
