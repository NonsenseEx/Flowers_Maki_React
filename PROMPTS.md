# 📋 Prompts Utilizados — Flowers Maki React

Registro completo de los prompts empleados durante el desarrollo y migración del proyecto **Flowers Maki** de HTML/CSS/JS Vanilla a React + Vite.

---

## Prompt 1 — Migración base a React

**Contexto:** Se adjuntaron los archivos `Estructura_Flower.html`, `style.css` y `script.js` del proyecto original, junto con una captura de los archivos de imagen disponibles.

```
Necesito tu ayuda para migrar por completo un proyecto web de una florería
llamado "Flowers Maki" a un formato moderno en React.
El código original está escrito en desarrollo web clásico (HTML, CSS y JavaScript Vanilla).
Para realizar esta migración, te voy a adjuntar a continuación 3 archivos de texto
con el código base completo del proyecto original:
1. El archivo HTML con la estructura y maquetación.
2. El archivo CSS con todos los estilos de diseño.
3. El archivo JS con la lógica interactiva y el manejo de un sistema de login.

REQUERIMIENTOS DE LA MIGRACIÓN:

1. PRESERVAR EL DISEÑO Y LAS IMÁGENES:
El diseño visual, colores y la responsividad del proyecto original de Flowers Maki
deben mantenerse exactamente iguales. Indícame en qué parte de mi nueva estructura
debo guardar los archivos de imagen existentes y cómo debo importarlos/referenciarlos
en el código JSX manteniendo sus nombres originales para que no se rompan las rutas.

2. CREDENCIALES DE INGRESO EN JAVASCRIPT:
El archivo JS original que te voy a subir maneja un sistema de login con credenciales
de usuario específicas que están escritas directamente en el código (hardcoded).
Es un requisito obligatorio mantener estas credenciales y su lógica de validación
exactamente como están, pero adaptadas al flujo de estados de React (por ejemplo,
usando hooks como useState para controlar el acceso del formulario).

3. ESTRUCTURA DEL PROYECTO DESTINO:
Ya he inicializado el entorno con Node.js y Vite, y cuento con la siguiente estructura
exacta de carpetas en mi computadora:

Flowers_Maki_React/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   └── cart/
│   ├── context/
│   ├── data/
│   │   └── products.js
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
└── vite.config.js

Como estoy aprendiendo React desde cero, por favor guíame con un paso a paso muy claro:
dime en qué archivos o carpetas exactas de esta estructura debo crear o reemplazar los
códigos, cómo estructurar los nuevos componentes JSX a partir de mi HTML original, y
facilítame los bloques de código listos para copiar y pegar.

Por favor, lee con atención los 3 archivos que te voy a subir en el siguiente mensaje
para que puedas procesar la lógica antes de generar la estructura de React.
```

**Archivos adjuntos:** `Estructura_Flower.html`, `style.css`, `script.js`, captura de carpeta `img/`

**Resultado:** Migración completa de la app a React con los siguientes archivos generados:
- `src/data/products.js`
- `src/context/AppContext.jsx`
- `src/components/layout/Header.jsx` y `Hero.jsx`
- `src/components/ui/FlowerCard.jsx`, `Catalogo.jsx`, `FormularioPedido.jsx`, `Contacto.jsx`
- `src/components/ui/ModalLogin.jsx`, `ModalEditor.jsx`, `ModalCarrito.jsx`, `ModalCorreo.jsx`
- `src/App.jsx`, `src/main.jsx`, `index.html`

---

## Prompt 2 — Upgrade UX avanzado con Context API y nuevas funcionalidades

**Contexto:** Con la migración base funcionando, se solicitó llevar el proyecto al siguiente nivel de experiencia de usuario.

