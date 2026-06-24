// src/components/ui/Contacto.jsx
import { useState } from 'react';
import wsp from '../../assets/images/wsp_logo.png';
import ig from '../../assets/images/ig_logo.jpg';

export default function Contacto({ onAbrirModalCorreo }) {
    const [form, setForm] = useState({
        nombre: '', telefono: '', correo: '', rutCuerpo: '', rutDigito: '', mensaje: ''
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        alert("Mensaje recibido. Estaremos en contacto pronto.");
        setForm({ nombre: '', telefono: '', correo: '', rutCuerpo: '', rutDigito: '', mensaje: '' });
    }

    return (
        <section id="contacto" className="seccion-principal">
            <h2 className="titulo-seccion">Buzón de Sugerencias</h2>
            <div className="contenedor-formulario">
                <h3>Contáctanos</h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
                    Déjanos tus datos y te contactaremos a la brevedad.
                </p>
                <form onSubmit={handleSubmit}>
                    <label>Nombre Completo:</label>
                    <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />

                    <label>Teléfono:</label>
                    <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} required />

                    <label>Correo Electrónico:</label>
                    <input type="email" name="correo" value={form.correo} onChange={handleChange} required />

                    <label>RUT (Sin puntos):</label>
                    <div className="rut-container">
                        <input type="text" name="rutCuerpo" placeholder="12345678" maxLength="8" value={form.rutCuerpo} onChange={handleChange} required />
                        <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>-</span>
                        <input type="text" name="rutDigito" placeholder="K" maxLength="1" style={{ width: '50px', textTransform: 'uppercase' }} value={form.rutDigito} onChange={handleChange} required />
                    </div>

                    <label>Mensaje:</label>
                    <textarea name="mensaje" rows="4" value={form.mensaje} onChange={handleChange} required />

                    <button type="submit" className="btn-accion btn-principal">Enviar Mensaje</button>
                </form>
            </div>

            <div className="contacto-final">
                <h3 className="titulo-seccion">¡Encuéntranos!</h3>
                <div className="marcos-redes">
                    <a href="https://web.whatsapp.com/" target="_blank" rel="noreferrer" className="marco-red-circular">
                        <img src={wsp} alt="WhatsApp" className="img-red-social" />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="marco-red-circular">
                        <img src={ig} alt="Instagram" className="img-red-social" />
                    </a>
                    <div className="marco-red-circular" title="Clic para copiar correo" onClick={onAbrirModalCorreo} style={{ cursor: 'pointer' }}>
                        <span className="icono-correo">📧</span>
                    </div>
                </div>
            </div>
        </section>
    );
}