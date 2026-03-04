import React, { useState } from 'react';
import { Car, Scale, Utensils, Building2, Zap, ArrowRight } from 'lucide-react';

const industries = [
    {
        id: 'automotora',
        name: 'Automotoras y Maquinaria',
        icon: Car,
        title: 'Agentes de venta 24/7 y gestión de inventario predictivo.',
        impact: 'No pierdas ni un lead, incluso fuera de horario.',
        image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800',
        video: 'https://www.youtube.com/watch?v=Cj26b1CRTIg',
        link: '#'
    },
    {
        id: 'legal',
        name: 'Salud y Abogados',
        icon: Scale,
        title: 'Asistentes para agendamiento y resumen inteligente de expedientes.',
        impact: 'Prioriza a tus clientes, no al papeleo.',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-lawyer-signing-documents-4261-large.mp4',
        link: '#'
    },
    {
        id: 'gastronomia',
        name: 'Gastronomía y Turismo',
        icon: Utensils,
        title: 'Bots de reserva en lenguaje natural y optimización de menú/precios.',
        impact: 'Ocupación máxima y stock bajo control.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-4187-large.mp4',
        link: '#'
    },
    {
        id: 'construccion',
        name: 'Construcción e Inmobiliaria',
        icon: Building2,
        title: 'Calificación automática de prospectos y visualización de datos de obra.',
        impact: 'Acelera el cierre de ventas de departamentos.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-construction-site-at-sunset-4309-large.mp4',
        link: '#'
    }
];

export default function Services() {
    const [activeTab, setActiveTab] = useState(industries[0]);

    // Handle video transition smoothly
    const [key, setKey] = useState(0);

    const handleTabChange = (industry) => {
        setActiveTab(industry);
        setKey(prev => prev + 1); // Force re-render of video to ensure autoplay works on source change
    };

    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const isYouTube = (url) => {
        return url && (url.includes('youtube.com') || url.includes('youtu.be'));
    };

    return (
        <section id="servicios" className="services">
            <div className="container">
                <div className="section-header" data-animate="slide-up">
                    <h2>Hub de <span className="gradient-text">Soluciones</span></h2>
                    <p>Selecciona tu industria y descubre cómo la IA de REDPY transforma tu negocio.</p>
                </div>

                <div className="hub-tabs" data-animate="slide-up">
                    {industries.map((industry) => (
                        <button
                            key={industry.id}
                            className={`hub-tab-btn ${activeTab.id === industry.id ? 'active' : ''}`}
                            onClick={() => handleTabChange(industry)}
                        >
                            <industry.icon size={18} />
                            {industry.name}
                        </button>
                    ))}
                </div>

                <div className="hub-content-card" data-animate="fade-in">
                    <div className="hub-image">
                        {isYouTube(activeTab.video) ? (
                            <iframe
                                key={key}
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${getYouTubeId(activeTab.video)}?autoplay=1&mute=1&controls=0&loop=1&playlist=${getYouTubeId(activeTab.video)}&showinfo=0&rel=0`}
                                title={activeTab.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
                            ></iframe>
                        ) : (
                            <video
                                key={key}
                                src={activeTab.video}
                                poster={activeTab.image}
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        )}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, width: '100%', height: '100%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                            display: 'flex', alignItems: 'flex-end', padding: '2rem',
                            pointerEvents: 'none'
                        }}>
                        </div>
                    </div>
                    <div className="hub-details">
                        <div className="industry-badge">
                            <activeTab.icon size={16} />
                            {activeTab.name}
                        </div>
                        <h3>{activeTab.title}</h3>

                        <div className="impact-box">
                            <div className="impact-icon">
                                <Zap size={18} />
                            </div>
                            <div className="impact-content">
                                <h4>Impacto de Negocio</h4>
                                <p>{activeTab.impact}</p>
                            </div>
                        </div>

                        <a href="#contacto" className="hub-link">
                            Solicitar demo personalizada para este sector <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
