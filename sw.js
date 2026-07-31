const CACHE_NAME = "dragon-realm-offline-v5";
const SCOPE_URL = new URL("./", self.location.href).href;
const INDEX_URL = new URL("./index.html", self.location.href).href;
const APP_SHELL = [SCOPE_URL, INDEX_URL];

self.addEventListener("install", event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(APP_SHELL);
        await self.skipWaiting();
    })());
});

self.addEventListener("activate", event => {
    event.waitUntil((async () => {
        const cacheNames = await caches.keys();
        await Promise.all(
            cacheNames
                .filter(cacheName => cacheName.startsWith("dragon-realm-offline-")
                    && cacheName !== CACHE_NAME)
                .map(cacheName => caches.delete(cacheName))
        );
        await self.clients.claim();
    })());
});

self.addEventListener("fetch", event => {
    const request = event.request;
    if (request.method !== "GET" || request.mode !== "navigate") return;

    event.respondWith((async () => {
        try {
            const response = await fetch(request);
            if (response.ok) {
                const cache = await caches.open(CACHE_NAME);
                await Promise.all([
                    cache.put(SCOPE_URL, response.clone()),
                    cache.put(INDEX_URL, response.clone())
                ]);
            }
            return response;
        } catch {
            const cachedResponse = await caches.match(INDEX_URL)
                || await caches.match(SCOPE_URL);
            if (cachedResponse) return cachedResponse;

            return new Response(
                "Dragon Realm is unavailable offline. Open the game online once to prepare its offline cache.",
                {
                    status: 503,
                    headers: { "Content-Type": "text/plain; charset=utf-8" }
                }
            );
        }
    })());
});
