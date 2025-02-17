'use client';

import Button from '@/components/Button';
import * as React from 'react';
import { logoutAdmin } from '../actions';

export type LogoutBtnProps = {
	isAdmin: boolean;
};

const LogoutBtn: React.FC<LogoutBtnProps> = ({ isAdmin }) => {
	return (
		isAdmin && (
			<Button onClick={async () => await logoutAdmin()} className="fixed top-2 right-2">
				LOGOUT
			</Button>
		)
	);
};

export default LogoutBtn;
