const CACHE_NAME = 'mahjong-table-v1';
const urlsToCache = [
  '/mahjong-table-assigner/',
  '/mahjong-table-assigner/index.html',
  '/mahjong-table-assigner/manifest.json',
  '/mahjong-table-assigner/assets/icon-192.png',
  '/mahjong-table-assigner/assets/icon-512.png',
  '/mahjong-table-assigner/assets/wind-east.png',
  '/mahjong-table-assigner/assets/wind-south.png',
  '/mahjong-table-assigner/assets/wind-west.png',
  '/mahjong-table-assigner/assets/wind-north.png',
  '/mahjong-table-assigner/assets/dragon-haku.png'
];

// Install event - cache all needed files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
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
    })
  );
});