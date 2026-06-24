// src/context/FavoritosContext.jsx
import { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';

const FavoritosContext = createContext(null);

export function FavoritosProvider({ children }) {
    const { agregarToast } = useToast();

    const [favoritos, setFavoritos] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('favoritosMaki')) || [];
        } catch {
            return [];
        }
    });

    function toggleFavorito(flor) {
        setFavoritos(prev => {
            const existe = prev.some(f => f.id === flor.id);
            const nuevo = existe
                ? prev.filter(f => f.id !== flor.id)
                : [...prev, flor];
            localStorage.setItem('favoritosMaki', JSON.stringify(nuevo));
            agregarToast(existe
                ? { mensaje: `${flor.nombre} eliminada de favoritos`, tipo: 'warning', icono: '🤍' }
                : { mensaje: `${flor.nombre} guardada en favoritos`, tipo: 'success', icono: '❤️' }
            );
            return nuevo;
        });
    }

    function esFavorito(id) {
        return favoritos.some(f => f.id === id);
    }

    return (
        <FavoritosContext.Provider value={{ favoritos, toggleFavorito, esFavorito }}>
            {children}
        </FavoritosContext.Provider>
    );
}

export function useFavoritos() {
    return useContext(FavoritosContext);
}