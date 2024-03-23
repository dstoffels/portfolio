import TextTicker from '@/components/TextTicker';

export default function Page({ searchParams }: HomePageProps) {
	return <div>{/* <TextTicker text={searchParams.thread_id} /> */}</div>;
}

export type HomePageProps = {
	searchParams: { thread_id: string };
};
