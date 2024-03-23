'use client';

const DownloadBtn = ({}: DownloadBtnProps) => {
	const handleClick = async (e: any) => {
		const cvElement = document.getElementById('cv') as HTMLElement;
		const clone = deepCloneWithStyles(cvElement);
		let response;
		try {
			response = await fetch('/api/generate-pdf', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(clone.outerHTML),
			});
		} catch (error) {
			console.error(error);
		}
		if (response) {
			const blob = await response.blob();
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'dan-stoffels-cv.pdf';

			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};

	return (
		<div className="flex justify-center my-4">
			<button onClick={handleClick}>Download CV</button>
		</div>
	);
};

export default DownloadBtn;

export type DownloadBtnProps = {};

function deepCloneWithStyles(originalElement: HTMLElement) {
	const clone = originalElement.cloneNode(true) as HTMLElement;

	const rules = extractCSSRules();

	const style = document.createElement('style');
	style.textContent = rules;

	clone.prepend(style);

	return clone as HTMLElement;
}

function extractCSSRules() {
	let cssRules = [];
	for (let sheet of document.styleSheets) {
		try {
			if (sheet.cssRules) {
				for (let rule of sheet.cssRules) {
					cssRules.push(rule.cssText);
				}
			}
		} catch (e) {
			console.warn('Could not read CSS rules from a stylesheet.', e);
		}
	}
	return cssRules.join('\n');
}
