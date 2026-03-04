import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

export default function Header({ openModal, openChat }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };



    const handleNavClick = (hash) => {
        setMobileMenuOpen(false);
        if (hash) {
            setTimeout(() => {
                const el = document.querySelector(hash);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    };

    return (
        <header className={scrolled ? 'scrolled' : ''}>
            <nav className="container">
                <a href="#" className="logo" onClick={(e) => { e.preventDefault(); handleNavClick(); }}><span className="gradient-text">REDPY</span> AI</a>

                <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <a href="#servicios" onClick={() => setMobileMenuOpen(false)}>Soluciones</a>
                    <a href="#nosotros" onClick={() => setMobileMenuOpen(false)}>Por qué REDPY</a>
                    <a href="#proceso" onClick={() => setMobileMenuOpen(false)}>Cómo funciona</a>
                    <a href="#contacto" className="btn-primary" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); openChat(); }}>Contacto WhatsApp</a>
                </div>

                <button className="mobile-menu-btn" aria-label="Menu" onClick={toggleMobileMenu}>
                    <Menu />
                </button>
            </nav>
        </header>
    );
}
