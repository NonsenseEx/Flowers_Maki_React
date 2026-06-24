// src/components/cart/ModalCarrito.jsx
import { useApp } from '../../context/AppContext';

export default function ModalCarrito({ onCerrar }) {
    const { carrito, borrarItemCarrito, vaciarCarrito } = useApp();
    const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);

    function handlePagar() {
        if (carrito.length === 0) { alert("Carrito vacío."); return; }
        if (window.confirm("¿Confirmar pago?")) {
            vaciarCarrito();
            onCerrar();
            alert("¡Gracias por tu compra en Flowers Maki! Estaremos en contacto.");
        }
    }

    function handleVaciar() {
        if (window.confirm("¿Vaciar carrito?")) vaciarCarrito();
    }

    return (
        <div className="modal" style={{ display: 'block' }} onClick={e => e.target === e.currentTarget && onCerrar()}>
            <div className="modal-contenido">
                <span className="cerrar-modal" onClick={onCerrar}>&times;</span>
                <h2>Tu Carrito</h2>
                <div id="items-carrito">
                    {carrito.length === 0 ? (
                        <p style={{ textAlign: 'center', padding: '20px' }}>Tu carrito está vacío.</p>
                    ) : (
                        carrito.map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #eee' }}>
                                <div><b>{item.nombre}</b> x{item.cantidad}</div>
                                <button onClick={() => { if (window.confirm("¿Eliminar este ítem?")) borrarItemCarrito(i); }} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>X</button>
                            </div>
                        ))
                    )}
                </div>
                <div className="modal-footer">
                    <span>Total: ${total.toLocaleString()}</span>
                </div>
                <button className="btn-accion btn-peligro" onClick={handleVaciar}>Vaciar Carrito</button>
                <button className="btn-accion btn-exito" onClick={handlePagar}>Pagar Ahora</button>
            </div>
        </div>
    );
}