// src/components/layout/Header.jsx
import logo from '../../assets/images/Logo_flowers_maki.png';
import { useFavoritos } from '../../context/FavoritosContext';

export default function Header({ onAbrirFavoritos }) {
    const { favoritos } = useFavoritos();

    return (
        <header>
            <div className="titulo-contenedor">
                <div className="marco-logo-circular">
                    <img src={logo} alt="Logo" className="logo-header" />
                </div>
                <h1>Flowers Maki</h1>
            </div>
            <nav className="navbar">
                <ul>
                    <li><a href="#catalogo">Catálogo</a></li>
                    <li className="menu-nosotros">
                        <a href="#nosotros">Sobre Nosotros</a>
                        <div className="desplegable-nosotros">
                            <p>En el corazón de Maipú, nació un sueño llamado Flowers Maki. No somos solo una florería; somos curadores de momentos y mensajeros de emociones que florecen directamente en nuestra querida comuna de Maipú.</p>
                        </div>
                    </li>
                    <li><a href="#pedido">Hacer Pedido</a></li>
                    <li>
                        <a 
                            href="#favoritos"
                            className="nav-favoritos"
                            onClick={e => { e.preventDefault(); onAbrirFavoritos(); }}
                        >
                            ❤️ Favoritos
                            {favoritos.length > 0 && (
                                <span className="nav-favoritos-badge">{favoritos.length}</span>
                            )}
                        </a>
                    </li>
                    
                    <li><a href="#contacto">Contacto</a></li>
                </ul>
            </nav>
        </header>
    );
}