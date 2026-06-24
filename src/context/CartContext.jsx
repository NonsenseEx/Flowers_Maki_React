// src/context/CartContext.jsx
import { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const { agregarToast } = useToast();

    const [carrito, setCarrito] = useState(() => {
        try { return JSON.parse(localStorage.getItem('carritoMaki')) || []; }
        catch { return []; }
    });

    function guardarCarrito(nuevo) {
        setCarrito(nuevo);
        localStorage.setItem('carritoMaki', JSON.stringify(nuevo));
    }

    // Desde FlowerCard: agrega una flor de a 1 unidad
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
                    agregarToast({ mensaje: `Stock máximo para ${flor.nombre}`, tipo: 'warning', icono: '⚠️' });
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

    // Desde FormularioPedido: agrega lista de items con cantidad ya definida
    function agregarListaAlCarrito(items) {
        if (!items || items.length === 0) return;
        setCarrito(prev => {
            let nuevo = [...prev];
            items.forEach(item => {
                const existe = nuevo.find(i => i.nombre === item.nombre);
                if (existe) {
                    nuevo = nuevo.map(i => i.nombre === item.nombre
                        ? { ...i, cantidad: i.cantidad + item.cantidad, subtotal: (i.cantidad + item.cantidad) * i.precio }
                        : i
                    );
                } else {
                    nuevo = [...nuevo, { id: Date.now() + Math.random(), ...item }];
                }
            });
            localStorage.setItem('carritoMaki', JSON.stringify(nuevo));
            return nuevo;
        });
        agregarToast({ mensaje: '¡Pedido enviado al carrito!', tipo: 'success', icono: '✅' });
    }

    function restarDelCarrito(id) {
        setCarrito(prev => {
            const item = prev.find(i => i.id === id);
            if (!item) return prev;
            const nuevo = item.cantidad === 1
                ? prev.filter(i => i.id !== id)
                : prev.map(i => i.id === id
                    ? { ...i, cantidad: i.cantidad - 1, subtotal: (i.cantidad - 1) * i.precio }
                    : i
                );
            localStorage.setItem('carritoMaki', JSON.stringify(nuevo));
            return nuevo;
        });
    }

    function borrarItemCarrito(id) {
        guardarCarrito(carrito.filter(i => i.id !== id));
    }

    function vaciarCarrito() {
        guardarCarrito([]);
    }

    const totalCarrito = carrito.reduce((acc, i) => acc + i.subtotal, 0);
    const cantidadTotal = carrito.reduce((acc, i) => acc + i.cantidad, 0);

    return (
        <CartContext.Provider value={{
            carrito, totalCarrito, cantidadTotal,
            agregarAlCarrito, agregarListaAlCarrito,
            restarDelCarrito, borrarItemCarrito, vaciarCarrito,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}