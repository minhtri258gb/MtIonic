import configService from './config.service';

class APIService {

	// Method
	constructor() {
		this.h_debug = true;
		this.m_token = null;
	}

	// Authen
	isLogin() {
		return this.m_token != null;
	}
	async login(password) {
		try {
			const response = await fetch(configService.h_host + '/authorize', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ password })
			});
			const resultAuth = await response.json();
			if (resultAuth.result == true) {
				this.m_token = resultAuth.token;
				return resultAuth.token;
			}
			else
				throw new Error('Lỗi đăng nhập');
		}
		catch (ex) {
			this.h_debug && console.error('[api.login]', ex);
			throw ex;
		}
	}
	async config(key) {
		let response = await fetch(configService.h_host + `/common/getConfig?key=${key}`, { method: 'GET' });
		if (!response.ok)
			throw new Error(await response.text());
		return await response.text();
	}
	async notifySubscribe(subscription) {
		try {
			const response = await fetch(configService.h_host + '/notify/subscribe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.m_token,
				},
				body: JSON.stringify(subscription)
			});
			return await response.json();
		}
		catch (ex) {
			this.h_debug && console.error('[api.notifySubscribe]', ex);
			throw ex;
		}
	}

};
const apiService = new APIService();
export default apiService;