```
Ahora que tenemos la base migrada a React, quiero que llevemos el proyecto
"Flowers Maki" al siguiente nivel de experiencia de usuario (UX) y diseño visual.
Necesito que modifiques e implementes las siguientes funciones y componentes avanzados
utilizando hooks de React, Context API y React-Bootstrap para embellecer y potenciar
el trabajo:

1. SISTEMA DE TOASTS (NOTIFICACIONES FLOTANTES):
- Implementa un sistema de feedback visual inmediato (Toasts).
- Debe saltar una notificación elegante en la esquina de la pantalla cada vez que:
  * El usuario inicie sesión correctamente (o falle).
  * Se agregue un producto al carrito.
  * Un producto se guarde en favoritos.
  * Se intente agregar un producto sin stock.

2. CARRITO INTERACTIVO CON CONTEXT API (CartContext):
- Creemos el archivo src/context/CartContext.jsx para manejar el estado global.
- Toda la lógica de añadir, restar cantidad, eliminar flores del carrito y calcular
  el precio TOTAL en tiempo real debe estar centralizada aquí.
- En la interfaz del carrito, añade un desglose visual limpio y moderno.

3. SIMULADOR DE CHECKOUT CON MODAL ANIMADO:
- Al hacer clic en "Confirmar Compra" en el carrito, no quiero un alert simple.
  Muestra un Modal interactivo de Bootstrap (CheckoutModal.jsx) que simule un
  formulario de pago.
- Al procesar el pago, muestra una animación de carga corta, limpia el carrito
  automáticamente y lanza un Toast de "¡Compra realizada con éxito!".

4. FAVORITOS PERSISTIDOS CON localStorage:
- Crea un hook personalizado o lógica en la página de favoritos para que, cuando el
  usuario marque el corazón de una flor, esta se guarde en el almacenamiento local
  del navegador (localStorage).
- Si el usuario recarga la página o cierra el navegador, sus favoritos deben seguir
  ahí guardados.

5. FILTRADO DINÁMICO Y BUSCADOR EN VIVO:
- En la página del catálogo, el buscador de texto y los botones de categorías
  (Rosas, Girasoles, Tulipanes, etc.) deben filtrar las tarjetas de productos (Cards)
  al instante mientras el usuario escribe, con transiciones suaves.

6. VALIDACIÓN DE STOCK EN TIEMPO REAL:
- Las tarjetas de los productos deben leer la cantidad de stock disponible.
  Si el stock llega a 0, el botón de "Añadir al carrito" debe deshabilitarse
  automáticamente, cambiar su texto a "Agotado" y atenuar la opacidad de la tarjeta.

Por favor, dime exactamente qué archivos debo modificar (como App.jsx, Catalog.jsx o
Cart.jsx) y qué componentes nuevos debo crear en mi estructura para integrar estas
funciones de forma limpia y ordenada.
```

**Resultado:** Creación e integración de:
- `src/context/ToastContext.jsx` — sistema de notificaciones global
- `src/context/CartContext.jsx` — carrito con Context API
- `src/context/FavoritosContext.jsx` — favoritos con localStorage
- `src/components/ui/CheckoutModal.jsx` — checkout de 3 pasos con spinner
- `src/components/ui/BuscadorCatalogo.jsx` — buscador + filtros por categoría
- Rediseño de `FlowerCard.jsx` con stock, favoritos y badges
- Actualización de `main.jsx` con árbol de Providers
- Bloque de CSS nuevo añadido a `global.css`

---

## Prompt 3 — Corrección de errores y mejoras de UX

**Contexto:** Tras implementar el Prompt 2, se detectaron errores funcionales y se solicitaron mejoras adicionales.

```
Considerando lo realizado hasta ahora, detalles:

ERRORES:
- El botón de confirmar y enviar pedido no está funcionando.
- Al clickear para comprar una flor o para marcarla de favoritos el toast sale duplicado.
- La página original contaba con un fondo seamless con la imagen "fondoSeamless_1"
  en la carpeta images, ahora ese fondo no está. Además el fondo seamless tenía una
  opacidad reducida para que se mezclara con el fondo.

MEJORAS:
- El stock de cada flor debe poder ser modificable por el administrador en la
  pestaña de edición.
- Modifica la estética del carrito para que tenga un diseño con colores semejantes
  y con forma de lista para que sea más atractivo y ordenado a la vista.
- Agrega una pestaña de favoritos para las flores elegidas en la navbar la cual al
  clickearla de una ventana pop up con las flores favoritas elegidas y de la opción
  de agregarlas al carrito en la cantidad que desee el usuario.
- En el buzón de sugerencias agrega placeholders para que la gente sepa qué tiene
  que escribir en cada campo, en la ventana "Mensaje" por ejemplo deja un
  "Deja tus comentarios aquí".
```

