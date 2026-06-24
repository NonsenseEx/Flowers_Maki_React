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
        alert('Mensaje recibido. Estaremos en contacto pronto.');
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
                    <input
                        type="text" name="nombre" value={form.nombre} onChange={handleChange}
                        placeholder="Ej: María González López"
                        required
                    />

                    <label>Teléfono:</label>
                    <input
                        type="tel" name="telefono" value={form.telefono} onChange={handleChange}
                        placeholder="Ej: +56 9 1234 5678"
                        required
                    />

                    <label>Correo Electrónico:</label>
                    <input
                        type="email" name="correo" value={form.correo} onChange={handleChange}
                        placeholder="Ej: maria@correo.cl"
                        required
                    />

                    <label>RUT (Sin puntos):</label>
                    <div className="rut-container">
                        <input
                            type="text" name="rutCuerpo" value={form.rutCuerpo} onChange={handleChange}
                            placeholder="12345678"
                            maxLength="8" required
                        />
                        <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>-</span>
                        <input
                            type="text" name="rutDigito" value={form.rutDigito} onChange={handleChange}
                            placeholder="K"
                            maxLength="1"
                            style={{ width: '50px', textTransform: 'uppercase' }}
                            required
                        />
                    </div>

                    <label>Mensaje:</label>
                    <textarea
                        name="mensaje" rows="4" value={form.mensaje} onChange={handleChange}
                        placeholder="Deja tus comentarios aquí... Cuéntanos tu experiencia, sugerencias o consultas."
                        required
                    />

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