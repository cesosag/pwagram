let deferredPrompt;

if (!window.Promise) {
  window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
		console.log('Service Worker registered!');
	}).catch((err) => {
		console.log(err);
	});
}

window.addEventListener('beforeinstallprompt', (e) => {
	console.log('beforeinstallprompt fired!')
	e.preventDefault();
	deferredPrompt = e;
	return false;
});