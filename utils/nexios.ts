import nexios, { Nexios, NexiosHeaders } from 'nexios';

export const api = new Nexios({
	baseURL: process.env.NEXT_PUBLIC_SITE_URL + '/api',
	timeout: 30000,
});

export const browserless = new Nexios({
	baseURL: 'https://chrome.browserless.io',
	responseType: 'arraybuffer',
	timeout: 10000,
	params: {
		token: process.env.BROWSERLESS_API_KEY as string,
	},
});

export { nexios };
