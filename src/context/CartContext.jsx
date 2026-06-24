// src/context/CartContext.jsx
import { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const { agregarToast } = useToast();

    const [carrito, setCarrito] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('carritoMaki')) || [];
        } catch {
            return [];
        }
    });

    function guardarCarrito(nuevo) {
        setCarrito(nuevo);
        localStorage.setItem('carritoMaki', JSON.stringify(nuevo));
    }

    // Añade 1 unidad de una flor. Si ya existe, suma la cantidad.
    function agregarAlCarrito(flor) {
        if (flor.stock === 0) {
            agregarToast({ mensaje: `${flor.nombre} está agotada`, tipo: 'danger', icono: '🚫' });
            return;
        }
        setCarrito(prev => {
            const existe = prev.find(i => i.id === flor.id);
            let nuevo;
            if (existe) {
                if (existe.cantidad >= flor.stock) {
                    agregarToast({ mensaje: `Stock máximo alcanzado para ${flor.nombre}`, tipo: 'warning', icono: '⚠️' });
                    return prev;
                }
                nuevo = prev.map(i => i.id === flor.id
                    ? { ...i, cantidad: i.cantidad + 1, subtotal: (i.cantidad + 1) * i.precio }
                    : i
                );
            } else {
                nuevo = [...prev, { ...flor, cantidad: 1, subtotal: flor.precio }];
            }
            localStorage.setItem('carritoMaki', JSON.stringify(nuevo));
            agregarToast({ mensaje: `${flor.nombre} añadida al carrito`, tipo: 'success', icono: '🛒' });
            return nuevo;
        });
    }

    function restarDelCarrito(id) {
        setCarrito(prev => {
            const item = prev.find(i => i.id === id);
            if (!item) return prev;
            let nuevo;
            if (item.cantidad === 1) {
                nuevo = prev.filter(i => i.id !== id);
            } else {
                nuevo = prev.map(i => i.id === id
                    ? { ...i, cantidad: i.cantidad - 1, subtotal: (i.cantidad - 1) * i.precio }
                    : i
                );
            }
            localStorage.setItem('carritoMaki', JSON.stringify(nuevo));
            return nuevo;
        });
    }

    function borrarItemCarrito(id) {
        const nuevo = carrito.filter(i => i.id !== id);
        guardarCarrito(nuevo);
    }

    function vaciarCarrito() {
        guardarCarrito([]);
    }

    const totalCarrito = carrito.reduce((acc, i) => acc + i.subtotal, 0);
    const cantidadTotal = carrito.reduce((acc, i) => acc + i.cantidad, 0);

    return (
        <CartContext.Provider value={{
            carrito, totalCarrito, cantidadTotal,
            agregarAlCarrito, restarDelCarrito, borrarItemCarrito, vaciarCarrito,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}