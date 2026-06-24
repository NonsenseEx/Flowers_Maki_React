// src/components/ui/FormularioPedido.jsx
import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function FormularioPedido() {
    const { catalogo, agregarAlCarrito } = useApp();
    const [florSeleccionada, setFlorSeleccionada] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const [listaTemporal, setListaTemporal] = useState([]);

    const total = listaTemporal.reduce((acc, item) => acc + item.subtotal, 0);

    function handleAgregarLista() {
        if (!florSeleccionada) {
            alert("Por favor, selecciona una flor del catálogo.");
            return;
        }
        const flor = catalogo.find(f => f.id === parseInt(florSeleccionada));
        const nuevoItem = {
            nombre: flor.nombre,
            cantidad: parseInt(cantidad),
            precio: flor.precio,
            subtotal: flor.precio * parseInt(cantidad),
        };
        setListaTemporal([...listaTemporal, nuevoItem]);
    }

    function handleConfirmarCarrito() {
        if (listaTemporal.length === 0) {
            alert("Aún no has agregado flores.");
            return;
        }
        agregarAlCarrito(listaTemporal);
        setListaTemporal([]);
        alert("¡Pedido agregado! Revisa el carrito (ícono inferior derecha).");
    }

    return (
        <section id="pedido" className="seccion-principal seccion-fondo-claro">
            <h2 className="titulo-seccion">Realizar Pedido</h2>
            <div className="contenedor-formulario">
                <label>Selecciona Flor:</label>
                <select
                    value={florSeleccionada}
                    onChange={e => setFlorSeleccionada(e.target.value)}
                >
                    <option value="">-- Selecciona --</option>
                    {catalogo.map(flor => (
                        <option key={flor.id} value={flor.id}>
                            {flor.nombre} (${flor.precio.toLocaleString()})
                        </option>
                    ))}
                </select>

                <label>Cantidad:</label>
                <input
                    type="number"
                    value={cantidad}
                    min="1"
                    onChange={e => setCantidad(e.target.value)}
                />

                <button className="btn-accion btn-principal" onClick={handleAgregarLista}>
                    Agregar a la Lista
                </button>

                <div className="area-lista-previa">
                    <h4>Tu selección actual:</h4>
                    <ul id="lista-previa">
                        {listaTemporal.map((item, i) => (
                            <li key={i}>
                                <span>{item.nombre} x{item.cantidad}</span>
                                <span>${item.subtotal.toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="total-texto">
                        Total Selección: <span>${total.toLocaleString()}</span>
                    </p>
                    <button className="btn-accion btn-exito" onClick={handleConfirmarCarrito}>
                        Confirmar y Enviar al Carrito
                    </button>
                </div>
            </div>
        </section>
    );
}