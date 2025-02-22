'use server';

import ngrok from '@ngrok/ngrok';

export default async function startNgrok() {
	const listener = await ngrok.forward({
		addr: process.env.NEXT_PUBLIC_SITE_URL,
		authtoken_from_env: true,
	});
	return listener;
}
