// src/components/cart/ModalCarrito.jsx
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CheckoutModal from '../ui/CheckoutModal';

export default function ModalCarrito({ onCerrar }) {
    const { carrito, totalCarrito, agregarAlCarrito, restarDelCarrito, borrarItemCarrito, vaciarCarrito } = useCart();
    const [mostrarCheckout, setMostrarCheckout] = useState(false);

    if (mostrarCheckout) {
        return <CheckoutModal onCerrar={() => { setMostrarCheckout(false); onCerrar(); }} />;
    }

    return (
        <div className="modal" style={{ display: 'block' }} onClick={e => e.target === e.currentTarget && onCerrar()}>
            <div className="modal-contenido carrito-modal">
                <span className="cerrar-modal" onClick={onCerrar}>×</span>
                <h2 className="carrito-titulo">🛒 Tu Carrito</h2>

                {carrito.length === 0 ? (
                    <div className="carrito-vacio">
                        <p>🌸 Tu carrito está vacío.</p>
                        <p style={{ fontSize: '0.85rem', color: '#888' }}>Agrega flores desde el catálogo.</p>
                    </div>
                ) : (
                    <>
                        <div className="carrito-items">
                            {carrito.map(item => (
                                <div key={item.id} className="carrito-item">
                                    <img src={item.img} alt={item.nombre} className="carrito-item-img" />
                                    <div className="carrito-item-info">
                                        <strong>{item.nombre}</strong>
                                        <span className="carrito-item-precio">${item.precio.toLocaleString()} c/u</span>
                                    </div>
                                    <div className="carrito-item-controles">
                                        <button className="btn-cantidad" onClick={() => restarDelCarrito(item.id)}>−</button>
                                        <span className="carrito-item-cantidad">{item.cantidad}</span>
                                        <button className="btn-cantidad" onClick={() => agregarAlCarrito(item)}>+</button>
                                    </div>
                                    <div className="carrito-item-subtotal">
                                        ${item.subtotal.toLocaleString()}
                                    </div>
                                    <button className="carrito-item-borrar" onClick={() => borrarItemCarrito(item.id)} title="Eliminar">×</button>
                                </div>
                            ))}
                        </div>

                        <div className="carrito-footer">
                            <div className="carrito-total">
                                <span>Total</span>
                                <span className="carrito-total-monto">${totalCarrito.toLocaleString()}</span>
                            </div>
                            <button className="btn-accion btn-peligro" onClick={() => { if (window.confirm('¿Vaciar carrito?')) vaciarCarrito(); }}>
                                🗑 Vaciar carrito
                            </button>
                            <button className="btn-accion btn-exito" onClick={() => setMostrarCheckout(true)}>
                                ✅ Confirmar compra
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}