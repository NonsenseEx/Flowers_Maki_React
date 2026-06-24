// src/App.jsx
import { useState } from 'react';
import { useApp } from './context/AppContext';

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
    const { carrito, isAdmin, cerrarSesion } = useApp();

    const [modalAbierto, setModalAbierto] = useState(null);
    // modalAbierto puede ser: 'carrito' | 'login' | 'editor' | 'correo' | null

    function handleClickLogin() {
        if (isAdmin) {
            if (window.confirm("Hola Administrador. ¿Deseas cerrar sesión?")) {
                cerrarSesion();
                alert("Has cerrado sesión correctamente.");
            }
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
                id="btn-login-editor"
                className="boton-flotante login-flotante"
                title="Login Editor"
                style={{ background: isAdmin ? '#2c3e50' : 'var(--purple)' }}
                onClick={handleClickLogin}
            >
                <span className="icono-grande">👤</span>
            </div>

            {isAdmin && (
                <div
                    className="boton-flotante agregar-flotante"
                    title="Agregar Nueva Flor"
                    style={{ display: 'flex' }}
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
                <span id="contador-carrito">{carrito.length}</span>
            </div>

            {/* MODALES */}
            {modalAbierto === 'carrito' && <ModalCarrito onCerrar={() => setModalAbierto(null)} />}
            {modalAbierto === 'login'   && <ModalLogin   onCerrar={() => setModalAbierto(null)} />}
            {modalAbierto === 'editor'  && <ModalEditor  onCerrar={() => setModalAbierto(null)} />}
            {modalAbierto === 'correo'  && <ModalCorreo  onCerrar={() => setModalAbierto(null)} />}
        </>
    );
}