# 🌸 Flowers Maki — React App

Aplicación web de una florería artesanal ubicada en Maipú, Chile. Migrada desde HTML/CSS/JS Vanilla a un stack moderno con **React + Vite**, con sistema de carrito, favoritos, notificaciones, panel de administración y checkout simulado.

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18+ | Framework UI |
| Vite | 5+ | Bundler y dev server |
| JavaScript (ES6+) | — | Lógica de la app |
| CSS Variables | — | Diseño y theming |
| localStorage | — | Persistencia de datos |

---

## 📁 Estructura del Proyecto

```
Flowers_Maki_React/
├── public/
├── src/
│   ├── assets/
│   │   └── images/                  # Todas las imágenes del proyecto
│   │       ├── 1_astromelia.jpg
│   │       ├── 2_rosas.webp
│   │       ├── 3_girasol.jpg
│   │       ├── 4_tulipanes.webp
│   │       ├── 5_azucena.jpeg
│   │       ├── 6_clavel.webp
│   │       ├── 7_peonia.png
│   │       ├── 8_lisianthus.webp
│   │       ├── 9_gerberas.webp
│   │       ├── 10_hortensias.webp
│   │       ├── flores_portada.webp
│   │       ├── fondoSeamless_1.webp
│   │       ├── Logo_flowers_maki.png
│   │       ├── wsp_logo.png
│   │       └── ig_logo.jpg
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx           # Navbar con pestaña Favoritos y badge
│   │   │   └── Hero.jsx             # Banner principal con imagen de portada
│   │   ├── ui/
│   │   │   ├── Catalogo.jsx         # Grid de flores con buscador y filtros
│   │   │   ├── FlowerCard.jsx       # Tarjeta de producto con stock y favoritos
│   │   │   ├── BuscadorCatalogo.jsx # Input de búsqueda + botones de categoría
│   │   │   ├── FormularioPedido.jsx # Formulario de pedido manual
│   │   │   ├── Contacto.jsx         # Buzón de sugerencias + redes sociales
│   │   │   ├── ModalLogin.jsx       # Login para panel de administración
│   │   │   ├── ModalEditor.jsx      # CRUD de catálogo (solo admin)
│   │   │   ├── ModalFavoritos.jsx   # Lista de flores favoritas con cantidades
│   │   │   ├── ModalCorreo.jsx      # Modal para copiar correo de contacto
│   │   │   └── CheckoutModal.jsx    # Checkout en 3 pasos con spinner
│   │   └── cart/
│   │       └── ModalCarrito.jsx     # Carrito con controles +/- y resumen
│   │
│   ├── context/
│   │   ├── AppContext.jsx           # Catálogo global + lógica de login admin
│   │   ├── CartContext.jsx          # Estado del carrito + totales en tiempo real
│   │   ├── FavoritosContext.jsx     # Favoritos persistidos en localStorage
│   │   └── ToastContext.jsx         # Sistema global de notificaciones toast
│   │
│   ├── data/
│   │   └── products.js              # Catálogo inicial con imágenes importadas
│   │
│   ├── styles/
│   │   └── global.css               # Estilos globales (migrados desde CSS original)
│   │
│   ├── App.jsx                      # Componente raíz, maneja modales y botones flotantes
│   └── main.jsx                     # Entry point con árbol de Providers
│
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Instalación y Uso

```bash
# 1. Clona o descarga el proyecto
cd Flowers_Maki_React

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev

