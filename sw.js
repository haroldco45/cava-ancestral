// Cava Ancestral — Service Worker · Desarrollada por Vibras Positivas HM
const C = 'cava-ancestral-v2';
const FILES = ['./', 'index.html', 'manifest.json', 'img/logo.jpg', 'img/icon-192.png', 'img/icon-512.png',
  'img/sabana-toro.jpg', 'img/siduri-lulo.jpg', 'img/siduri-mora-cafe.jpg', 'img/contra-corriente.jpg', 'img/sabana-toro-mini.jpg', 'img/og-image.jpg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))));
  self.clients.claim();
});
// Red primero (para ver cambios), caché si no hay señal
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; })
    .catch(() => caches.match(e.request)));
});
