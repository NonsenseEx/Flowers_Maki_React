// src/components/ui/BuscadorCatalogo.jsx

const CATEGORIAS = ['Todas', 'Astromelia', 'Rosas', 'Girasol', 'Tulipán', 'Azucena', 'Clavel', 'Peonía', 'Lisianthus', 'Gerbera', 'Hortensia'];

export default function BuscadorCatalogo({ busqueda, onBusqueda, categoriaActiva, onCategoria }) {
    return (
        <div className="buscador-wrapper">
            <div className="buscador-input-wrap">
                <span className="buscador-icono">🔍</span>
                <input
                    type="text"
                    className="buscador-input"
                    placeholder="Buscar flor por nombre..."
                    value={busqueda}
                    onChange={e => onBusqueda(e.target.value)}
                />
                {busqueda && (
                    <button className="buscador-limpiar" onClick={() => onBusqueda('')}>×</button>
                )}
            </div>
            <div className="categorias-wrap">
                {CATEGORIAS.map(cat => (
                    <button
                        key={cat}
                        className={`btn-categoria ${categoriaActiva === cat ? 'btn-categoria--activo' : ''}`}
                        onClick={() => onCategoria(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}