
// Service Worker for PWA functionality
const CACHE_NAME = 'traffic-tn-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/tn-police-logo-192.png',
  '/tn-police-logo-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

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
