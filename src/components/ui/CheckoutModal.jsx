// src/components/ui/CheckoutModal.jsx
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

const PASOS = ['Datos', 'Pago', 'Confirmación'];

export default function CheckoutModal({ onCerrar }) {
    const { carrito, totalCarrito, vaciarCarrito } = useCart();
    const { agregarToast } = useToast();
    const [paso, setPaso] = useState(0);
    const [cargando, setCargando] = useState(false);
    const [form, setForm] = useState({ nombre: '', email: '', telefono: '', tarjeta: '', vencimiento: '', cvv: '' });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSiguiente() {
        if (paso === 0 && (!form.nombre || !form.email || !form.telefono)) {
            agregarToast({ mensaje: 'Por favor completa todos los datos', tipo: 'warning', icono: '⚠️' });
            return;
        }
        if (paso === 1 && (!form.tarjeta || !form.vencimiento || !form.cvv)) {
            agregarToast({ mensaje: 'Por favor completa los datos de pago', tipo: 'warning', icono: '⚠️' });
            return;
        }
        setPaso(p => p + 1);
    }

    async function handlePagar() {
        setCargando(true);
        // Simulamos procesamiento de 2 segundos
        await new Promise(r => setTimeout(r, 2000));
        setCargando(false);
        vaciarCarrito();
        agregarToast({ mensaje: '¡Compra realizada con éxito! 🌸', tipo: 'success', icono: '✅' });
        onCerrar();
    }

    return (
        <div className="modal" style={{ display: 'block' }} onClick={e => e.target === e.currentTarget && onCerrar()}>
            <div className="modal-contenido checkout-modal">
                <span className="cerrar-modal" onClick={onCerrar}>×</span>
                <h2 className="checkout-titulo">Finalizar Compra</h2>

                {/* Barra de pasos */}
                <div className="checkout-pasos">
                    {PASOS.map((nombre, i) => (
                        <div key={i} className={`checkout-paso ${i <= paso ? 'checkout-paso--activo' : ''}`}>
                            <div className="checkout-paso-num">{i < paso ? '✓' : i + 1}</div>
                            <span>{nombre}</span>
                        </div>
                    ))}
                </div>

                {/* Paso 0: Datos personales */}
                {paso === 0 && (
                    <div className="checkout-seccion">
                        <h3>Tus datos de contacto</h3>
                        <label>Nombre completo</label>
                        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="María González" />
                        <label>Correo electrónico</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="maria@ejemplo.cl" />
                        <label>Teléfono</label>
                        <input name="telefono" type="tel" value={form.telefono} onChange={handleChange} placeholder="+56 9 1234 5678" />
                        <button className="btn-accion btn-principal" onClick={handleSiguiente}>Continuar →</button>
                    </div>
                )}

                {/* Paso 1: Pago */}
                {paso === 1 && (
                    <div className="checkout-seccion">
                        <h3>Datos de pago</h3>
                        <div className="tarjeta-simulada">
                            <span>💳</span>
                            <span>{form.tarjeta || '•••• •••• •••• ••••'}</span>
                        </div>
                        <label>Número de tarjeta</label>
                        <input name="tarjeta" value={form.tarjeta} onChange={handleChange} placeholder="1234 5678 9012 3456" maxLength={19} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div style={{ flex: 1 }}>
                                <label>Vencimiento</label>
                                <input name="vencimiento" value={form.vencimiento} onChange={handleChange} placeholder="MM/AA" maxLength={5} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label>CVV</label>
                                <input name="cvv" type="password" value={form.cvv} onChange={handleChange} placeholder="•••" maxLength={3} />
                            </div>
                        </div>

                        {/* Resumen del pedido */}
                        <div className="checkout-resumen">
                            <h4>Resumen del pedido</h4>
                            {carrito.map((item, i) => (
                                <div key={i} className="checkout-resumen-item">
                                    <span>{item.nombre} × {item.cantidad}</span>
                                    <span>${item.subtotal.toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="checkout-resumen-total">
                                <strong>Total</strong>
                                <strong>${totalCarrito.toLocaleString()}</strong>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn-accion btn-principal" style={{ flex: 1 }} onClick={() => setPaso(0)}>← Volver</button>
                            <button className="btn-accion btn-exito" style={{ flex: 2 }} onClick={handleSiguiente}>Revisar pedido →</button>
                        </div>
                    </div>
                )}

                {/* Paso 2: Confirmación */}
                {paso === 2 && (
                    <div className="checkout-seccion" style={{ textAlign: 'center' }}>
                        <div className="checkout-confirmacion-icono">🌸</div>
                        <h3>¡Todo listo!</h3>
                        <p>Pedido para <strong>{form.nombre}</strong></p>
                        <p>Confirmación a <strong>{form.email}</strong></p>
                        <div className="checkout-resumen">
                            {carrito.map((item, i) => (
                                <div key={i} className="checkout-resumen-item">
                                    <span>{item.nombre} × {item.cantidad}</span>
                                    <span>${item.subtotal.toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="checkout-resumen-total">
                                <strong>Total a pagar</strong>
                                <strong>${totalCarrito.toLocaleString()}</strong>
                            </div>
                        </div>

                        {cargando ? (
                            <div className="checkout-cargando">
                                <div className="spinner"></div>
                                <p>Procesando tu pago...</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="btn-accion btn-principal" style={{ flex: 1 }} onClick={() => setPaso(1)}>← Volver</button>
                                <button className="btn-accion btn-exito" style={{ flex: 2 }} onClick={handlePagar}>✅ Confirmar y Pagar</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}