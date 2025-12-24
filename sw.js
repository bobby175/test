// Enhanced Service Worker untuk Mobile
const CACHE_NAME = 'chat-online-v2';
const APP_VERSION = '2.0.0';

// Assets to cache
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './icon.png',
    'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3'
];

// Install Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching app shell');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                console.log('Service Worker: Install completed');
                return self.skipWaiting();
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            console.log('Service Worker: Activate completed');
            return self.clients.claim();
        })
    );
});

// Fetch event - Cache first, then network
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip chrome-extension requests
    if (event.request.url.startsWith('chrome-extension://')) return;
    
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // Return cached version if available
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                // Otherwise fetch from network
                return fetch(event.request)
                    .then(response => {
                        // Don't cache if not a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone the response
                        const responseToCache = response.clone();
                        
                        // Cache the new response
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    });
            })
    );
});

// ==================== NOTIFICATION HANDLERS ====================

// Handle push notifications
self.addEventListener('push', event => {
    console.log('Service Worker: Push received');
    
    if (!event.data) return;
    
    let data = {};
    try {
        data = event.data.json();
    } catch (e) {
        data = {
            title: 'Chat Online',
            body: event.data.text() || 'Pesan baru',
            icon: 'icon.png'
        };
    }
    
    const options = {
        body: data.body || 'Ada pesan baru di chat',
        icon: data.icon || 'icon.png',
        badge: 'icon.png',
        tag: 'chat-notification',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/',
            timestamp: Date.now()
        },
        actions: [
            {
                action: 'open',
                title: 'Buka Chat'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title || '💬 Chat Online', options)
    );
});

// Handle notification click
self.addEventListener('notificationclick', event => {
    console.log('Service Worker: Notification clicked');
    
    event.notification.close();
    
    const urlToOpen = event.notification.data?.url || '/';
    
    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        })
        .then(clientList => {
            // Check if there's already a window/tab open with the target URL
            for (const client of clientList) {
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            
            // If not, open a new window/tab
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});

// Handle messages from the main app
self.addEventListener('message', event => {
    console.log('Service Worker: Message received', event.data);
    
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const { title, options } = event.data.notification;
        
        event.waitUntil(
            self.registration.showNotification(title, {
                ...options,
                icon: options.icon || 'icon.png',
                badge: 'icon.png'
            })
        );
    }
});

// Handle background sync (future use)
self.addEventListener('sync', event => {
    console.log('Service Worker: Background sync', event.tag);
    
    if (event.tag === 'send-message') {
        event.waitUntil(sendPendingMessages());
    }
});

// Function to send pending messages (for offline support)
async function sendPendingMessages() {
    // Implement offline message queue here
    console.log('Sending pending messages...');
}

// Handle periodic sync (for background updates)
self.addEventListener('periodicsync', event => {
    if (event.tag === 'update-chat') {
        console.log('Periodic sync for chat updates');
        // Implement periodic updates here
    }
});

// ==================== BACKGROUND TASKS ====================

// Check for updates every hour
self.addEventListener('message', event => {
    if (event.data === 'CHECK_FOR_UPDATES') {
        checkForAppUpdates();
    }
});

async function checkForAppUpdates() {
    try {
        const response = await fetch('./?v=' + Date.now());
        if (!response.ok) return;
        
        const cache = await caches.open(CACHE_NAME);
        await cache.put('./', response);
        
        // Notify all clients about update
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'APP_UPDATED',
                version: APP_VERSION
            });
        });
    } catch (error) {
        console.log('Update check failed:', error);
    }
}

// Clean up old notifications
setInterval(() => {
    self.registration.getNotifications()
        .then(notifications => {
            const now = Date.now();
            notifications.forEach(notification => {
                const timestamp = notification.data?.timestamp;
                if (timestamp && (now - timestamp > 24 * 60 * 60 * 1000)) {
                    notification.close();
                }
            });
        });
}, 60 * 60 * 1000); // Check every hour
