import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ArrowDown } from 'lucide-react';

const quickReplies = [
    "¿Qué servicios ofrecen?",
    "Quiero una demo",
    "¿Cuánto cuesta?",
    "Hablar con un humano",
];

export default function ChatAssistant({ isOpen, toggleChat }) {
    const [messages, setMessages] = useState([
        { id: 1, text: "¡Hola! Soy el asistente virtual de REDPY AI. ¿En qué puedo ayudarte a potenciar tu Empresa hoy?", sender: 'bot', time: new Date() }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = (smooth = true) => {
        messagesEndRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            scrollToBottom(false);
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // Body scroll lock on mobile when chat is open
    useEffect(() => {
        if (isOpen && window.innerWidth < 640) {
            document.body.style.overflow = 'hidden';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleScroll = () => {
        const container = messagesContainerRef.current;
        if (!container) return;
        const atBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 80;
        setShowScrollBtn(!atBottom);
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    };

    const addBotResponse = (text) => {
        setMessages(prev => [...prev, {
            id: Date.now() + 1,
            text,
            sender: 'bot',
            time: new Date()
        }]);
        setIsTyping(false);
    };

    const sendMessage = (text) => {
        if (!text.trim()) return;

        const newUserMsg = { id: Date.now(), text: text.trim(), sender: 'user', time: new Date() };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");
        setIsTyping(true);

        setTimeout(() => {
            const botResponses = [
                "¡Excelente pregunta! En REDPY nos especializamos en automatizar procesos para empresas chilenas.",
                "Podemos automatizar ese proceso para ahorrarte horas de trabajo manual cada semana.",
                "Esa es una gran oportunidad para implementar IA en tu negocio. ¿Te cuento más?",
                "¿Te gustaría agendar una demo de 15 minutos para verlo en acción? Es sin costo.",
                "Nuestros agentes virtuales pueden manejar eso 24/7 sin que pierdas un solo cliente."
            ];
            addBotResponse(botResponses[Math.floor(Math.random() * botResponses.length)]);
        }, 1200 + Math.random() * 800);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        sendMessage(inputValue);
    };

    const handleQuickReply = (text) => {
        sendMessage(text);
    };

    const showQuickReplies = messages.length <= 2 && !isTyping;

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-[1000] font-sans">
            {/* Chat Window */}
            <div className={`
                fixed inset-0 sm:inset-auto sm:absolute sm:bottom-0 sm:right-0
                w-full sm:w-[380px] md:w-[400px]
                h-full sm:h-[min(580px,85vh)]
                bg-white sm:rounded-2xl shadow-2xl shadow-slate-900/20
                flex flex-col overflow-hidden
                origin-bottom-right transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${isOpen
                    ? 'scale-100 opacity-100 pointer-events-auto translate-y-0'
                    : 'sm:scale-95 opacity-0 pointer-events-none sm:translate-y-4 translate-y-full'}
            `}>

                {/* Header */}
                <div className="relative p-4 sm:p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex justify-between items-center shrink-0 overflow-hidden">
                    {/* Subtle pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(#475569_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>
                    {/* Glow */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400/20">
                            <Bot size={20} />
                        </div>
                        <div>
                            <h4 className="m-0 text-sm font-bold tracking-tight">Asistente REDPY</h4>
                            <span className="text-xs text-slate-400 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full block shadow-sm shadow-emerald-400/50"></span>
                                En línea ahora
                            </span>
                        </div>
                    </div>
                    <button
                        className="relative bg-white/10 hover:bg-white/20 border-none text-white cursor-pointer flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
                        onClick={toggleChat}
                        aria-label="Cerrar chat"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Messages Area */}
                <div
                    ref={messagesContainerRef}
                    onScroll={handleScroll}
                    className="flex-1 px-4 py-5 overflow-y-auto flex flex-col gap-3 bg-slate-50 relative"
                >
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-[fadeIn_0.3s_ease]`}>
                            {/* Avatar */}
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                msg.sender === 'user'
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'bg-slate-200 text-slate-600'
                            }`}>
                                {msg.sender === 'user'
                                    ? <User size={14} strokeWidth={2} />
                                    : <Bot size={14} strokeWidth={2} />
                                }
                            </div>
                            {/* Bubble */}
                            <div className="flex flex-col gap-1 max-w-[75%]">
                                <div className={`px-3.5 py-2.5 text-[0.875rem] leading-relaxed ${
                                    msg.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-2xl rounded-tr-md shadow-sm shadow-blue-600/10'
                                        : 'bg-white text-slate-700 rounded-2xl rounded-tl-md shadow-sm border border-slate-100'
                                }`}>
                                    {msg.text}
                                </div>
                                <span className={`text-[0.65rem] text-slate-400 px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                    {formatTime(msg.time)}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex gap-2 animate-[fadeIn_0.3s_ease]">
                            <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                                <Bot size={14} strokeWidth={2} />
                            </div>
                            <div className="bg-white rounded-2xl rounded-tl-md shadow-sm border border-slate-100 px-4 py-3 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
                            </div>
                        </div>
                    )}

                    {/* Quick Replies */}
                    {showQuickReplies && (
                        <div className="flex flex-wrap gap-2 mt-2 animate-[fadeIn_0.5s_ease_0.3s_both]">
                            {quickReplies.map((reply) => (
                                <button
                                    key={reply}
                                    onClick={() => handleQuickReply(reply)}
                                    className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors cursor-pointer"
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Scroll to bottom button */}
                {showScrollBtn && (
                    <button
                        onClick={() => scrollToBottom()}
                        className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-500 hover:text-slate-700 cursor-pointer transition-all z-10"
                    >
                        <ArrowDown size={14} />
                    </button>
                )}

                {/* Input Area */}
                <form className="p-3 sm:p-4 bg-white border-t border-slate-100 flex gap-2 shrink-0" onSubmit={handleSendMessage}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Escribe tu consulta..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isTyping}
                        className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 outline-none transition-all text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 bg-slate-50 focus:bg-white placeholder:text-slate-400 disabled:opacity-50 text-slate-900"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 border-none ${
                            !inputValue.trim() || isTyping
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white cursor-pointer hover:bg-blue-700 shadow-sm shadow-blue-600/20 active:scale-95'
                        }`}
                    >
                        <Send size={16} className={inputValue.trim() ? '-ml-0.5' : ''} />
                    </button>
                </form>
            </div>

            {/* Toggle Button */}
            <button
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white border border-slate-700/50 shadow-[0_8px_30px_rgba(0,0,0,0.25)] cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] relative group ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : ''}`}
                onClick={toggleChat}
                aria-label="Abrir chat"
            >
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-2xl border-2 border-blue-400/40 animate-ping pointer-events-none"></span>

                <MessageCircle size={24} />

                {/* Tooltip */}
                <span className="absolute right-[calc(100%+12px)] bg-slate-900 text-white py-2 px-3.5 rounded-xl text-xs font-semibold shadow-xl opacity-0 translate-x-2 transition-all duration-300 whitespace-nowrap pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 border border-slate-700/50 hidden sm:block">
                    ¡Habla con nosotros!
                    <span className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[5px] border-y-transparent border-l-[5px] border-l-slate-900"></span>
                </span>
            </button>
        </div>
    );
}
