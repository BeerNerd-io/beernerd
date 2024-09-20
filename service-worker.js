const CACHE_NAME = 'beernerd-cache-v1';
const urlsToCache = [
  './',
  './css/styles.css',
  './css/normalize.css',
  './js/app.js',
  './js/recipe-builder.js',
  './images/logo.svg',
  './index.html',
  './projects/brewing-calculator.html',
  './blog/index.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
