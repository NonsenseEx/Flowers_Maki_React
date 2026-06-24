// src/components/ui/FormularioPedido.jsx
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useCart } from '../../context/CartContext';

export default function FormularioPedido() {
    const { catalogo } = useApp();
    const { agregarListaAlCarrito } = useCart();
    const [florSeleccionada, setFlorSeleccionada] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const [listaTemporal, setListaTemporal] = useState([]);

    const total = listaTemporal.reduce((acc, item) => acc + item.subtotal, 0);

    function handleAgregarLista() {
        if (!florSeleccionada) {
            alert('Por favor, selecciona una flor del catálogo.');
            return;
        }
        const flor = catalogo.find(f => f.id === parseInt(florSeleccionada));
        if (!flor) return;
        const nuevoItem = {
            nombre: flor.nombre,
            img: flor.img,
            cantidad: parseInt(cantidad),
            precio: flor.precio,
            subtotal: flor.precio * parseInt(cantidad),
        };
        setListaTemporal(prev => [...prev, nuevoItem]);
        setCantidad(1);
    }

    function handleConfirmarCarrito() {
        if (listaTemporal.length === 0) {
            alert('Aún no has agregado flores.');
            return;
        }
        agregarListaAlCarrito(listaTemporal); // ← usa la función correcta
        setListaTemporal([]);
        setFlorSeleccionada('');
    }

    return (
        <section id="pedido" className="seccion-principal seccion-fondo-claro">
            <h2 className="titulo-seccion">Realizar Pedido</h2>
            <div className="contenedor-formulario">
                <label>Selecciona Flor:</label>
                <select value={florSeleccionada} onChange={e => setFlorSeleccionada(e.target.value)}>
                    <option value="">-- Selecciona --</option>
                    {catalogo.map(flor => (
                        <option key={flor.id} value={flor.id}>
                            {flor.nombre} (${flor.precio.toLocaleString()})
                        </option>
                    ))}
                </select>

                <label>Cantidad:</label>
                <input type="number" value={cantidad} min="1" onChange={e => setCantidad(e.target.value)} />

                <button className="btn-accion btn-principal" onClick={handleAgregarLista}>
                    Agregar a la Lista
                </button>

                <div className="area-lista-previa">
                    <h4>Tu selección actual:</h4>
                    <ul id="lista-previa">
                        {listaTemporal.map((item, i) => (
                            <li key={i}>
                                <span>{item.nombre} ×{item.cantidad}</span>
                                <span>${item.subtotal.toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="total-texto">Total Selección: <span>${total.toLocaleString()}</span></p>
                    <button className="btn-accion btn-exito" onClick={handleConfirmarCarrito}>
                        Confirmar y Enviar al Carrito
                    </button>
                </div>
            </div>
        </section>
    );
}