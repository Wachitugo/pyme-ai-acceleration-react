import { useRef, useEffect } from 'react';
import {
    MagnifyingGlassIcon,
    LightbulbIcon,
    RocketLaunchIcon,
} from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        id: '01', Icon: MagnifyingGlassIcon, title: 'Descubrimiento de la Problemática',
        description: 'El objetivo de esta etapa no es vender tecnología, sino entender el dolor. Aquí bajamos al terreno a ver cómo funcionan los procesos internos en la realidad.',
        activities: [
            { name: 'Observación', desc: 'Acompañamos a los operadores en su día a día sin intervenir, registrando cómo hacen las cosas realmente.' },
            { name: 'Entrevistas de empatía', desc: 'Conversaciones uno a uno para entender qué les frustra, qué les quita tiempo y a qué le temen del cambio tecnológico.' },
            { name: 'Mapeo del proceso actual', def: 'As-Is — cómo funciona hoy, sin modificaciones', desc: 'Dibujar el flujo visual del proceso analógico, identificando cuellos de botella y fugas de información.' },
        ],
        deliverable: 'Matriz de Dolores y Oportunidades',
        iconColor: 'text-red-500',
        glow: 'drop-shadow(0 4px 14px rgba(239,68,68,0.5))',
        dot: 'bg-red-500',
        tags: ['Diagnóstico', 'Mapeo As-Is', 'Empatía'],
    },
    {
        id: '02', Icon: LightbulbIcon, title: 'Ideación y Priorización',
        description: 'No diseñes para los usuarios, diseña con ellos. En esta sesión conjunta (negocio, operaciones y tecnología), se transforman los problemas en soluciones viables.',
        activities: [
            { name: 'Lluvia de ideas guiada', def: 'HMW — "How Might We" · ¿Cómo Podríamos?', desc: '¿Cómo podríamos usar IA para que el llenado de este formulario físico tome segundos en lugar de minutos?' },
            { name: 'Matriz de Impacto vs. Esfuerzo', desc: 'Filtramos las ideas buscando el "fruto bajo": alto impacto para el usuario y bajo esfuerzo de implementación.' },
            { name: 'Definición del alcance del MPP', def: 'MPP — Mínimo Producto Productivo', desc: 'Seleccionar una sola batalla que podamos ganar rápido para demostrar el valor de la IA en sus procesos.' },
        ],
        deliverable: 'Backlog Priorizado y Alcance del MPP',
        deliverableDef: 'Backlog = lista priorizada de soluciones a construir · MPP = Mínimo Producto Productivo',
        iconColor: 'text-violet-400',
        glow: 'drop-shadow(0 4px 14px rgba(167,139,250,0.5))',
        dot: 'bg-violet-400',
        tags: ['Co-creación', 'Priorización', 'MPP'],
    },
    {
        id: '03', Icon: RocketLaunchIcon, title: 'Entrega del MPP',
        description: 'El MPP (Mínimo Producto Productivo) debe entrar a producción real, resolver una porción del problema y generar valor desde el día uno.',
        activities: [
            { name: 'Desarrollo Lean e Integración de IA', def: 'Lean — metodología de desarrollo ágil sin desperdicio', desc: 'Crear una solución sencilla: un Agente de WhatsApp con IA, extractor OCR o automatización de registros manuales.' },
            { name: 'Despliegue y Onboarding Guiado', def: 'Onboarding — proceso de incorporación y capacitación del equipo', desc: 'No se lanza el software por correo; se capacita mano a mano en el puesto de trabajo.' },
            { name: 'Medición de Adopción y Feedback', desc: 'Monitorear el uso real con métricas de tiempo ahorrado o errores reducidos.' },
        ],
        deliverable: 'MPP Operacional y Tablero de Adopción',
        deliverableDef: 'MPP = Mínimo Producto Productivo — solución real corriendo en producción desde el día uno',
        iconColor: 'text-emerald-400',
        glow: 'drop-shadow(0 4px 14px rgba(52,211,153,0.5))',
        dot: 'bg-emerald-400',
        tags: ['Desarrollo Lean', 'Onboarding', 'ROI'],
    },
];

