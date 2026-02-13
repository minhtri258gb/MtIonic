import apiService from '/src/services/api.service';
import pwaService from '/src/services/pwa.service';

class DevPage extends HTMLElement {

	h_debug = true;
	e_inPassword = null; // Input password
	e_btnLogin = null; // Button Login
	e_btnNotifySubscribe = null; // Button Notify Subscribe

	// Forward
	connectedCallback() {
		this.innerHTML = this.buildHTML();
		this.initUI();
	}
	disconnectedCallback() {

	}
	attributeChangedCallback(name, oldValue, newValue) {
		
	}

	// Method
	buildHTML() {
		return `
			<ion-header>
				<ion-toolbar>
					<ion-buttons slot="start">
						<ion-back-button default-href="/"></ion-back-button>
					</ion-buttons>
					<ion-title>Dev</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<h2>Welcome to the new page!</h2>

				<ion-list>
					<ion-item>
						<ion-input id="input-password" label="Password" type="password"></ion-input>
					</ion-item>
					<ion-item id="btn-login" button detail>Đăng nhập</ion-item>
					<ion-item id="btn-notify-subscribe" button detail>Đăng ký thông báo</ion-item>
				</ion-list>

				<ion-icon name="heart"></ion-icon>
				<ion-icon name="logo-ionic"></ion-icon>

				<ion-button id="scroll-btn">Scroll to Bottom</ion-button>
				<ion-button id="btnGetLoc">Get Location</ion-button>
				<ion-button id="btnNotifySubscribe">Notify Subscribe</ion-button>

				<!-- Add lots of content to make scrolling possible -->
				<ion-list>
					<ion-item button>
						<ion-label>Pokémon Yellow</ion-label>
					</ion-item>
					<ion-item button>
						<ion-label>Mega Man X</ion-label>
					</ion-item>
					<ion-item button>
						<ion-label>The Legend of Zelda</ion-label>
					</ion-item>
					<ion-item button>
						<ion-label>Pac-Man</ion-label>
					</ion-item>
					<ion-item button>
						<ion-label>Super Mario World</ion-label>
					</ion-item>
				</ion-list>
			</ion-content>
		`;
	}
	async initUI() {

		// Wait for ion-content to be ready
		await customElements.whenDefined('ion-content');

		this.e_inPassword = this.querySelector('#input-password');

		this.e_btnLogin = this.querySelector('#btn-login');
		this.e_btnLogin.addEventListener('click', async (elm) => {
			let password = this.e_inPassword.value; // Lấy password
			let token = await apiService.login(password); // Call API - Login
			pwaService.setLocalStorage('token', token); // Lưu lại
			this.h_debug && console.log('[DevPage.initUI.btnLogin.click]', { token });
		});

		this.e_btnNotifySubscribe = this.querySelector('#btn-notify-subscribe');
		this.e_btnNotifySubscribe.addEventListener('click', async (elm) => {
			let vapIdPublicKey = await apiService.config('VAPID_PUBLIC_KEY'); // Call API - get config VAPID_PUBLIC_KEY
			let subscription = await pwaService.notificationSubscribe(vapIdPublicKey); // Đăng ký notify subscription
			let res = await apiService.notifySubscribe(subscription);
			this.h_debug && console.log('[DevPage.initUI.btnNotifySubscribe.click]', { vapIdPublicKey, subscription, res });
		});

		// Generate items
		const itemList = this.querySelector('#item-list');
		if (itemList) {
			for (let i = 1; i <= 50; i++) {
				const item = document.createElement('ion-item');
				const label = document.createElement('ion-label');
				label.textContent = `Item ${i}`;
				item.appendChild(label);
				itemList.appendChild(item);
			}
		}

		// Add scroll functionality
		const content = this.querySelector('ion-content');
		if (content) {

			const scrollBtn = this.querySelector('#scroll-btn');
			if (scrollBtn) {
				scrollBtn.addEventListener('click', () => {
					content.scrollToBottom(300);
				});
			}

			const btnGetLoc = this.querySelector('#btnGetLoc');
			if (btnGetLoc) {
				btnGetLoc.addEventListener('click', async () => {
					let position = await pwaService.geolocationGet();
					let lat = position.coords?.latitude;
					let lng = position.coords?.longitude || 0;
					console.log('getLoc', { lat, lng });
				});
			}

			const btnNotifySubscribe = this.querySelector('#btnNotifySubscribe');
			if (btnNotifySubscribe) {
				btnNotifySubscribe.addEventListener('click', async () => {

					let vapIdPublicKey = '';

					let subscription = await pwaService.notificationSubscribe(vapIdPublicKey);

				});
			}
		}
	}
	handleItemAction(action, element) {
		switch(action) {
			case 'login':
				console.log('Save item:');
				break;
		}
	}
}
customElements.define('dev-page', DevPage);