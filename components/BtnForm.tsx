'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from './Button';
import { FiTrash } from 'react-icons/fi';

export type BtnFormProps = React.PropsWithChildren & {
	btnText: string;
	className?: string;
	submitBtnText?: string;
	onSubmit?: () => void;
	onOpen?: () => void;
	onClose?: () => void;
	canDelete?: boolean;
	onDelete?: () => void;
};

const BtnForm: React.FC<BtnFormProps> = ({
	btnText,
	className,
	submitBtnText,
	onSubmit,
	onOpen,
	onClose,
	canDelete,
	onDelete,
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
		<div className={className}>
			{children}
			<div className="flex justify-end space-x-3">
				{canDelete && (
					<Button color="red" onClick={onDelete}>
						<FiTrash />
					</Button>
				)}
				<Button type="button" onClick={handleSubmit}>
					{submitBtnText || 'Submit'}
				</Button>
				<Button color="purple" onClick={handleClose}>
					Cancel
				</Button>
			</div>
		</div>
	) : (
		<Button onClick={handleOpen}>{btnText}</Button>
	);
};

export default BtnForm;
