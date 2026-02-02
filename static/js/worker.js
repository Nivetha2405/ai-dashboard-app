const CACHE_NAME = "ai-dashboard-cache-v1";
const urlsToCache = [
  "/",
  "/dashboard",
  "/static/css/style.css",
  "/static/icons/icon-192.png",
  "/static/icons/icon-512.png"
];

// Install event
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event (serve cached content if offline)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // return cached
        }
        return fetch(event.request); // fetch online
      })
  );
});

// Activate event (clean old caches)
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => 
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
