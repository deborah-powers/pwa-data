const messageAppInstalled = "app installée";
// vérifier si le service-worker est installable
window.onload = function(){
	console.log ('onload');
	'use strict';
	if ('serviceWorker' in navigator) navigator.serviceWorker.register ('./service-worker.js');
}
// rendre mon application installable
var installButton = document.getElementById ('install-pwa');
console.log ('button', installButton);
var deferredPrompt;
window.addEventListener ('beforeinstallprompt', function (event){
	console.log ('beforeinstallprompt');
	// empêcher l'affichage de la popup d'installation
	event.preventDefault();
	deferredPrompt = event;
	if (! deferredPrompt) installButton.innerHTML = messageAppInstalled;
	else installButton.innerHTML = "installez l'application";
});
installButton.addEventListener ('click', function(){
	console.log ('install button');
	if (! deferredPrompt) installButton.innerHTML = messageAppInstalled;
	else{
		deferredPrompt.prompt();
		deferredPrompt.userChoice.then (function (choiceResult){
			if (choiceResult.outcome === 'accepted') installButton.innerHTML = messageAppInstalled;
			else installButton.innerHTML = 'installation ratée';
});}});
// vérifier si l'appli est installée
window.addEventListener ('appinstalled', function (event){
	console.log ('installed');
	var installButton = document.getElementById ('install-pwa');
	installButton.innerHTML = messageAppInstalled;
});
