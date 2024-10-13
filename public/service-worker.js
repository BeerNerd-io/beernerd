const CACHE_NAME = 'beer-nerd-labs-v1';
const urlsToCache = [
    '/beernerd/',
    '/beernerd/index.html',
    '/beernerd/manifest.json',
    '/beernerd/css/styles.min.css',
    '/beernerd/js/app.min.js',
    '/beernerd/js/tasks.min.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});

// TODO: Add logic for updating cache and handling offline mode

