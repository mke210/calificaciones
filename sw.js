// Service Worker v11.0 — sin caché, siempre red
const CACHE_VERSION = 'regcalif-v11-0';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Siempre buscar en red, sin caché.
// (Antes, si la red fallaba, intentaba responder con caches.match(), pero
// como esta app nunca guarda nada en caché eso devolvía "undefined" y
// rompía la carga por completo — justo el tipo de falla que se nota más
// en la app instalada, que depende de este archivo para arrancar.)
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});
