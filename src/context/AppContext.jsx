// src/context/AppContext.jsx
import { createContext, useContext, useState } from 'react';
import { catalogoInicial } from '../data/products';
import { useToast } from './ToastContext';

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const { agregarToast } = useToast();

    const [catalogo, setCatalogo] = useState(() => {
        try {
            const guardado = localStorage.getItem('catalogoData');
            return guardado ? JSON.parse(guardado) : catalogoInicial;
        } catch {
            return catalogoInicial;
        }
    });

    const [isAdmin, setIsAdmin] = useState(false);

    function guardarCatalogo(nuevo) {
        setCatalogo(nuevo);
        localStorage.setItem('catalogoData', JSON.stringify(nuevo));
    }

    function agregarFlor(datos) {
        const nuevoId = catalogo.length > 0 ? Math.max(...catalogo.map(f => f.id)) + 1 : 1;
        guardarCatalogo([...catalogo, { id: nuevoId, stock: 10, ...datos }]);
    }

    function editarFlor(id, datos) {
        guardarCatalogo(catalogo.map(f => f.id === id ? { id, ...datos } : f));
    }

    function eliminarFlor(id) {
        guardarCatalogo(catalogo.filter(f => f.id !== id));
    }

    function verificarLogin(usuario, password) {
        if (usuario === 'flowersmaki' && password === 'fm1635') {
            setIsAdmin(true);
            agregarToast({ mensaje: '¡Bienvenido, Administrador!', tipo: 'success', icono: '👑' });
            return true;
        }
        agregarToast({ mensaje: 'Credenciales incorrectas', tipo: 'danger', icono: '🔒' });
        return false;
    }

    function cerrarSesion() {
        setIsAdmin(false);
        agregarToast({ mensaje: 'Sesión cerrada correctamente', tipo: 'warning', icono: '👋' });
    }

    return (
        <AppContext.Provider value={{
            catalogo, isAdmin,
            agregarFlor, editarFlor, eliminarFlor,
            verificarLogin, cerrarSesion,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}