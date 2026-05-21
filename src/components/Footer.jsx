import { useRef, useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ openLegalModal }) {
    const footerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.footer-inner', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.footer-inner',
                    start: 'top 90%',
                    once: true,
                },
            });
        }, footerRef);
        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="bg-slate-950 border-t border-slate-900 pt-20 pb-10 overflow-hidden">
            <div className="footer-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main grid */}
                <div className="flex flex-col md:flex-row justify-between gap-16 mb-16">

                    {/* Brand */}
                    <div className="flex flex-col gap-6 max-w-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-600 flex items-center justify-center">
                                <span className="text-white font-black text-xl leading-none">R</span>
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white uppercase italic">REDPY</span>
                        </div>
                        <p className="text-slate-500 text-sm font-light leading-relaxed">
                            Red de Inteligencia para Empresas. Transformando el esfuerzo manual en valor digital. El partner tecnológico que las empresas chilenas necesitan para escalar.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" aria-label="LinkedIn" className="w-9 h-9 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                            </a>
                            <a href="#" aria-label="Instagram" className="w-9 h-9 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                        <div className="flex flex-col gap-5 text-xs font-black text-white uppercase tracking-widest">
                            <span className="text-slate-600">Compañía</span>
                            <a href="#nosotros" className="text-slate-400 hover:text-red-500 transition-colors">Nosotros</a>
                            <a href="#servicios" className="text-slate-400 hover:text-red-500 transition-colors">Soluciones</a>
                            <a href="#proceso" className="text-slate-400 hover:text-red-500 transition-colors">Proceso</a>
                        </div>
                        <div className="flex flex-col gap-5 text-xs font-black text-white uppercase tracking-widest">
                            <span className="text-slate-600">Legal</span>
                            <button onClick={() => openLegalModal('privacy')} className="text-slate-400 hover:text-red-500 transition-colors text-left bg-transparent border-none p-0 cursor-pointer">
                                Privacidad
                            </button>
                            <button onClick={() => openLegalModal('terms')} className="text-slate-400 hover:text-red-500 transition-colors text-left bg-transparent border-none p-0 cursor-pointer">
                                Términos
                            </button>
                        </div>
                        <div className="flex flex-col gap-5 text-xs font-black uppercase tracking-widest">
                            <span className="text-slate-600">Contacto</span>
                            <div className="flex items-center gap-2 text-slate-400 font-light normal-case">
                                <MapPin size={13} className="text-red-600 shrink-0" />
                                Santiago, Chile
                            </div>
                            <a href="tel:+56987618340" className="flex items-center gap-2 text-slate-400 font-light normal-case hover:text-red-400 transition-colors">
                                <Phone size={13} className="text-red-600 shrink-0" />
                                +56 9 87618340
                            </a>
                            <a href="mailto:aibaceta@redpy.org" className="flex items-center gap-2 text-slate-400 font-light normal-case hover:text-red-400 transition-colors">
                                <Mail size={13} className="text-red-600 shrink-0" />
                                aibaceta@redpy.org
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
                        © {new Date().getFullYear()} REDPY Chile. IA de alto impacto.
                    </div>
                    <div className="flex gap-8 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
