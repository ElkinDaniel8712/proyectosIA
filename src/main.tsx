import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent harmless Vite HMR WebSocket connection logs from raising overlays in sandbox environment
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event?.reason;
    const message = typeof reason === 'string' ? reason : (reason?.message || reason?.stack || '');
    if (message.toLowerCase().includes('websocket') || message.toLowerCase().includes('vite')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
  window.addEventListener('error', (event) => {
    const message = event?.message || '';
    if (message.toLowerCase().includes('websocket') || message.toLowerCase().includes('vite')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

