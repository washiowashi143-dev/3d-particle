const CACHE = 'nvs-editor-v1';
const ASSETS = [
  '/3d-particle/',
  '/3d-particle/index.html',
  '/3d-particle/manifest.json',
  '/3d-particle/icon-192.png',
  '/3d-particle/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/3d-particle/index.html')))
  );
});
