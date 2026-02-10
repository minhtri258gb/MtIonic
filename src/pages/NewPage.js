class NewPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/"></ion-back-button>
          </ion-buttons>
          <ion-title>New</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <h2>Welcome to the new page!</h2>

        <ion-icon name="heart"></ion-icon>
        <ion-icon name="logo-ionic"></ion-icon>

        <ion-button id="scroll-btn">Scroll to Bottom</ion-button>

        <!-- Add lots of content to make scrolling possible -->
        <div id="item-list"></div>
      </ion-content>
    `;

    // Generate items and add scroll functionality after the element is connected
    this.setupScrolling();
  }

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
      const content = this.querySelector('ion-content');

      if (scrollBtn && content) {
        scrollBtn.addEventListener('click', () => {
          content.scrollToBottom(300);
        });
      }
    });
  }
}

customElements.define('new-page', NewPage);