// src/data/products.js
// Importamos cada imagen para que Vite gestione las rutas correctamente
import img1 from '../assets/images/1_astromelia.jpg';
import img2 from '../assets/images/2_rosas.webp';
import img3 from '../assets/images/3_girasol.jpg';
import img4 from '../assets/images/4_tulipanes.webp';
import img5 from '../assets/images/5_azucena.jpeg';
import img6 from '../assets/images/6_clavel.webp';
import img7 from '../assets/images/7_peonia.png';
import img8 from '../assets/images/8_lisianthus.webp';
import img9 from '../assets/images/9_gerberas.webp';
import img10 from '../assets/images/10_hortensias.webp';

export const catalogoInicial = [
    { id: 1, nombre: "Astromelia",  precio: 1000, descripcion: "Conocida como el símbolo del afecto duradero, esta flor destaca por sus pétalos jaspeados y una paleta de colores vibrantes que llenan de energía cualquier rincón. Es la elección perfecta para celebrar la amistad y la lealtad.", img: img1 },
    { id: 2, nombre: "Rosas",       precio: 2500, descripcion: "La reina indiscutible de la elegancia. Nuestras rosas se caracterizan por sus botones grandes, firmes y una fragancia sutil que evoca romance y sofisticación clásica. Un gesto atemporal que nunca falla.", img: img2 },
    { id: 3, nombre: "Girasol",     precio: 1500, descripcion: "Luz y alegría. Con sus imponentes pétalos amarillos que buscan siempre el sol, el girasol es ideal para desear éxito, vitalidad y felicidad a esa persona especial.", img: img3 },
    { id: 4, nombre: "Tulipán",     precio: 4000, descripcion: "La máxima expresión de la distinción moderna. De tallos esbeltos y formas orgánicas perfectas, los tulipanes aportan un aire fresco y minimalista a la decoración, siendo emblema de la elegancia sencilla.", img: img4 },
    { id: 5, nombre: "Azucena",     precio: 3000, descripcion: "Majestuosa y profundamente aromática. Sus grandes flores en forma de trompeta representan la pureza y la sofisticación. Su fragancia envolvente es capaz de transformar la atmósfera de todo tu hogar.", img: img5 },
    { id: 6, nombre: "Clavel",      precio: 1200, descripcion: "Encanto en cada textura. Con sus bordes rizados y una resistencia excepcional, los claveles son flores fascinantes que simbolizan la fascinación y el amor profundo en composiciones llenas de volumen.", img: img6 },
    { id: 7, nombre: "Peonía",      precio: 1800, descripcion: "La joya de la temporada. Famosa por sus múltiples capas de pétalos sedosos que se abren de forma dramática, la peonía es la favorita para momentos de lujo, romance y abundancia.", img: img7 },
    { id: 8, nombre: "Lisianthus",  precio: 3500, descripcion: "Delicadeza que cautiva. Aunque parece frágil como la seda, el lisianthus es sorprendentemente duradero. Sus flores, que recuerdan a pequeñas rosas silvestres, aportan un toque campestre y romántico único.", img: img8 },
    { id: 9, nombre: "Gerbera",     precio: 2800, descripcion: "Simplemente irresistible y divertida. Con su forma perfecta de margarita gigante y colores saturados, la gerbera es la flor ideal para enviar un mensaje de ánimo, optimismo y frescura instantánea.", img: img9 },
    { id: 10, nombre: "Hortensia",  precio: 4500, descripcion: "Un generoso festín visual. Sus densas nubes de flores crean una sensación de opulencia y frescura natural. Son perfectas para añadir volumen y un aire de jardín clásico a tus espacios preferidos.", img: img10 },
];