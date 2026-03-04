import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, title, content }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }} style={{ zIndex: 2000 }}>
            <div className="modal-content" style={{ maxWidth: '800px', padding: '2rem' }}>
                <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
                    <X size={24} />
                </button>
                <h2>{title}</h2>
                <div style={{ marginTop: '1.5rem', maxHeight: '60vh', overflowY: 'auto', paddingRight: '1rem', color: 'var(--text-muted)', lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
}
