import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, openLegalModal }) {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        interest: 'automation',
        acceptTerms: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission would go here
        console.log('Form submitted:', formData);
        alert('¡Gracias! Nos pondremos en contacto contigo pronto.');
        onClose();
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    // Close when pressing Escape
    React.useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}>
            <div className="modal-content">
                <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
                    <X size={24} />
                </button>

                <div className="modal-body">
                    <div className="modal-left">
                        <h3>¿Listo/a para <span className="gradient-text">Evolucionar?</span></h3>
                        <p>Agenda una consultoría gratuita de 15 minutos. Analizaremos tu negocio y te diremos exactamente dónde la IA puede generar valor inmediato.</p>

                        <div className="modal-features-list">
                            <div className="modal-feature-item">
                                <div className="modal-feature-icon"><CheckCircle /></div>
                                <div className="modal-feature-text">
                                    <h4>Evaluación Inicial Gratuita</h4>
                                    <p>Evaluamos tu estado actual sin costo.</p>
                                </div>
                            </div>
                            <div className="modal-feature-item">
                                <div className="modal-feature-icon"><CheckCircle /></div>
                                <div className="modal-feature-text">
                                    <h4>Plan a Medida</h4>
                                    <p>Estrategia personalizada para tu pyme.</p>
                                </div>
                            </div>
                            <div className="modal-feature-item">
                                <div className="modal-feature-icon"><CheckCircle /></div>
                                <div className="modal-feature-text">
                                    <h4>ROI Proyectado</h4>
                                    <p>Claridad en el retorno de tu inversión.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-right">
                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="modal-form-group">
                                <label htmlFor="name">Nombre Pyme</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Tu nombre"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>



                            <div className="modal-form-group">
                                <label htmlFor="email">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="tucorreo@empresa.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="modal-form-group">
                                <label htmlFor="interest">Interés Principal</label>
                                <select
                                    id="interest"
                                    name="interest"
                                    value={formData.interest}
                                    onChange={handleChange}
                                >
                                    <option value="automation">Automotoras y Maquinaria</option>
                                    <option value="chatbots">Salud y Abogados</option>
                                    <option value="analysis">Gastronomía y Turismo</option>
                                    <option value="consulting">Construcción e Inmobiliaria</option>
                                </select>
                            </div>

                            <div className="modal-form-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '1rem' }}>
                                <input
                                    type="checkbox"
                                    id="acceptTerms"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleChange}
                                    required
                                    style={{ width: 'auto', marginTop: '4px' }}
                                />
                                <label htmlFor="acceptTerms" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                                    Acepto las <a href="#" onClick={(e) => { e.preventDefault(); openLegalModal('privacy'); }} style={{ color: 'var(--primary)' }}>Políticas de Privacidad</a> y consiento que REDPY me contacte. No compartiremos tus datos con terceros.
                                </label>
                            </div>

                            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                                Solicitar Auditoría <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
