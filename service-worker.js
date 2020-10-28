// gérer le cache
const cacheName = 'pwa-data';
const filesToCache =[
	'/pwa-data/',
	'/pwa-data/index.html',
	'/pwa-data/utils/structure.css',
	'/pwa-data/utils/color.css',
	'/pwa-data/utils/debbyPlay.css',
	'/pwa-data/utils/debbyPlay.js',
	'/pwa-data/utils/text.js',
	'/pwa-data/service-launcher.js'
];
// mettre en cache le contenu de l'app
self.addEventListener ('install', function (event){
	event.waitUntil (caches.open (cacheName).then (function (cache){
		return cache.addAll (filesToCache);
}));});
// rendre le contenu de l'app hors-ligne
self.addEventListener ('fetch', function (event){
	event.respondWith (
	caches.match (event.request).then (function (response){
		return response || fetch (event.request);
}));});
