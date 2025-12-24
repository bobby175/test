// Service Worker untuk Chat Online
const CACHE_NAME = 'chat-online-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './icon.png'
];

// Install Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Aktifkan Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch dari cache jika offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Handle push notifications (untuk future use)
self.addEventListener('push', event => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body || 'Ada pesan baru di chat',
        icon: 'icon.png',
        badge: 'icon.png',
        tag: 'chat-notification',
        vibrate: [100, 50, 100],
        data: {
            url: data.url || '/',
            timestamp: Date.now()
        },
        actions: [
            {
                action: 'open',
                title: 'Buka Chat'
            },
            {
                action: 'close',
                title: 'Tutup'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title || '💬 Chat Online', options)
    );
});

// Handle notification click
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'close') {
        return;
    }
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(clientList => {
                // Fokus ke window yang sudah terbuka jika ada
                for (const client of clientList) {
                    if (client.url.includes('/') && 'focus' in client) {
                        return client.focus();
                    }
                }
                // Buka window baru jika tidak ada
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
    );
});
