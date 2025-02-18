import Nexios from 'nexios';

export const nexios = new Nexios();

export const api = new Nexios({
	baseURL: process.env.NEXT_PUBLIC_SITE_URL + '/api',
	timeout: 30000,
});
