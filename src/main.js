
// Load Ionic
(async () => {
  // Set the path to a variable to
  // prevent Vite from analyzing in dev
  const ionicPath = '/ionic.esm.js';
  await import(/* @vite-ignore */ ionicPath);
})();

import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);

// Core CSS required for Ionic components to work properly
import '@ionic/core/css/core.css';

// Basic CSS for apps built with Ionic
import '@ionic/core/css/normalize.css';
import '@ionic/core/css/structure.css';
import '@ionic/core/css/typography.css';

// Optional CSS utils that can be commented out
import '@ionic/core/css/padding.css';
import '@ionic/core/css/float-elements.css';
import '@ionic/core/css/text-alignment.css';
import '@ionic/core/css/text-transformation.css';
import '@ionic/core/css/flex-utils.css';
import '@ionic/core/css/display.css';

// Icon imports
import { addIcons } from 'ionicons';
import { heart, logoIonic } from 'ionicons/icons';
addIcons({ heart, logoIonic });

// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
// 	<div>
// 		<a href="https://vite.dev" target="_blank">
// 			<img src="${viteLogo}" class="logo" alt="Vite logo" />
// 		</a>
// 		<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
// 			<img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
// 		</a>
// 		<h1>Hello Vite!</h1>
// 		<div class="card">
// 			<button id="counter" type="button"></button>
// 		</div>
// 		<p class="read-the-docs">
// 			Click on the Vite logo to learn more
// 		</p>
// 	</div>
// `

// setupCounter(document.querySelector('#counter'))

// Đăng ký Service Worker
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js');
//   });
// }