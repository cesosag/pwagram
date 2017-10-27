self.addEventListener('install', (e) => {
	console.log('[Service Worker] Installing Service Worker...', e);
	e.waitUntil(caches.open('static').then((cache) => {
		console.log('[SW] Precaching app shell...');
		cache.addAll([
			'/',
			'/index.html',
			'/src/js/app.js',
			'/src/js/feed.js',
			'/src/js/promise.js',
			'/src/js/fetch.js',
			'/src/js/material.min.js',
			'/src/css/app.css',
			'/src/css/feed.css',
			'/src/images/main-image.jpg',
			'https://fonts.googleapis.com/css?family=Roboto:400,700',
			'https://fonts.googleapis.com/icon?family=Material+Icons',
			'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
		]);
	}));
});

self.addEventListener('activate', (e) => {
	console.log('[Service Worker] Activating Service Worker...', e);
	return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
	e.respondWith(caches.match(e.request).then((res) => {
		if (res) {
			return res;
		}
		else {
			return fetch(e.request);
		}
	}));
});