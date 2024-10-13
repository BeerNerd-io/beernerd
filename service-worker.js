const CACHE_NAME = 'beer-nerd-labs-v1';
const urlsToCache = [
    '/',
    '/css/styles.min.css',
    '/js/app.min.js',
    '/images/beernerdgarage.png',
    '/images/black.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.endsWith('index.html') || event.request.url.endsWith('/')) {
        // Network-first strategy for index.html
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(event.request))
        );
    } else {
        // Cache-first strategy for other resources
        event.respondWith(
            caches.match(event.request)
                .then((response) => response || fetch(event.request))
        );
    }
});

// TODO: Add logic for updating cache and handling offline mode




