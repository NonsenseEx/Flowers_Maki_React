// src/components/layout/Hero.jsx
import heroImg from '../../assets/images/flores_portada.webp';

export default function Hero() {
    return (
        <section
            id="inicio"
            className="hero-section"
            style={{ backgroundImage: `url(${heroImg})` }}
        >
            <div className="hero-overlay">
                <div className="hero-texto-caja">
                    <h2>Arreglos Florales Naturales</h2>
                    <p>Hacemos de tus momentos especiales algo inolvidable.</p>
                </div>
            </div>
        </section>
    );
}