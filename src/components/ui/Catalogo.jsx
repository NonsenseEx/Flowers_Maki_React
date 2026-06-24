// src/components/ui/Catalogo.jsx
import { useApp } from '../../context/AppContext';
import FlowerCard from './FlowerCard';

export default function Catalogo() {
    const { catalogo } = useApp();

    return (
        <section id="catalogo" className="seccion-principal">
            <h2 className="titulo-seccion">Nuestras Flores</h2>
            <div className="grid-3-columnas">
                {catalogo.map(flor => (
                    <FlowerCard key={flor.id} flor={flor} />
                ))}
            </div>
        </section>
    );
}