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
            className={`fixed inset-0 z-[2000] flex items-end sm:items-center justify-center sm:p-6 transition-all duration-300
                ${isOpen ? 'bg-slate-950/75 backdrop-blur-sm opacity-100 visible pointer-events-auto'
                         : 'bg-slate-950/0 opacity-0 invisible pointer-events-none'}`}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
            {/* Modal container */}
            <div className={`relative w-full sm:max-w-2xl lg:max-w-3xl flex flex-col sm:flex-row overflow-hidden shadow-2xl shadow-black/70 transition-all duration-500
                ${isOpen ? 'translate-y-0 opacity-100 sm:scale-100' : 'translate-y-8 opacity-0 sm:scale-95'}`}
                style={{ maxHeight: 'min(96dvh, 680px)' }}
            >
                {/* Close — always top-right of the whole modal */}
                <button
                    onClick={handleClose}
                    aria-label="Cerrar"
                    className="absolute top-3 right-3 z-20 w-8 h-8 bg-slate-950/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all"
                >
                    <X size={14} />
                </button>

                {/* ── Red left panel ── */}
                <div className="relative bg-red-600 overflow-hidden
                    /* mobile: short top strip */
                    flex flex-row items-center gap-4 px-5 py-5
                    /* sm+: vertical side panel */
                    sm:flex-col sm:items-start sm:justify-between sm:px-8 sm:py-12 sm:w-[260px] lg:w-[300px] sm:shrink-0">

                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                         style={{backgroundImage:'repeating-linear-gradient(45deg,#000 0,#000 1px,transparent 0,transparent 50%)',backgroundSize:'8px 8px'}} />

                    {/* Logo */}
                    <div className="relative z-10 flex items-center gap-2.5 shrink-0">
                        <div className="w-8 h-8 bg-white/20 flex items-center justify-center">
                            <span className="text-white font-black text-base leading-none">R</span>
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-white/70">REDPY</span>
                    </div>

                    {/* Title — short on mobile, full on sm+ */}
                    <div className="relative z-10 flex-1 sm:flex-none sm:mt-8">
                        <p className="text-[9px] font-black uppercase tracking-[0.35em] text-red-200 mb-2 hidden sm:block">
                            Asesoría Especializada
                        </p>
                        <h3 className="font-black uppercase tracking-tight leading-[0.92] text-white
                            text-lg sm:text-[1.4rem] lg:text-[1.65rem]">
                            ¿Listo/a<br className="hidden sm:block" />
                            {' '}para<br className="hidden sm:block" />
                            <span className="text-white/40">evolucionar?</span>
                        </h3>
                    </div>

                    {/* Checklist — desktop only */}
                    <div className="relative z-10 hidden sm:flex flex-col gap-4 mt-auto pt-6 border-t border-white/10 w-full">
                        {[
                            { title: 'Evaluación sin costo', desc: 'Sin compromisos.' },
                            { title: 'Plan a Medida',       desc: 'Estrategia personalizada.' },
                            { title: 'ROI Proyectado',      desc: 'Claridad en tu retorno.' },
                        ].map((item) => (
                            <div key={item.title} className="flex items-start gap-2.5">
                                <CheckCircle size={13} className="text-white/40 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[10px] font-black text-white uppercase tracking-wide leading-none mb-0.5">{item.title}</p>
                                    <p className="text-white/75 text-[10px] font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Form right panel ── */}
                <div className="bg-slate-950 border-t sm:border-t-0 sm:border-l border-slate-800/60 flex-1 flex flex-col min-h-0 overflow-y-auto">
                    <div className="px-6 py-6 sm:px-8 sm:py-10">
                        {isSuccess ? (
                            <div className="flex flex-col items-start gap-5 py-4">
                                <div className="w-11 h-11 bg-red-600 flex items-center justify-center">
                                    <CheckCircle size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-1.5">¡Solicitud enviada!</h3>
                                    <p className="text-slate-400 text-sm font-light leading-relaxed">
                                        Nos pondremos en contacto dentro de las próximas 24 horas hábiles.
                                    </p>
                                </div>
                                <button onClick={handleClose}
                                    className="px-6 py-2.5 border border-slate-700 text-slate-300 text-xs font-black uppercase tracking-widest hover:border-red-600 hover:text-white transition-all">
                                    Cerrar
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                                <div className="pr-8 mb-1">
                                    <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">Completa tus datos</h3>
                                    <p className="text-slate-500 text-xs font-light mt-0.5">Te contactaremos a la brevedad.</p>
                                </div>

                                <Field label="Nombre / Empresa">
                                    <input type="text" name="name" id="name"
                                        placeholder="Tu nombre o empresa"
                                        value={formData.name} onChange={handleChange} required
                                        className="input-dark" />
                                </Field>

                                <Field label="Correo Electrónico">
                                    <input type="email" name="email" id="email"
                                        placeholder="tucorreo@empresa.com"
                                        value={formData.email} onChange={handleChange} required
                                        className="input-dark" />
                                </Field>

                                <Field label="Rubro de tu Negocio">
                                    <select name="interest" id="interest"
                                        value={formData.interest} onChange={handleChange}
                                        className="input-dark appearance-none cursor-pointer">
                                        <option value="automation">Automotoras y Maquinaria</option>
                                        <option value="health">Salud y Abogados</option>
                                        <option value="gastro">Gastronomía y Turismo</option>
                                        <option value="real-estate">Construcción e Inmobiliaria</option>
                                        <option value="other">Otro rubro</option>
                                    </select>
                                </Field>

                                <div className="flex items-start gap-3 pt-1">
                                    <input type="checkbox" name="acceptTerms" id="acceptTerms"
                                        checked={formData.acceptTerms} onChange={handleChange} required
                                        className="mt-0.5 w-3.5 h-3.5 accent-red-600 cursor-pointer shrink-0" />
                                    <label htmlFor="acceptTerms" className="text-[11px] text-slate-500 leading-relaxed cursor-pointer">
                                        Acepto las{' '}
                                        <button type="button" onClick={() => openLegalModal('privacy')}
                                            className="text-red-500 font-bold hover:underline bg-transparent border-none p-0 cursor-pointer">
                                            Políticas de Privacidad
                                        </button>
                                        {' '}y consiento que REDPY me contacte.
                                    </label>
                                </div>

                                <button type="submit" disabled={isSubmitting}
                                    className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-red-600 text-white font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-red-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2">
                                    {isSubmitting
                                        ? <><Loader2 size={16} className="animate-spin" /> Enviando...</>
                                        : <>Solicitar Asesoría Especializada <ChevronRight size={15} /></>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── tiny helpers ── */
function Field({ label, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
            {children}
        </div>
    );
}
