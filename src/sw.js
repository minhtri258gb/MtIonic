import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

// Nghe sự kiện thông báo
self.addEventListener('push', (event) => {

	console.log('[sw.push]', event);

	if (event.data) {
		const data = event.data.json();
		
		const options = {
			body: data.body,
			icon: '/icon-192x192.png',
			badge: '/badge-72x72.png',
			vibrate: [100, 50, 100],
			data: {
				url: data.url || '/'
			}
		};

		event.waitUntil(
			self.registration.showNotification(data.title, options)
		);
	}
});

// Xử lý khi click vào thông báo
self.addEventListener('notificationclick', (event) => {
	
	console.log('[sw.notificationclick]', event);

	event.notification.close();
	event.waitUntil(
		clients.openWindow(event.notification.data.url)
	);
});