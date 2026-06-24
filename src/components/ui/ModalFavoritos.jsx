// src/components/ui/ModalFavoritos.jsx
import { useState } from 'react';
import { useFavoritos } from '../../context/FavoritosContext';
import { useCart } from '../../context/CartContext';

export default function ModalFavoritos({ onCerrar }) {
    const { favoritos, toggleFavorito } = useFavoritos();
    const { agregarListaAlCarrito } = useCart();
    // Cantidades locales por flor
    const [cantidades, setCantidades] = useState({});

    function getCantidad(id) {
        return cantidades[id] || 1;
    }

    function setCantidad(id, valor) {
        setCantidades(prev => ({ ...prev, [id]: Math.max(1, parseInt(valor) || 1) }));
    }

    function handleAgregarAlCarrito(flor) {
        const cantidad = getCantidad(flor.id);
        agregarListaAlCarrito([{
            id: flor.id,
            nombre: flor.nombre,
            img: flor.img,
            precio: flor.precio,
            cantidad,
            subtotal: flor.precio * cantidad,
        }]);
    }

    return (
        <div className="modal" style={{ display: 'block' }} onClick={e => e.target === e.currentTarget && onCerrar()}>
            <div className="modal-contenido favoritos-modal">
                <span className="cerrar-modal" onClick={onCerrar}>×</span>
                <h2 className="favoritos-titulo">❤️ Mis Favoritos</h2>

                {favoritos.length === 0 ? (
                    <div className="favoritos-vacio">
                        <p>🌸 Aún no tienes flores favoritas.</p>
                        <p style={{ fontSize: '0.85rem', color: '#999' }}>
                            Pulsa el corazón 🤍 en cualquier flor del catálogo para guardarla aquí.
                        </p>
                    </div>
                ) : (
                    <div className="favoritos-lista">
                        {favoritos.map(flor => (
                            <div key={flor.id} className="favorito-item">
                                <img src={flor.img} alt={flor.nombre} className="favorito-img" />

                                <div className="favorito-info">
                                    <strong>{flor.nombre}</strong>
                                    <span className="favorito-precio">${flor.precio.toLocaleString()} c/u</span>
                                </div>

                                <div className="favorito-acciones">
                                    <div className="favorito-cantidad-wrap">
                                        <button className="btn-cantidad" onClick={() => setCantidad(flor.id, getCantidad(flor.id) - 1)}>−</button>
                                        <input
                                            type="number"
                                            className="favorito-cantidad-input"
                                            value={getCantidad(flor.id)}
                                            min="1"
                                            onChange={e => setCantidad(flor.id, e.target.value)}
                                        />
                                        <button className="btn-cantidad" onClick={() => setCantidad(flor.id, getCantidad(flor.id) + 1)}>+</button>
                                    </div>
                                    <button
                                        className="btn-accion btn-principal favorito-btn-carrito"
                                        onClick={() => handleAgregarAlCarrito(flor)}
                                    >
                                        🛒 Añadir
                                    </button>
                                    <button className="favorito-btn-quitar" onClick={() => toggleFavorito(flor)} title="Quitar de favoritos">
                                        🗑
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}