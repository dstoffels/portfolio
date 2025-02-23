import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import * as React from 'react';

export type AdminPageProps = {};

const AdminPage: React.FC<AdminPageProps> = async ({}) => {
	const handleLogin = async (formData: FormData) => {
		'use server';

		const password = formData.get('password');

		if (password === process.env.ADMIN_PW) {
			const cookieStore = cookies();

			cookieStore.set('admin', process.env.ADMIN_TOKEN as string, {
				maxAge: 60 * 60 * 24 * 365 * 100, // 100 year token
				path: '/',
			});

			redirect('/');
		}
	};

	return (
		<div className="flex h-screen justify-center items-center">
			<form className="flex flex-col space-y-3" action={handleLogin}>
				<input className="p-1" type="password" name="password" placeholder="Enter Password" />
				<button type="submit">Login Admin</button>
			</form>
		</div>
	);
};

export default AdminPage;
