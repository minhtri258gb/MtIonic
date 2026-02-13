import { pwaService } from '/src/services/index';

class DevPage extends HTMLElement {

	// Forward
	connectedCallback() {
		this.innerHTML = `
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

				<ion-icon name="heart"></ion-icon>
				<ion-icon name="logo-ionic"></ion-icon>

				<ion-button id="scroll-btn">Scroll to Bottom</ion-button>
				<ion-button id="btnGetLoc">Get Location</ion-button>

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

		// Generate items and add scroll functionality after the element is connected
		this.setupScrolling();
	}

	disconnectedCallback() {

	}

	attributeChangedCallback(name, oldValue, newValue) {
		
	}

	// Method
	setupScrolling() {
		// Wait for ion-content to be ready
		customElements.whenDefined('ion-content').then(() => {
			// Generate items
			const itemList = this.querySelector('#item-list');
			for (let i = 1; i <= 50; i++) {
				const item = document.createElement('ion-item');
				const label = document.createElement('ion-label');
				label.textContent = `Item ${i}`;
				item.appendChild(label);
				itemList.appendChild(item);
			}

			// Add scroll functionality
			const scrollBtn = this.querySelector('#scroll-btn');
			const btnGetLoc = this.querySelector('#btnGetLoc');
			const content = this.querySelector('ion-content');

			if (scrollBtn && content) {
				scrollBtn.addEventListener('click', () => {
					content.scrollToBottom(300);
				});
				btnGetLoc.addEventListener('click', async () => {
					let position = await pwaService.geolocationGet();
					let lat = position.coords?.latitude;
					let lng = position.coords?.longitude || 0;
					console.log('getLoc', { lat, lng });
				});
			}
		});
	}
}
customElements.define('dev-page', DevPage);