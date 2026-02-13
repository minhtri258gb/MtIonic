class PWAService {

	// Method
	constructor() {

		this.pwa_deferredPrompt = null;
		this.pwa_isInstallable = false;

		this.geo_watchId = null;
	}
	init() {
		this.pwaRegisterListener();
	}

	// PWA
	pwaRegisterListener() { // Đăng ký nghe các sự kiện PWA
		
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			this.pwa_deferredPrompt = e;
			this.pwa_isInstallable = true;
			
			// Dispatch custom event để các component biết có thể cài đặt
			window.dispatchEvent(new CustomEvent('pwa-installable', {
				detail: { pwa_isInstallable: true }
			}));
		});

		window.addEventListener('appinstalled', () => {
			this.pwa_deferredPrompt = null;
			this.pwa_isInstallable = false;
			
			window.dispatchEvent(new CustomEvent('pwa-installed'));
		});
	}
	async pwaShowInstallPrompt() { // Hiện popup cài đặt PWA
		if (!this.pwa_deferredPrompt)
			throw new Error('Install prompt not available');

		this.pwa_deferredPrompt.prompt();
		const { outcome } = await this.pwa_deferredPrompt.userChoice;
		this.pwa_deferredPrompt = null;
		this.pwa_isInstallable = false;
		
		return outcome === 'accepted';
	}
	pwaIsInstalled() { // Kiểm tra đã cài đặt PWA chưa
		return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
	}
	pwaCanInstall() { // Kiểm tra có thể cài đặt ko
		return this.pwa_isInstallable && !this.isAppInstalled();
	}

	// Internet
	isOnline() { // Kiển tra trạng thái mạng
		return navigator.onLine;
	}

	// Cache
	async getCacheInfo() { // Thông tin Cache
		if ('caches' in window) {
			const cacheNames = await caches.keys();
			const cachesInfo = [];
			
			for (const cacheName of cacheNames) {
				const cache = await caches.open(cacheName);
				const requests = await cache.keys();
				cachesInfo.push({ name: cacheName, size: requests.length });
			}
			
			return cachesInfo;
		}
		return [];
	}
	async clearCache(cacheName) { // Xóa cache
		if ('caches' in window) {
			if (cacheName) {
				await caches.delete(cacheName);
			} else {
				const cacheNames = await caches.keys();
				await Promise.all(cacheNames.map(name => caches.delete(name)));
			}
			return true;
		}
		return false;
	}

	// Camera
	cameraPermission() {

	}
	cameraOpen() {
		
	}

	// Geolocation
	geolocationSupport() {
		return 'geolocation' in navigator;
	}
	async geolocationPermission() {
		if (!this.geolocationSupport())
			throw Error('Trình duyệt không hỗ trợ Geolocation');
		if (!navigator.permissions || !navigator.permissions.query)
			throw Error('Trình duyệt không hỗ trợ Geolocation');

		// Call Native
		return await navigator.permissions.query({ name: 'geolocation' });
	}
	async geolocationGet() {
		if (!this.geolocationSupport())
			throw Error('Trình duyệt không hỗ trợ Geolocation');

		return await new Promise((resolve, reject) => {
			
			// Call Native
			navigator.geolocation.getCurrentPosition(
				(position) => resolve(position),
				(error) => reject(new Error(error.code))
			);
		});
	}
	geolocationWatchStart(callback, options = {}) {
		if (!this.geolocationSupport())
			throw Error('Trình duyệt không hỗ trợ Geolocation');

		options = {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 0,
			...options
		};

		if (this.geo_watchId !== null)
			this.geolocationWatchStop();

		// Call Native
		this.geo_watchId = navigator.geolocation.watchPosition(
			(position) => {
				this.currentPosition = position;
				callback({ success: true, position: this._formatPosition(position) });
			},
			(error) => {
				callback({ success: false, error: this._formatGeolocationError(error) });
			},
			options
		);

		return this.geo_watchId;
	}
	geolocationWatchStop() {
		if (this.geo_watchId !== null) {
			navigator.geolocation.clearWatch(this.geo_watchId);
			this.geo_watchId = null;
		}
	}
	calculateDistance(lat1, lng1, lat2, lng2) { // unit: km
		const R = 6371; // Bán kính Trái Đất (km)
		const dLat = this._deg2rad(lat2 - lat1);
		const dLon = this._deg2rad(lng2 - lng1);
		const a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(this._deg2rad(lat1)) * Math.cos(this._deg2rad(lat2)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		const distance = R * c;
		
		return { value: Math.round(distance * 100) / 100 };
	}
};
export default new PWAService(); // singleton
