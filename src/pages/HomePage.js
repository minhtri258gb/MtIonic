class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <ion-header>
        <ion-toolbar>
          <ion-title>Blank</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <div id="container">
          <ion-router-link href="/new">
            <ion-button>Navigate</ion-button>
          </ion-router-link>
          <ion-router-link href="/map">
            <ion-button>Map</ion-button>
          </ion-router-link>
          <ion-router-link href="/dev">
            <ion-button>Dev</ion-button>
          </ion-router-link>
          <strong>Ready to create an app?</strong>
          <p>
            Start with Ionic
            <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a>
          </p>
        </div>
      </ion-content>
    `;
  }
}

customElements.define('home-page', HomePage);