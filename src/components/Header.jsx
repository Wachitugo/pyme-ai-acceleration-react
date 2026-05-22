import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

export default function Header({ openModal }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                y: -80,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });
        }, headerRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, hash) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        if (hash) {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                scrolled
                    ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/60 py-3'
                    : 'bg-transparent py-5'
            }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

                {/* Logo */}
                <a
                    href="#"
                    className="flex items-center gap-2.5 no-underline hover:opacity-80 transition-opacity shrink-0"
                    onClick={(e) => handleNavClick(e, null)}
                >
                    <div className="w-9 h-9 bg-red-600 flex items-center justify-center">
                        <span className="text-white font-black text-lg leading-none">R</span>
                    </div>
                    <span className="text-xl font-black tracking-tighter text-white uppercase italic">REDPY</span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
                    {[
                        { label: 'Misión',     hash: '#mision'    },
                        { label: 'Pilares',    hash: '#pilares'   },
                        { label: 'Soluciones', hash: '#soluciones' },
                        { label: 'Proceso',    hash: '#proceso'   },
                    ].map(({ label, hash }) => (
                        <a
                            key={hash}
                            href={hash}
                            className="text-[11px] font-black text-slate-400 hover:text-red-500 transition-colors uppercase tracking-[0.2em]"
                            onClick={(e) => handleNavClick(e, hash)}
                        >
                            {label}
                        </a>
                    ))}
                </div>

                {/* CTA + Mobile Toggle */}
                <div className="flex items-center gap-4 shrink-0">
                    <button
                        className="hidden md:inline-flex items-center justify-center px-6 py-2.5 border border-red-600/50 text-red-500 text-[11px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
                        onClick={(e) => { e.preventDefault(); openModal(); }}
                    >
                        Asesoría
                    </button>
                    <button
                        className="md:hidden p-2 text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 flex flex-col gap-4">
                    {[
                        { label: 'Misión',     hash: '#mision'    },
                        { label: 'Pilares',    hash: '#pilares'   },
                        { label: 'Soluciones', hash: '#soluciones' },
                        { label: 'Proceso',    hash: '#proceso'   },
                    ].map(({ label, hash }) => (
                        <a
                            key={hash}
                            href={hash}
                            className="text-xs font-black text-slate-400 py-2 uppercase tracking-widest"
                            onClick={(e) => handleNavClick(e, hash)}
                        >
                            {label}
                        </a>
                    ))}
                    <button
                        className="mt-2 w-full px-6 py-3 bg-red-600 text-white text-xs font-black uppercase tracking-widest"
                        onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); openModal(); }}
                    >
                        Asesoría
                    </button>
                </div>
            )}
        </header>
    );
}
