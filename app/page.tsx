import BotForm from '@/components/bot-form';
import { PropsWithChildren } from 'react';

export type PageProps = PropsWithChildren & {};

export default function Page({ children }: PageProps) {
	return children;
}
