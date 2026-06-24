// src/context/AppContext.jsx
import { createContext, useContext, useState } from 'react';
import { catalogoInicial } from '../data/products';

const AppContext = createContext(null);

export function AppProvider({ children }) {
    // --- Estado del Catálogo (equivale a `let catalogo` del JS original) ---
    const [catalogo, setCatalogo] = useState(() => {
        const guardado = localStorage.getItem('catalogoData');
        return guardado ? JSON.parse(guardado) : catalogoInicial;
    });

    // --- Estado del Carrito (equivale a `carritoGlobal`) ---
    const [carrito, setCarrito] = useState(() => {
        return JSON.parse(localStorage.getItem('carritoMaki')) || [];
    });

    // --- Estado Admin (equivale a `let isAdmin`) ---
    const [isAdmin, setIsAdmin] = useState(false);

    // --- Funciones del Catálogo ---
    function guardarCatalogo(nuevoCatalogo) {
        setCatalogo(nuevoCatalogo);
        localStorage.setItem('catalogoData', JSON.stringify(nuevoCatalogo));
    }

    function agregarFlor(datos) {
        const nuevoId = catalogo.length > 0 ? Math.max(...catalogo.map(f => f.id)) + 1 : 1;
        const nuevoCatalogo = [...catalogo, { id: nuevoId, ...datos }];
        guardarCatalogo(nuevoCatalogo);
    }

    function editarFlor(id, datos) {
        const nuevoCatalogo = catalogo.map(f => f.id === id ? { id, ...datos } : f);
        guardarCatalogo(nuevoCatalogo);
    }

    function eliminarFlor(id) {
        const nuevoCatalogo = catalogo.filter(f => f.id !== id);
        guardarCatalogo(nuevoCatalogo);
    }

    // --- Funciones del Carrito ---
    function agregarAlCarrito(items) {
        const nuevo = [...carrito, ...items];
        setCarrito(nuevo);
        localStorage.setItem('carritoMaki', JSON.stringify(nuevo));
    }

    function borrarItemCarrito(index) {
        const nuevo = carrito.filter((_, i) => i !== index);
        setCarrito(nuevo);
        localStorage.setItem('carritoMaki', JSON.stringify(nuevo));
    }

    function vaciarCarrito() {
        setCarrito([]);
        localStorage.setItem('carritoMaki', JSON.stringify([]));
    }

    // --- Login (credenciales hardcoded idénticas al JS original) ---
    function verificarLogin(usuario, password) {
        if (usuario === 'flowersmaki' && password === 'fm1635') {
            setIsAdmin(true);
            return true;
        }
        return false;
    }

    function cerrarSesion() {
        setIsAdmin(false);
    }

    return (
        <AppContext.Provider value={{
            catalogo, isAdmin,
            carrito, agregarAlCarrito, borrarItemCarrito, vaciarCarrito,
            agregarFlor, editarFlor, eliminarFlor,
            verificarLogin, cerrarSesion,
        }}>
            {children}
        </AppContext.Provider>
    );
}

// Hook personalizado para usar el contexto fácilmente
export function useApp() {
    return useContext(AppContext);
}