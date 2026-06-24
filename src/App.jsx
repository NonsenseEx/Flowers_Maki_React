// src/App.jsx
import { useState } from 'react';
import { useApp } from './context/AppContext';
import { useCart } from './context/CartContext';

import Header from './components/layout/Header';
import Hero from './components/layout/Hero';
import Catalogo from './components/ui/Catalogo';
import FormularioPedido from './components/ui/FormularioPedido';
import Contacto from './components/ui/Contacto';
import ModalCarrito from './components/cart/ModalCarrito';
import ModalLogin from './components/ui/ModalLogin';
import ModalEditor from './components/ui/ModalEditor';
import ModalCorreo from './components/ui/ModalCorreo';

export default function App() {
    const { isAdmin, cerrarSesion } = useApp();
    const { cantidadTotal } = useCart();
    const [modalAbierto, setModalAbierto] = useState(null);

    function handleClickLogin() {
        if (isAdmin) {
            if (window.confirm('Hola Administrador. ¿Deseas cerrar sesión?')) cerrarSesion();
        } else {
            setModalAbierto('login');
        }
    }

    return (
        <>
            <Header />
            <Hero />
            <Catalogo />
            <FormularioPedido />
            <Contacto onAbrirModalCorreo={() => setModalAbierto('correo')} />

            {/* BOTONES FLOTANTES */}
            <div
                className="boton-flotante login-flotante"
                title={isAdmin ? 'Cerrar sesión' : 'Login Editor'}
                style={{ background: isAdmin ? '#2c3e50' : 'var(--purple)' }}
                onClick={handleClickLogin}
            >
                <span className="icono-grande">👤</span>
            </div>

            {isAdmin && (
                <div
                    className="boton-flotante agregar-flotante"
                    style={{ display: 'flex' }}
                    title="Gestionar catálogo"
                    onClick={() => setModalAbierto('editor')}
                >
                    <span className="icono-grande">➕</span>
                </div>
            )}

            <div
                className="boton-flotante carrito-flotante"
                onClick={() => setModalAbierto('carrito')}
            >
                <span className="icono-grande">🛒</span>
                {cantidadTotal > 0 && (
                    <span id="contador-carrito">{cantidadTotal}</span>
                )}
            </div>

            {/* MODALES */}
            {modalAbierto === 'carrito' && <ModalCarrito onCerrar={() => setModalAbierto(null)} />}
            {modalAbierto === 'login'   && <ModalLogin   onCerrar={() => setModalAbierto(null)} />}
            {modalAbierto === 'editor'  && <ModalEditor  onCerrar={() => setModalAbierto(null)} />}
            {modalAbierto === 'correo'  && <ModalCorreo  onCerrar={() => setModalAbierto(null)} />}
        </>
    );
}