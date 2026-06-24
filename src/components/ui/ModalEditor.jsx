// src/components/ui/ModalEditor.jsx
import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const formVacio = { nombre: '', precio: '', descripcion: '', img: 'img/florNueva.webp' };

export default function ModalEditor({ onCerrar }) {
    const { catalogo, agregarFlor, editarFlor, eliminarFlor } = useApp();
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(formVacio);
    const [titulo, setTitulo] = useState('Agregar Nueva Flor');

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleEditar(flor) {
        setEditId(flor.id);
        setTitulo('Editar Flor');
        setForm({ nombre: flor.nombre, precio: flor.precio, descripcion: flor.descripcion, img: flor.img });
    }

    function handleGuardar() {
        const { nombre, precio, descripcion, img } = form;
        if (!nombre || !precio || !descripcion) { alert("Por favor completa todos los campos."); return; }
        const accion = editId ? "editar" : "agregar";
        if (!window.confirm(`¿Estás seguro de que deseas ${accion} esta flor?`)) return;

        if (editId) {
            editarFlor(editId, { nombre, precio: parseInt(precio), descripcion, img });
            alert("Cambios guardados exitosamente.");
        } else {
            agregarFlor({ nombre, precio: parseInt(precio), descripcion, img });
            alert("Flor agregada al catálogo exitosamente.");
            onCerrar();
        }
        setEditId(null);
        setForm(formVacio);
        setTitulo('Agregar Nueva Flor');
    }

    function handleEliminar(id) {
        if (!window.confirm("¿Seguro que deseas eliminar esta flor del catálogo?")) return;
        eliminarFlor(id);
        alert("Flor eliminada del catálogo.");
    }

    return (
        <div className="modal" style={{ display: 'block' }} onClick={e => e.target === e.currentTarget && onCerrar()}>
            <div className="modal-contenido modal-grande">
                <span className="cerrar-modal" onClick={onCerrar}>&times;</span>
                <h2 style={{ textAlign: 'center', color: 'var(--primario)' }}>Gestión de Catálogo</h2>

                <div className="editor-formulario">
                    <h3>{titulo}</h3>
                    <label>Nombre de la Flor:</label>
                    <input type="text" name="nombre" value={form.nombre} onChange={handleChange} />
                    <label>Precio:</label>
                    <input type="number" name="precio" value={form.precio} onChange={handleChange} />
                    <label>Descripción:</label>
                    <textarea name="descripcion" rows="3" value={form.descripcion} onChange={handleChange} />
                    <label>Nombre de Imagen (ej: img/flor1.webp):</label>
                    <input type="text" name="img" value={form.img} onChange={handleChange} />
                    <button className="btn-accion btn-exito" onClick={handleGuardar}>Guardar en Catálogo</button>
                </div>

                <hr style={{ margin: '20px 0', border: 0, borderTop: '1px solid #ddd' }} />

                <h3>Flores Existentes</h3>
                <div id="lista-editor-flores" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {catalogo.map(flor => (
                        <div key={flor.id} className="editor-item">
                            <span>{flor.nombre}</span>
                            <div>
                                <button className="btn-editar" onClick={() => handleEditar(flor)}>Editar</button>
                                <button className="btn-eliminar" onClick={() => handleEliminar(flor.id)}>Borrar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}