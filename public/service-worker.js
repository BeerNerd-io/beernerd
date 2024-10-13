const CACHE_NAME = 'beer-nerd-labs-v1';
const urlsToCache = [
    '/beernerdlabs/',
    '/beernerdlabs/index.html',
    '/beernerdlabs/manifest.json',
    '/beernerdlabs/css/styles.min.css',
    '/beernerdlabs/js/app.min.js',
    '/beernerdlabs/js/tasks.min.js',
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