**Resultado:** Correcciones y mejoras en:
- `ToastContext.jsx` — deduplicación de toasts con chequeo por mensaje
- `CartContext.jsx` — nueva función `agregarListaAlCarrito()` para el formulario
- `FavoritosContext.jsx` — toast disparado con `setTimeout` para evitar duplicados
- `FormularioPedido.jsx` — usa `agregarListaAlCarrito`, botón confirmar funcional
- `FlowerCard.jsx` — eliminadas llamadas redundantes al toast
- `ModalEditor.jsx` — campo de stock editable con layout en columnas
- `ModalCarrito.jsx` — rediseño estilo lista con imagen, controles +/- y colores cálidos
- `ModalFavoritos.jsx` — **nuevo**, popup con flores favoritas, selector de cantidad y botón añadir al carrito
- `Header.jsx` — pestaña Favoritos con badge contador en la navbar
- `Contacto.jsx` — placeholders descriptivos en todos los campos del formulario
- `App.jsx` — integración del modal de favoritos
- `global.css` — fondo seamless restaurado con opacidad 82%, estilos del carrito rediseñado y estilos de favoritos

---

## Prompt 4 — Generación de documentación

```
Considerando lo realizado hasta ahora hazme un archivo readme y otro con
los prompts utilizados.
```

**Resultado:** Generación de los dos archivos de documentación:
- `README.md` — documentación técnica del proyecto
- `PROMPTS.md` — este archivo

---

## 📊 Resumen de archivos generados/modificados por prompt

| Archivo | Prompt 1 | Prompt 2 | Prompt 3 | Prompt 4 |
|---|:---:|:---:|:---:|:---:|
| `src/data/products.js` | ✅ Creado | 🔄 Stock añadido | — | — |
| `src/context/AppContext.jsx` | ✅ Creado | 🔄 Integra Toast | — | — |
| `src/context/CartContext.jsx` | — | ✅ Creado | 🔄 `agregarListaAlCarrito` | — |
| `src/context/FavoritosContext.jsx` | — | ✅ Creado | 🔄 Fix toast duplicado | — |
| `src/context/ToastContext.jsx` | — | ✅ Creado | 🔄 Deduplicación | — |
| `src/components/layout/Header.jsx` | ✅ Creado | — | 🔄 Tab Favoritos | 🔄 Fix error JSX |
| `src/components/layout/Hero.jsx` | ✅ Creado | — | — | — |
| `src/components/ui/FlowerCard.jsx` | ✅ Creado | 🔄 Stock/Favoritos | 🔄 Fix toast | — |
| `src/components/ui/Catalogo.jsx` | ✅ Creado | 🔄 Buscador | — | — |
| `src/components/ui/BuscadorCatalogo.jsx` | — | ✅ Creado | — | — |
| `src/components/ui/FormularioPedido.jsx` | ✅ Creado | — | 🔄 Fix botón | — |
| `src/components/ui/Contacto.jsx` | ✅ Creado | — | 🔄 Placeholders | — |
| `src/components/ui/ModalLogin.jsx` | ✅ Creado | — | — | — |
| `src/components/ui/ModalEditor.jsx` | ✅ Creado | — | 🔄 Campo stock | — |
| `src/components/ui/ModalFavoritos.jsx` | — | — | ✅ Creado | — |
| `src/components/ui/ModalCorreo.jsx` | ✅ Creado | — | — | — |
| `src/components/ui/CheckoutModal.jsx` | — | ✅ Creado | — | — |
| `src/components/cart/ModalCarrito.jsx` | ✅ Creado | 🔄 Rediseño | 🔄 Estilo lista | — |
| `src/App.jsx` | ✅ Creado | 🔄 Contexts | 🔄 ModalFavoritos | — |
| `src/main.jsx` | ✅ Creado | 🔄 Providers | — | — |
| `src/styles/global.css` | ✅ (CSS original) | 🔄 Nuevos estilos | 🔄 Fondo seamless | — |
| `index.html` | ✅ Creado | — | — | — |

**Leyenda:** ✅ Creado desde cero · 🔄 Modificado · — Sin cambios
