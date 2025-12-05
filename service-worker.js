const CACHE_NAME = 'manna-temple-v1.0.1';
const RUNTIME_CACHE = 'manna-temple-runtime';

// Assets to cache on install
const PRECACHE_ASSETS = [
    '/index.html',
    '/css/app_style.css',
    '/js/activitiez-v2.js',
    '/js/footerz.js',
    '/js/side-menuz.js',
    '/js/splash-screen.js',
    '/js/modern-player.js',
    '/js/audio-visualizer.js',
    '/js/radio-player.js',
    '/js/theme-manager.js',
    '/images/icon.png',
    '/images/5.jpeg'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        // For streaming audio/video, always fetch from network
        if (request.url.includes('zeno.fm') || request.url.includes('youtube.com')) {
            return;
        }
    }

    event.respondWith(
        caches.match(request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return caches.open(RUNTIME_CACHE).then(cache => {
                return fetch(request).then(response => {
                    // Only cache successful responses
                    if (response.status === 200) {
                        // Don't cache POST requests or streaming media
                        if (request.method === 'GET' &&
                            !request.url.includes('zeno.fm') &&
                            !request.url.includes('youtube.com')) {
                            cache.put(request, response.clone());
                        }
                    }
                    return response;
                }).catch(() => {
                    // Return offline page if available
                    if (request.destination === 'document') {
                        return caches.match('/index.html');
                    }
                });
            });
        })
    );
});

// Background sync for prayer requests
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-prayer-requests') {
        event.waitUntil(syncPrayerRequests());
    }
});

async function syncPrayerRequests() {
    // Get pending prayer requests from IndexedDB
    // Send them to the server when back online
    console.log('Syncing prayer requests...');
}

// Push notification handler
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New notification from Manna Temple',
        icon: '/images/icon.png',
        badge: '/images/icon.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'open',
                title: 'Open App'
            },
            {
                action: 'close',
                title: 'Close'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Manna Temple', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'open') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
