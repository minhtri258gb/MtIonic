import { Geolocation } from '@capacitor/geolocation';

class MapPage extends HTMLElement {

	// Forward
	connectedCallback() {

		// HTML
		this.innerHTML = `
			<ion-header>
				<ion-toolbar>
					<ion-buttons slot="start">
						<ion-back-button default-href="/"></ion-back-button>
					</ion-buttons>
					<ion-title>Map</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<h2>Welcome to the new page!</h2>

				<ion-button id="btnCheck">Check</ion-button>
				<br>
				<ion-button id="btnPermission">Permission</ion-button>
				<br>
				<ion-button id="btnGetLoc">Get Location</ion-button>

			</ion-content>
		`;

		// Callback
		customElements.whenDefined('ion-content').then(() => {

			// Add scroll functionality
			const btnCheck = this.querySelector('#btnCheck');
			const btnPermission = this.querySelector('#btnPermission');
			const btnGetLoc = this.querySelector('#btnGetLoc');
			const content = this.querySelector('ion-content');

			if (content) {
				btnCheck.addEventListener('click', async () => {
					let permissionStatus = await Geolocation.checkPermissions();
					console.log('permissiobtnChecknStatus', permissionStatus);
				});
				btnPermission.addEventListener('click', async () => {
					let permissionStatus = await Geolocation.requestPermissions();
					console.log('btnPermission', permissionStatus);
				});
				btnGetLoc.addEventListener('click', async () => {
					let position = await Geolocation.getCurrentPosition({
						enableHighAccuracy: true,
					});
					let lat = position.coords?.latitude;
					let lng = position.coords?.longitude || 0;
					console.log('getLoc', { lat, lng });
				});
			}
		});
	}

	onBtnCheck() {
		
	}
}
customElements.define('map-page', MapPage);