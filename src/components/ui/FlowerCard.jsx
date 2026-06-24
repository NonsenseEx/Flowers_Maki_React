// src/components/ui/FlowerCard.jsx
export default function FlowerCard({ flor }) {
    return (
        <div className="item-flor">
            <div className="marco-foto">
                <img src={flor.img} alt={flor.nombre} />
            </div>
            <h3>{flor.nombre}</h3>
            <p>${flor.precio.toLocaleString()} c/u</p>
            <p className="descripcion-flor">Descripción: {flor.descripcion}</p>
        </div>
    );
}