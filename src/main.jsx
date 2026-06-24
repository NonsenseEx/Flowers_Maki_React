// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastProvider } from './context/ToastContext';
import { AppProvider } from './context/AppContext';
import { CartProvider } from './context/CartContext';
import { FavoritosProvider } from './context/FavoritosContext';
import './styles/global.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ToastProvider>
            <AppProvider>
                <CartProvider>
                    <FavoritosProvider>
                        <App />
                    </FavoritosProvider>
                </CartProvider>
            </AppProvider>
        </ToastProvider>
    </StrictMode>
);