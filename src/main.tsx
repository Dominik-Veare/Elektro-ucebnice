import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Automatické obnovení stránky při nasazení nové verze na Vercel (řeší 404 starých JS chunků v mezipaměti prohlížeče)
window.addEventListener('vite:preloadError', (event) => {
  console.warn('Detekována nová verze aplikace na Vercelu, automaticky obnovuji stránku...', event);
  window.location.reload();
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