# 4. Abre en el navegador
# http://localhost:5173
```

### Build para producción

```bash
npm run build
npm run preview
```

---

## ✨ Funcionalidades

### 🛒 Carrito de Compras
- Agrega flores desde las tarjetas del catálogo o desde el formulario de pedido manual.
- Controles `+` y `−` para ajustar cantidades por ítem.
- Cálculo del total en tiempo real.
- Persiste en `localStorage` al recargar la página.
- Botón para vaciar todo el carrito.

### ✅ Checkout Simulado (3 pasos)
1. **Datos personales** — nombre, email y teléfono.
2. **Pago** — número de tarjeta, vencimiento y CVV con visualización de tarjeta simulada.
3. **Confirmación** — resumen del pedido y botón de pago con spinner de carga de 2 segundos.
- Al confirmar: limpia el carrito y muestra toast de éxito.

### ❤️ Favoritos
- Botón de corazón en cada tarjeta de flor.
- Guardados en `localStorage` (persisten al cerrar el navegador).
- Accesibles desde la pestaña **Favoritos** en la navbar (muestra badge con cantidad).
- Modal de favoritos permite elegir cantidad y añadir directamente al carrito.

### 🔍 Buscador y Filtros
- Campo de búsqueda en vivo que filtra el catálogo mientras el usuario escribe.
- Botones de categoría por nombre de flor (Rosas, Tulipanes, etc.).
- Botón para limpiar la búsqueda y volver al catálogo completo.

### 📦 Control de Stock
- Cada tarjeta muestra las unidades disponibles.
- Badge naranja de advertencia cuando quedan 5 unidades o menos.
- Al llegar a 0: tarjeta atenuada, overlay "AGOTADO" y botón deshabilitado.
- Valida que no se agreguen al carrito más unidades de las disponibles.

### 🔔 Sistema de Toasts
- Notificaciones flotantes con animación de entrada.
- Tipos: `success` (verde), `warning` (naranja), `danger` (rojo).
- Se disparan al: iniciar sesión, agregar al carrito, marcar favorito, stock agotado.
- Deduplicación automática para evitar notificaciones repetidas.

### 👤 Panel de Administración
- Login con credenciales fijas (hardcoded por requerimiento del proyecto).
- Acceso mediante el botón flotante 👤 en la esquina inferior izquierda.
- Al iniciar sesión aparece el botón ➕ para abrir el editor de catálogo.
- El editor permite **agregar, editar y eliminar** flores, incluyendo nombre, precio, stock, descripción e imagen.

### 📬 Buzón de Sugerencias
- Formulario de contacto con validación de campos requeridos.
- Campos: nombre, teléfono, correo, RUT (cuerpo + dígito verificador) y mensaje.
- Modal para copiar el correo de contacto al portapapeles con un clic.

---

## 🗂️ Contextos (State Management)

El proyecto usa **Context API** de React sin librerías externas de estado:

| Contexto | Responsabilidad |
|---|---|
| `ToastContext` | Proveedor base. Gestiona y renderiza las notificaciones. Debe ir primero en el árbol. |
| `AppContext` | Catálogo de flores (con persistencia) y autenticación de administrador. |
| `CartContext` | Items del carrito, totales, agregar/restar/eliminar. Consume `ToastContext`. |
| `FavoritosContext` | Lista de flores favoritas con persistencia. Consume `ToastContext`. |

### Orden de los Providers en `main.jsx`

```jsx
<ToastProvider>        ← Primero: los demás lo consumen
  <AppProvider>
    <CartProvider>
      <FavoritosProvider>
        <App />
      </FavoritosProvider>
    </CartProvider>
  </AppProvider>
</ToastProvider>
```

---

## 🔐 Credenciales de Administrador

> Las credenciales están hardcoded por requerimiento del proyecto original.

| Campo | Valor |
|---|---|
| Usuario | `flowersmaki` |
| Contraseña | `fm1635` |

---

## 🎨 Variables de Color (CSS)

Definidas en `:root` dentro de `global.css`:

```css
--primario:    #1B3022   /* Verde oscuro principal */
--secundario:  #4F6D7A   /* Azul grisáceo */
--fondo-crema: #f7dec6   /* Fondo cálido */
--acento:      #8E6E5E   /* Café rojizo */
--cafe-oscuro: #5D4037   /* Café para botón carrito */
--exito:       #27ae60   /* Verde para confirmaciones */
--peligro:     #c0392b   /* Rojo para eliminar */
--purple:      #8e44ad   /* Morado para botón login */
```

---

## 📌 Notas de Desarrollo

- El catálogo editado por el administrador se guarda en `localStorage` bajo la clave `catalogoData`. Para restaurar el catálogo original, limpiar esa clave desde DevTools > Application > Local Storage.
- El fondo seamless usa `fondoSeamless_1.webp` con opacidad del 82% mediante `linear-gradient` superpuesto.
- Las imágenes de las flores se importan directamente en `products.js` para que Vite las procese y genere las rutas correctas en producción.
- El proyecto **no usa React Router**: la navegación entre secciones es por scroll con anclas (`href="#catalogo"`).

---

## 🚀 Posibles Mejoras Futuras

- Conectar a un backend real (Node.js + Express o Firebase) para persistencia de datos en servidor.
- Implementar React Router para rutas dedicadas por sección.
- Agregar autenticación segura (JWT) en lugar de credenciales hardcoded.
- Integrar pasarela de pago real (Transbank, MercadoPago).
- Añadir sistema de reseñas por flor.
- Soporte multilenguaje (i18n).

---

*Proyecto desarrollado como ejercicio de aprendizaje de React — Flowers Maki, Maipú, Chile* 🌸
