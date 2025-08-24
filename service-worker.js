const CACHE_NAME = 'cognitio-auth-v1';
const urlsToCache = [
  '/',
  '/login.html',
  '/register.html',
  '/css/style.css',
  '/js/auth.js',
  '/manifest.json',
  '/assets/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
