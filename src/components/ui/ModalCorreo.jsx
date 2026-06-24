// src/components/ui/ModalCorreo.jsx
export default function ModalCorreo({ onCerrar }) {
    return (
        <div className="modal" style={{ display: 'block' }} onClick={e => e.target === e.currentTarget && onCerrar()}>
            <div className="modal-contenido" style={{ textAlign: 'center' }}>
                <span className="cerrar-modal" onClick={onCerrar}>&times;</span>
                <h3 style={{ color: 'var(--primario)' }}>Correo de Contacto</h3>
                <p style={{ margin: '15px 0' }}>Haz clic en el recuadro para copiar:</p>
                <input
                    type="text"
                    defaultValue="Flowers.maki@consultas.cl"
                    readOnly
                    onClick={e => { e.target.select(); navigator.clipboard.writeText(e.target.value); }}
                    style={{ fontSize: '1.1rem', textAlign: 'center', fontWeight: 'bold', color: 'var(--secundario)', cursor: 'pointer', border: '2px solid var(--acento)', background: '#f9f9f9' }}
                />
                <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '10px' }}>
                    (Texto seleccionado y copiado automáticamente)
                </p>
            </div>
        </div>
    );
}