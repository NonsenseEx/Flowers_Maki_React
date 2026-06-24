// src/components/ui/ModalEditor.jsx
import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const formVacio = { nombre: '', precio: '', stock: 10, descripcion: '', img: 'img/florNueva.webp' };

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
        setForm({
            nombre: flor.nombre,
            precio: flor.precio,
            stock: flor.stock ?? 0,
            descripcion: flor.descripcion,
            img: flor.img,
        });
    }

    function handleGuardar() {
        const { nombre, precio, stock, descripcion, img } = form;
        if (!nombre || !precio || !descripcion) {
            alert('Por favor completa todos los campos.');
            return;
        }
        const accion = editId ? 'editar' : 'agregar';
        if (!window.confirm(`¿Estás seguro de que deseas ${accion} esta flor?`)) return;

        const datos = { nombre, precio: parseInt(precio), stock: parseInt(stock) || 0, descripcion, img };

        if (editId) {
            editarFlor(editId, datos);
            alert('Cambios guardados exitosamente.');
            setEditId(null);
            setForm(formVacio);
            setTitulo('Agregar Nueva Flor');
        } else {
            agregarFlor(datos);
            alert('Flor agregada al catálogo exitosamente.');
            onCerrar();
        }
    }

    function handleEliminar(id) {
        if (!window.confirm('¿Seguro que deseas eliminar esta flor?')) return;
        eliminarFlor(id);
        alert('Flor eliminada del catálogo.');
    }

    return (
        <div className="modal" style={{ display: 'block' }} onClick={e => e.target === e.currentTarget && onCerrar()}>
            <div className="modal-contenido modal-grande">
                <span className="cerrar-modal" onClick={onCerrar}>×</span>
                <h2 style={{ textAlign: 'center', color: 'var(--primario)' }}>Gestión de Catálogo</h2>

                <div className="editor-formulario">
                    <h3>{titulo}</h3>

                    <label>Nombre de la Flor:</label>
                    <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Lavanda" />

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <label>Precio ($):</label>
                            <input type="number" name="precio" value={form.precio} onChange={handleChange} placeholder="Ej: 2500" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Stock (unidades):</label>
                            <input type="number" name="stock" value={form.stock} onChange={handleChange} min="0" placeholder="Ej: 10" />
                        </div>
                    </div>

                    <label>Descripción:</label>
                    <textarea name="descripcion" rows="3" value={form.descripcion} onChange={handleChange} placeholder="Describe la flor..." />

                    <label>Ruta de imagen (ej: img/flor.webp):</label>
                    <input type="text" name="img" value={form.img} onChange={handleChange} />

                    <button className="btn-accion btn-exito" onClick={handleGuardar}>
                        {editId ? '💾 Guardar cambios' : '➕ Agregar al catálogo'}
                    </button>
                    {editId && (
                        <button className="btn-accion btn-peligro" style={{ marginTop: 6 }} onClick={() => { setEditId(null); setForm(formVacio); setTitulo('Agregar Nueva Flor'); }}>
                            Cancelar edición
                        </button>
                    )}
                </div>

                <hr style={{ margin: '20px 0', border: 0, borderTop: '1px solid #ddd' }} />

                <h3>Flores Existentes</h3>
                <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
                    {catalogo.map(flor => (
                        <div key={flor.id} className="editor-item">
                            <div>
                                <span style={{ fontWeight: 'bold' }}>{flor.nombre}</span>
                                <span style={{ fontSize: '0.78rem', color: '#888', marginLeft: 8 }}>
                                    ${flor.precio.toLocaleString()} · Stock: {flor.stock ?? 0}
                                </span>
                            </div>
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