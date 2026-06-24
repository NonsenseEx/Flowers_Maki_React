// src/context/ToastContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const agregarToast = useCallback(({ mensaje, tipo = 'success', icono = '' }) => {
        const id = Date.now() + Math.random();
        // Evitar duplicados: si ya existe un toast con el mismo mensaje activo, no agregar otro
        setToasts(prev => {
            if (prev.some(t => t.mensaje === mensaje)) return prev;
            return [...prev, { id, mensaje, tipo, icono }];
        });
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3500);
    }, []);

    const quitarToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ agregarToast }}>
            {children}
            <ToastContainer toasts={toasts} onQuitar={quitarToast} />
        </ToastContext.Provider>
    );
}

function ToastContainer({ toasts, onQuitar }) {
    return (
        <div className="toast-container-custom">
            {toasts.map(t => (
                <div key={t.id} className={`toast-item toast-${t.tipo}`}>
                    {t.icono && <span className="toast-icono">{t.icono}</span>}
                    <span className="toast-mensaje">{t.mensaje}</span>
                    <button className="toast-cerrar" onClick={() => onQuitar(t.id)}>×</button>
                </div>
            ))}
        </div>
    );
}

export function useToast() {
    return useContext(ToastContext);
}