export default function Process() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.process-header', {
                opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: '.process-header', start: 'top 80%', once: true },
            });

            const stepEls = sectionRef.current?.querySelectorAll('.process-step');
            if (stepEls?.length) {
                gsap.fromTo(stepEls,
                    { opacity: 0, y: 28, scale: 0.94 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.65, stagger: 0.1, ease: 'back.out(1.4)', clearProps: 'all',
                        scrollTrigger: { trigger: '.process-grid', start: 'top 80%', once: true },
                    }
                );
            }

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="proceso" className="py-14 sm:py-20 md:py-24 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

                {/* Header */}
                <div className="process-header text-center max-w-2xl mx-auto mb-10 sm:mb-12">
                    <span className="text-red-500 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] mb-5 block">Metodología</span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-[0.92] mb-6">
                        Proceso de <span className="text-red-600 whitespace-nowrap">Adopción Tecnológica</span>
                    </h2>
                    <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed px-4 sm:px-0">
                        Un proceso de levantamiento que transforma operaciones analógicas en soluciones de IA que generan valor desde el día uno.
                    </p>
                </div>

                {/* Steps */}
                <div className="process-grid flex flex-col gap-0 border border-slate-800 mb-10 sm:mb-12">
                    {steps.map((step, i) => {
                        const { Icon, iconColor, glow, dot } = step;
                        return (
                            <div
                                key={step.id}
                                className={`process-step bg-slate-950 p-8 sm:p-10 hover:bg-slate-900/60 transition-all duration-300 group ${i < steps.length - 1 ? 'border-b border-slate-800' : ''}`}
                            >
                                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                                    {/* Left: icon + number + title */}
                                    <div className="lg:w-64 shrink-0">
                                        <div className="flex justify-between items-start mb-5">
                                            <div className={`${iconColor}`} style={{ filter: glow }}>
                                                <Icon size={38} weight="duotone" />
                                            </div>
                                            <span className="text-xl font-mono font-black text-slate-800">/{step.id}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mb-3">
                                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Etapa {step.id}</h3>
                                        </div>
                                        <h4 className="text-lg font-black text-white uppercase tracking-tight leading-tight mb-4">{step.title}</h4>
                                        <p className="text-slate-500 leading-relaxed font-light text-sm">{step.description}</p>
                                        <div className="flex flex-wrap gap-2 mt-5">
                                            {step.tags.map(tag => (
                                                <span key={tag} className="text-[9px] px-2 py-0.5 bg-red-950/30 text-red-500 border border-red-900/40 font-black uppercase tracking-widest">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: activities + deliverable */}
                                    <div className="flex-1 flex flex-col gap-6">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Actividades clave</p>
                                            <div className="flex flex-col gap-4">
                                                {step.activities.map((act) => (
                                                    <div key={act.name} className="flex items-start gap-3">
                                                        <span className={`w-1 h-1 rounded-full shrink-0 mt-2 ${dot}`} />
                                                        <div>
                                                            <p className="text-xs font-black text-white uppercase tracking-wide mb-0.5">{act.name}</p>
                                                            {act.def && (
                                                                <p className="text-[10px] text-red-500/70 font-medium italic mb-1">{act.def}</p>
                                                            )}
                                                            <p className="text-slate-500 text-xs font-light leading-relaxed">{act.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={`border-l-2 pl-4 py-2 border-${dot.replace('bg-', '')}`} style={{ borderColor: 'rgb(239 68 68 / 0.4)' }}>
                                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-1">Entregable</p>
                                            <p className="text-sm font-black text-white">{step.deliverable}</p>
                                            {step.deliverableDef && (
                                                <p className="text-[10px] text-slate-500 font-light italic mt-1">{step.deliverableDef}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>



            </div>
        </section>
    );
}
