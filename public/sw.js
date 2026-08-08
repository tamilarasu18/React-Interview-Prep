/*
 * Service worker for React Interview Questions.
 *
 * The site is a static export, so there is no server to negotiate freshness
 * with. The strategy follows from what each kind of response actually is:
 *
 *   /_next/static/*  content-hashed, so a given URL never changes  -> cache first
 *   HTML documents   change on every deploy                        -> network first
 *   other assets     icons, svg, images                            -> stale while revalidate
 *
 * Anything never visited and unreachable falls back to /offline/.
 *
 * Bump CACHE_VERSION to evict every cache left over from a previous deploy.
 */

const CACHE_VERSION = 'v1';
const SHELL_CACHE = `riq-shell-${CACHE_VERSION}`;
const ASSET_CACHE = `riq-assets-${CACHE_VERSION}`;
const PAGE_CACHE = `riq-pages-${CACHE_VERSION}`;

const CURRENT_CACHES = [SHELL_CACHE, ASSET_CACHE, PAGE_CACHE];

const OFFLINE_URL = '/offline/';

/*
 * Deliberately small. Precaching all 229 question pages would cost megabytes
 * for pages most people never open, so only the entry points are seeded here
 * and everything else is cached as it is actually visited.
 */
const SHELL_URLS = [
  '/',
  OFFLINE_URL,
  '/manifest.json',
  '/react-icon.svg',
  '/icon-192.png',
  '/icon-512.png',
];

const STATIC_ASSET_PATTERN = /\.(?:css|js|svg|png|jpg|jpeg|gif|webp|avif|ico|woff2?|ttf|otf)$/i;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      // Individually, so one 404 cannot fail the whole install the way
      // cache.addAll() would.
      Promise.all(SHELL_URLS.map((url) => cache.add(url).catch(() => undefined)))
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => name.startsWith('riq-') && !CURRENT_CACHES.includes(name))
          .map((name) => caches.delete(name))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  // Analytics, fonts, extensions: never our business, straight to the network.
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, ASSET_CACHE));
    return;
  }

  if (STATIC_ASSET_PATTERN.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request, ASSET_CACHE));
  }
});

// Lets a future "update available" prompt activate the waiting worker.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

/*
 * HTML: always try the network so a new deploy is picked up immediately,
 * keeping a copy so the page still opens offline next time.
 */
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(PAGE_CACHE);
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;

    const offline = await caches.match(OFFLINE_URL);
    if (offline) return offline;

    return Response.error();
  }
}

// Safe only for immutable URLs — a hashed filename means new content, new URL.
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(cacheName);
    await cache.put(request, response.clone());
  }
  return response;
}

// Serve what we have straight away, refresh it in the background for next time.
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networked = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);

  return cached || networked;
}
