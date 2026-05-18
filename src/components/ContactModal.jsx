import { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2, ChevronRight } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, openLegalModal }) {
    const [formData, setFormData] = useState({
        name: '', email: '', interest: 'automation', acceptTerms: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setIsSuccess(false);
            setFormData({ name: '', email: '', interest: 'automation', acceptTerms: false });
        }, 300);
    };

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') handleClose(); };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <div
            className={`fixed inset-0 z-[2000] flex justify-center items-end sm:items-center bg-slate-950/80 backdrop-blur-sm p-0 sm:p-6 transition-all duration-300 ${isOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
            <div className={`w-full max-w-4xl shadow-2xl shadow-black/60 flex flex-col sm:flex-row overflow-hidden transition-all duration-500 max-h-[95vh] sm:max-h-[85vh] ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 sm:scale-95 opacity-0'}`}>

                {/* Left panel — red */}
                <div className="bg-red-600 text-white px-6 py-7 sm:px-10 sm:py-12 sm:w-[44%] flex flex-col justify-between relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-slate-950/10 mix-blend-overlay pointer-events-none" />

                    <div className="relative z-10">
                        {/* Logo mark */}
                        <div className="flex items-center gap-2 mb-8 sm:mb-12">
                            <div className="w-8 h-8 bg-white/20 flex items-center justify-center">
                                <span className="text-white font-black text-base leading-none">R</span>
                            </div>
                            <span className="text-sm font-black uppercase tracking-widest text-white/80">REDPY</span>
                        </div>

                        <span className="text-[10px] font-black uppercase tracking-[0.35em] text-red-200 mb-4 block">Consultoría Gratuita</span>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[0.9] mb-5 sm:mb-8">
                            ¿Listo/a para<br /><span className="text-white/50">evolucionar?</span>
                        </h3>
                        <p className="text-red-100 text-sm font-light leading-relaxed hidden sm:block">
                            15 minutos. Analizaremos tu negocio y te diremos exactamente dónde la IA puede generar valor inmediato.
                        </p>
                    </div>

                    <div className="relative z-10 hidden sm:flex flex-col gap-4 mt-10">
                        {[
                            { title: "Evaluación Inicial Gratuita", desc: "Sin costo, sin compromisos." },
                            { title: "Plan a Medida",               desc: "Estrategia personalizada para tu empresa." },
                            { title: "ROI Proyectado",              desc: "Claridad en el retorno de tu inversión." },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <CheckCircle size={14} className="text-white/60 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-black text-white uppercase tracking-wide">{item.title}</p>
                                    <p className="text-red-200 text-xs font-light">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right panel — form */}
                <div className="bg-slate-950 border-l border-slate-800 flex-1 px-6 py-7 sm:px-10 sm:py-12 relative overflow-y-auto">

                    {/* Close */}
                    <button
                        className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-600 transition-all"
                        onClick={handleClose}
                        aria-label="Cerrar"
                    >
                        <X size={15} />
                    </button>

                    {isSuccess ? (
                        <div className="flex flex-col items-start justify-center h-full gap-6 py-8">
                            <div className="w-12 h-12 bg-red-600 flex items-center justify-center">
                                <CheckCircle size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2">¡Solicitud enviada!</h3>
                                <p className="text-slate-400 text-sm font-light leading-relaxed max-w-xs">
                                    Nos pondremos en contacto contigo dentro de las próximas 24 horas hábiles.
                                </p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="px-7 py-3 border border-slate-700 text-slate-300 text-xs font-black uppercase tracking-widest hover:border-red-600 hover:text-white transition-all"
                            >
                                Cerrar
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-0">
                            <div>
                                <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-1">Completa tus datos</h3>
                                <p className="text-slate-500 text-xs font-light">Te contactaremos a la brevedad.</p>
                            </div>

                            {/* Name */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="name" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nombre / Empresa</label>
                                <input
                                    type="text" id="name" name="name"
                                    placeholder="Tu nombre o empresa"
                                    value={formData.name} onChange={handleChange} required
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 text-white placeholder:text-slate-600 text-sm font-light outline-none focus:border-red-600 transition-colors"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="email" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Correo Electrónico</label>
                                <input
                                    type="email" id="email" name="email"
                                    placeholder="tucorreo@empresa.com"
                                    value={formData.email} onChange={handleChange} required
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 text-white placeholder:text-slate-600 text-sm font-light outline-none focus:border-red-600 transition-colors"
                                />
                            </div>

                            {/* Sector */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="interest" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rubro de tu Negocio</label>
                                <select
                                    id="interest" name="interest"
                                    value={formData.interest} onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 text-white text-sm font-light outline-none focus:border-red-600 transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="automation">Automotoras y Maquinaria</option>
                                    <option value="health">Salud y Abogados</option>
                                    <option value="gastro">Gastronomía y Turismo</option>
                                    <option value="real-estate">Construcción e Inmobiliaria</option>
                                    <option value="other">Otro rubro</option>
                                </select>
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox" id="acceptTerms" name="acceptTerms"
                                    checked={formData.acceptTerms} onChange={handleChange} required
                                    className="mt-0.5 w-3.5 h-3.5 accent-red-600 cursor-pointer shrink-0"
                                />
                                <label htmlFor="acceptTerms" className="text-xs text-slate-500 leading-relaxed cursor-pointer">
                                    Acepto las{' '}
                                    <button type="button" onClick={() => openLegalModal('privacy')} className="text-red-500 font-bold hover:underline bg-transparent border-none p-0 cursor-pointer">
                                        Políticas de Privacidad
                                    </button>{' '}
                                    y consiento que REDPY me contacte.
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-red-600 text-white font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-red-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <><Loader2 size={18} className="animate-spin" /> Enviando...</>
                                ) : (
                                    <>Solicitar Auditoría Gratuita <ChevronRight size={16} /></>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
