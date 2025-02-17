'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from './Button';

export type BtnFormProps = React.PropsWithChildren & {
	btnText: string;
	className?: string;
	submitBtnText?: string;
	onSubmit?: () => void;
	onOpen?: () => void;
	onClose?: () => void;
};

const BtnForm: React.FC<BtnFormProps> = ({
	btnText,
	className,
	submitBtnText,
	onSubmit,
	onOpen,
	onClose,
	children,
}) => {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(!open);
		onOpen && onOpen();
	};

	const handleClose = () => {
		onClose && onClose();
		setOpen(false);
	};
	const handleSubmit = () => {
		onSubmit && onSubmit();
		handleClose();
	};

	return open ? (
		<form className={className} onSubmit={handleSubmit}>
			{children}
			<div className="flex justify-end space-x-3">
				<Button type="submit">{submitBtnText || 'Submit'}</Button>
				<Button color="red" onClick={handleClose}>
					Cancel
				</Button>
			</div>
		</form>
	) : (
		<Button onClick={handleOpen}>{btnText}</Button>
	);
};

export default BtnForm;
