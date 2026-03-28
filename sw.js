// ============================================================================
// QUARTERMASTER COMMAND - SERVICE WORKER
// ============================================================================

const CACHE_NAME = 'qm-cache-v4'; // Bumped version to force a cache update

// The exact paths to all the new modular files
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './manifest.json',
    './js/main.js',
    './js/state/store.js',
    './js/data/data.js',
    './js/data/lang.js',
    './js/core/app.js',
    './js/core/engine.js',
    './js/core/pipeline.js',
    './js/ui/modals.js',
    './js/ui/market_bank.js',
    './js/ui/theme.js',
    './js/network/discord.js'
    // Add any font files or image paths here if you add them later
];

// 1. Install Event: Cache all essential files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// 2. Fetch Event: Serve from cache first, then fall back to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// 3. Activate Event: Clean up old, outdated caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); // Nuke v1 cache
                    }
                })
            );
        })
    );
});