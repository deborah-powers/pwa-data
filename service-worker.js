// gérer le cache
const cacheName = 'pwa-data';
const filesToCache =[
	'/pwa-data/index.html',
	'/pwa-data/service-launcher.js',
	'/pwa-data/idb-code.js',
	'/pwa-data/utils/text.js',
	'/pwa-data/utils/debbyPlay.js',
	'/pwa-data/utils/debbyPlay.css',
	'/pwa-data/utils/structure.css',
	'/pwa-data/utils/color.css'
];
// mettre en cache le contenu de l'app
self.addEventListener ('install', function (event){
	console.log ('in cache');
	event.waitUntil (caches.open (cacheName).then (function (cache){
		return cache.addAll (filesToCache);
}));});
// rendre le contenu de l'app hors-ligne
self.addEventListener ('fetch', function (event){
	console.log ('out cache');
	event.respondWith (
	caches.match (event.request).then (function (response){
		return response || fetch (event.request);
}));});
