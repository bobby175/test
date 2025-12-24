// ==================== FIREBASE MESSAGING SERVICE WORKER ====================
// Versi khusus untuk Android Chrome

const CACHE_NAME = 'chat-android-v3';
const APP_VERSION = '3.0.0';

// Pre-cache critical assets
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './icon.png',
  'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3'
];

// ==================== INSTALL EVENT ====================
self.addEventListener('install', (event) => {
  console.log('🛠️ Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Caching app shell');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('✅ Pre-caching complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Pre-cache failed:', error);
      })
  );
});

// ==================== ACTIVATE EVENT ====================
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activated');
        
        // Claim clients immediately
        return self.clients.claim();
      })
  );
});

// ==================== FETCH EVENT ====================
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and chrome-extension
  if (event.request.method !== 'GET' || 
      event.request.url.startsWith('chrome-extension://')) {
    return;
  }
  
  // Network-first strategy for API calls
  if (event.request.url.includes('/__/') || 
      event.request.url.includes('firestore.googleapis.com')) {
    event.respondWith(networkFirst(event.request));
    return;
  }
  
  // Cache-first strategy for static assets
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    // Cache the response if valid
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // If both cache and network fail, show offline page
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Update cache
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, networkResponse.clone());
    
    return networkResponse;
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    return cachedResponse || Response.error();
  }
}

// ==================== PUSH NOTIFICATION ====================
self.addEventListener('push', (event) => {
  console.log('📲 Push notification received');
  
  let data = {};
  
  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (e) {
    data = {
      title: '💬 Pesan Baru',
      body: event.data.text() || 'Ada pesan baru di chat',
      icon: 'icon.png'
    };
  }
  
  const options = {
    body: data.body || 'Klik untuk membuka',
    icon: data.icon || 'icon.png',
    badge: 'icon.png',
    tag: data.tag || 'chat-notification',
    vibrate: [200, 100, 200, 100, 200],
    requireInteraction: false,
    data: {
      url: data.url || './',
      timestamp: Date.now(),
      sender: data.sender || 'Unknown'
    },
    actions: [
      {
        action: 'open',
        title: '📲 Buka Chat'
      },
      {
        action: 'close',
        title: '❌ Tutup'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || '💬 Chat', options)
      .then(() => {
        console.log('✅ Notification shown');
      })
      .catch((error) => {
        console.error('❌ Notification failed:', error);
      })
  );
});

// ==================== NOTIFICATION CLICK ====================
self.addEventListener('notificationclick', (event) => {
  console.log('👆 Notification clicked:', event.action);
  
  event.notification.close();
  
  // Handle action buttons
  if (event.action === 'close') {
    return;
  }
  
  // Default action: open/focus the app
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    })
    .then((clientList) => {
      // Check if app is already open
      for (const client of clientList) {
        if (client.url.includes('/') && 'focus' in client) {
          return client.focus();
        }
      }
      
      // If not, open new window
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url || './');
      }
    })
  );
});

// ==================== BACKGROUND SYNC ====================
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync:', event.tag);
  
  if (event.tag === 'send-messages') {
    event.waitUntil(sendPendingMessages());
  }
});

async function sendPendingMessages() {
  console.log('📤 Sending pending messages...');
  // Implement offline message queue here
}

// ==================== PERIODIC SYNC ====================
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-messages') {
    console.log('⏰ Periodic sync for messages');
    event.waitUntil(checkForNewMessages());
  }
});

async function checkForNewMessages() {
  // Implement periodic check for new messages
  console.log('🔍 Checking for new messages...');
}

// ==================== MESSAGE HANDLER ====================
self.addEventListener('message', (event) => {
  console.log('📩 Message received in SW:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, options } = event.data;
    
    event.waitUntil(
      self.registration.showNotification(title, {
        ...options,
        icon: options.icon || 'icon.png',
        badge: 'icon.png',
        vibrate: [200, 100, 200]
      })
    );
  }
});

// ==================== BACKGROUND TASK ====================
// Keep service worker alive
setInterval(() => {
  console.log('❤️ Service Worker heartbeat');
}, 30000); // Every 30 seconds
