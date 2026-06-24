// src/components/ui/Catalogo.jsx
import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import FlowerCard from './FlowerCard';
import BuscadorCatalogo from './BuscadorCatalogo';

export default function Catalogo() {
    const { catalogo } = useApp();
    const [busqueda, setBusqueda] = useState('');
    const [categoria, setCategoria] = useState('Todas');

    const floresFiltradas = useMemo(() => {
        return catalogo.filter(flor => {
            const coincideBusqueda = flor.nombre.toLowerCase().includes(busqueda.toLowerCase());
            const coincideCategoria = categoria === 'Todas' || flor.nombre === categoria;
            return coincideBusqueda && coincideCategoria;
        });
    }, [catalogo, busqueda, categoria]);

    return (
        <section id="catalogo" className="seccion-principal">
            <h2 className="titulo-seccion">Nuestras Flores</h2>

            <BuscadorCatalogo
                busqueda={busqueda}
                onBusqueda={setBusqueda}
                categoriaActiva={categoria}
                onCategoria={setCategoria}
            />

            {floresFiltradas.length === 0 ? (
                <div className="catalogo-vacio">
                    <p>🌸 No encontramos flores con ese nombre.</p>
                    <button className="btn-accion btn-principal" onClick={() => { setBusqueda(''); setCategoria('Todas'); }}>
                        Ver todo el catálogo
                    </button>
                </div>
            ) : (
                <div className="grid-3-columnas catalogo-grid">
                    {floresFiltradas.map(flor => (
                        <FlowerCard key={flor.id} flor={flor} />
                    ))}
                </div>
            )}
        </section>
    );
}