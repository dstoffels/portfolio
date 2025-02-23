import { cookies } from 'next/headers';

export const auth = async () => {
	'use server';

	const cookieStore = cookies();
	const adminToken = cookieStore.get('admin')?.value;
	const isAdmin = adminToken === process.env.ADMIN_TOKEN;
	return { adminToken, isAdmin };
};
