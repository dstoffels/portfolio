'use client';

const BotTextArea = () => {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			const form = document.getElementById('bot-form') as HTMLFormElement;
			form?.requestSubmit();
		}
	};

	return (
		<textarea
			rows={1}
			name="content"
			onChange={(e) => autoExpand(e.target)}
			onKeyDown={handleKeyDown}
			className="block w-full rounded-md border-0 py-1.5 px-5 text-white-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-black"
		/>
	);
};

export default BotTextArea;
function autoExpand(textarea: HTMLTextAreaElement) {
	textarea.style.height = 'auto';
	textarea.style.height = textarea.scrollHeight + 'px';
}
