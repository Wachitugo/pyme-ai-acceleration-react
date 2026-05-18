import { useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection({ openModal }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-cta', {
                opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: '.contact-cta', start: 'top 85%', once: true },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
                <div
                    className="contact-cta p-8 sm:p-12 md:p-16 relative overflow-hidden"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-red-600/80 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-slate-950/30" />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12">
                        <div className="flex-1">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase leading-[0.9] tracking-tighter mb-4">
                                Trascendamos <br />
                                <span className="text-white/50">Tus Límites</span>
                            </h3>
                            <p className="text-red-100 text-sm sm:text-base font-light max-w-lg">
                                En Redpy transformamos la complejidad en ventaja competitiva real. Hagamos que tus datos trabajen con un ROI garantizado.
                            </p>
                        </div>
                        <button
                            onClick={openModal}
                            className="flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-slate-950 text-white font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-white hover:text-slate-950 transition-all shadow-2xl shrink-0"
                        >
                            Consultoría
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
