// src/components/ui/ModalLogin.jsx
import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function ModalLogin({ onCerrar }) {
    const { verificarLogin } = useApp();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    function handleAcceder() {
        const exito = verificarLogin(usuario, password);
        if (exito) {
            alert("¡Bienvenido, Administrador!");
            onCerrar();
        } else {
            alert("Credenciales incorrectas.");
            onCerrar();
        }
        setUsuario('');
        setPassword('');
    }

    return (
        <div className="modal" style={{ display: 'block' }} onClick={e => e.target === e.currentTarget && onCerrar()}>
            <div className="modal-contenido" style={{ maxWidth: '350px' }}>
                <span className="cerrar-modal" onClick={onCerrar}>&times;</span>
                <h2 style={{ textAlign: 'center' }}>Acceso Editor</h2>
                <div style={{ marginTop: '20px' }}>
                    <label>Usuario:</label>
                    <input type="text" placeholder="Usuario" value={usuario} onChange={e => setUsuario(e.target.value)} />
                    <label>Contraseña:</label>
                    <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="btn-accion btn-principal" onClick={handleAcceder}>Ingresar</button>
                </div>
            </div>
        </div>
    );
}