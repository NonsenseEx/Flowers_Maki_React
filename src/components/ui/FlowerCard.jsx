// src/components/ui/FlowerCard.jsx
import { useCart } from '../../context/CartContext';
import { useFavoritos } from '../../context/FavoritosContext';

export default function FlowerCard({ flor }) {
    const { agregarAlCarrito, carrito } = useCart();
    const { toggleFavorito, esFavorito } = useFavoritos();

    const sinStock = flor.stock === 0;
    const itemEnCarrito = carrito.find(i => i.id === flor.id);
    const stockAgotadoPorCarrito = itemEnCarrito && itemEnCarrito.cantidad >= flor.stock;
    const deshabilitado = sinStock || stockAgotadoPorCarrito;

    return (
        <div className={`item-flor ${sinStock ? 'item-flor--agotado' : ''}`}>
            {!sinStock && flor.stock <= 5 && (
                <span className="badge-stock-bajo">¡Últimas {flor.stock}!</span>
            )}

            {/* Botón favorito — el toast lo maneja el context, no llamar agregarToast aquí */}
            <button
                className={`btn-favorito ${esFavorito(flor.id) ? 'btn-favorito--activo' : ''}`}
                onClick={() => toggleFavorito(flor)}
                title="Guardar en favoritos"
            >
                {esFavorito(flor.id) ? '❤️' : '🤍'}
            </button>

            <div className="marco-foto">
                <img src={flor.img} alt={flor.nombre} />
                {sinStock && <div className="overlay-agotado">AGOTADO</div>}
            </div>

            <h3>{flor.nombre}</h3>
            <p className="precio-flor">${flor.precio.toLocaleString()} c/u</p>
            <p className="descripcion-flor">{flor.descripcion}</p>

            <div className="stock-info">
                {sinStock
                    ? <span className="stock-cero">Sin stock disponible</span>
                    : <span className="stock-disponible">Stock: {flor.stock} unidades</span>
                }
            </div>

            {/* El toast lo maneja agregarAlCarrito internamente, no llamar agregarToast aquí */}
            <button
                className={`btn-accion ${deshabilitado ? 'btn-agotado' : 'btn-principal'}`}
                onClick={() => agregarAlCarrito(flor)}
                disabled={deshabilitado}
            >
                {sinStock ? '🚫 Agotado' : stockAgotadoPorCarrito ? '✓ Máximo agregado' : '🛒 Añadir al carrito'}
            </button>
        </div>
    );
}