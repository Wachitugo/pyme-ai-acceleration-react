import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Services from './components/Services';
import Features from './components/Features';

import Process from './components/Process';

import Footer from './components/Footer';
import Background from './components/Background';

import ChatAssistant from './components/ChatAssistant';
import ContactModal from './components/ContactModal';
import LegalModal from './components/LegalModal';

import { useScrollAnimation } from './hooks/useScrollAnimation';

const PRIVACY_TEXT = `
  <strong>Política de Privacidad de REDPY</strong><br/><br/>
  En REDPY, estamos comprometidos con la protección de tu información personal. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos tus datos cuando utilizas nuestro sitio web y servicios.<br/><br/>
  <strong>1. Recopilación de Información:</strong><br/>
  Recopilamos información personal (como nombre, correo electrónico y detalles de la empresa) únicamente cuando nos la proporcionas voluntariamente a través de nuestros formularios de contacto.<br/><br/>
  <strong>2. Uso de la Información:</strong><br/>
  Utilizamos tus datos exclusivamente para comunicarnos contigo sobre nuestros servicios, programar consultorías y enviarte información relevante sobre tu solicitud. No vendemos ni compartimos tus datos con terceros sin tu consentimiento explícito.<br/><br/>
  <strong>3. Seguridad:</strong><br/>
  Implementamos medidas de seguridad estándar de la industria para proteger tus datos contra acceso no autorizado, alteración o divulgación.<br/><br/>
  <strong>4. Tus Derechos:</strong><br/>
  Puedes solicitar el acceso, rectificación o eliminación de tus datos personales en cualquier momento escribiendo a hola@redpy.cl.<br/><br/>
  <em>Última actualización: Marzo 2026.</em>
`;

const TERMS_TEXT = `
  <strong>Términos de Servicio de REDPY</strong><br/><br/>
  Bienvenido a REDPY. Al utilizar nuestro sitio web y servicios, aceptas los siguientes Términos de Servicio.<br/><br/>
  <strong>1. Descripción del Servicio:</strong><br/>
  REDPY proporciona consultoría e implementación de soluciones de Inteligencia Artificial para Pymes. Toda la información en este sitio es representativa y las soluciones se cotizan a medida de cada cliente.<br/><br/>
  <strong>2. Uso del Sitio:</strong><br/>
  El contenido de este sitio web es para información general. Está sujeto a cambios sin previo aviso.<br/><br/>
  <strong>3. Propiedad Intelectual:</strong><br/>
  Todo el contenido, diseños y marcas mostrados en este sitio web son propiedad de REDPY o se utilizan con las licencias correspondientes. Queda prohibida la reproducción no autorizada.<br/><br/>
  <strong>4. Limitación de Responsabilidad:</strong><br/>
  Las propuestas y métricas mencionadas son ejemplos de casos reales y potenciales de la tecnología, pero los resultados pueden variar según el caso específico de cada cliente.<br/><br/>
  <strong>5. Contacto:</strong><br/>
  Para cualquier duda, escríbenos a hola@redpy.cl.<br/><br/>
  <em>Última actualización: Marzo 2026.</em>
`;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Legal Modal
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalContent, setLegalModalContent] = useState({ title: '', content: '' });

  const openLegalModal = (type) => {
    if (type === 'privacy') {
      setLegalModalContent({ title: 'Políticas de Privacidad', content: PRIVACY_TEXT });
    } else {
      setLegalModalContent({ title: 'Términos de Servicio', content: TERMS_TEXT });
    }
    setLegalModalOpen(true);
  };
  const closeLegalModal = () => setLegalModalOpen(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Chat Assistant State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const openChat = () => setIsChatOpen(true);

  // Mouse move effect hook
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.querySelectorAll('.service-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []); // Re-attach when page changes as new elements might appear

  // Initialize scroll animation
  useScrollAnimation();

  return (
    <>
      <Background />
      <Header openModal={openModal} openChat={openChat} />

      <main>
        <Hero openModal={openModal} />
        <PainPoints />
        <Services />
        <Features />
        <Process openModal={openModal} />
      </main>

      <ChatAssistant isOpen={isChatOpen} toggleChat={toggleChat} />
      <ContactModal isOpen={isModalOpen} onClose={closeModal} openLegalModal={openLegalModal} />
      <Footer openLegalModal={openLegalModal} />

      <LegalModal
        isOpen={legalModalOpen}
        onClose={closeLegalModal}
        title={legalModalContent.title}
        content={legalModalContent.content}
      />
    </>
  );
}

export default App;
