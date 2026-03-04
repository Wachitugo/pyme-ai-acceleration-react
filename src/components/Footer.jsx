import React from 'react';
import { Linkedin, Instagram, MapPin, Phone, Mail, Network } from 'lucide-react';

export default function Footer({ openLegalModal }) {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand-col">
                        <div className="footer-logo">
                            <div className="logo-icon-box">
                                <Network size={24} />
                            </div>
                            <span className="logo-text">REDPY</span>
                        </div>
                        <p className="footer-description">
                            Red de Inteligencia para Pymes. Transformando el esfuerzo manual en valor digital. Somos el partner tecnológico que las empresas chilenas necesitan para escalar.
                        </p>
                        <div className="social-links">
                            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links-col">
                        <h4>Links Rápidos</h4>
                        <ul>
                            <li><a href="#">Inicio</a></li>
                            <li><a href="#">Soluciones por industria</a></li>
                            <li><a href="#">Por qué REDPY</a></li>
                            <li><a href="#">Cómo funciona</a></li>
                            <li><a href="#">Casos de éxito</a></li>
                        </ul>
                    </div>

                    <div className="footer-contact-col">
                        <h4>Contacto</h4>
                        <ul className="contact-info">
                            <li>
                                <MapPin size={18} className="contact-icon" />
                                <span>Santiago, Chile</span>
                            </li>
                            <li>
                                <Phone size={18} className="contact-icon" />
                                <span>+56 9 1234 5678</span>
                            </li>
                            <li>
                                <Mail size={18} className="contact-icon" />
                                <span>hola@redpy.cl</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="copyright">
                        © 2026 REDPY.cl - Todos los derechos reservados.
                    </div>
                    <div className="legal-links">
                        <a href="#" onClick={(e) => { e.preventDefault(); openLegalModal('privacy'); }}>Privacidad</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); openLegalModal('terms'); }}>Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
