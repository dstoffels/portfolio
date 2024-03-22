'use client';

// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

const DownloadBtn = ({ onClick }: DownloadBtnProps) => {
	// const generatePDF = async () => {
	// const element = document.getElementById('cv') as HTMLElement;
	// const originalTransform = element.style.transform;
	// element.style.transform = `scale(0.5813)`;
	// element.style.transformOrigin = 'top left';
	// let doc = new jsPDF('p', 'pt', 'a4');
	// doc.html(element, {
	// 	callback: (doc) => {
	// 		if (doc.internal.pages.length > 1) doc.deletePage(2)
	// 		doc.save('dan-stoffels-cv.pdf');
	// 		element.style.transform = originalTransform;
	// 	},
	// });
	// document.querySelectorAll('svg').forEach((svg) => (svg.style.transform = 'translateY(2px)'));
	// html2canvas(element, { scale: 2 }).then((canvas) => {
	// 	const data = canvas.toDataURL('image/png');
	// 	let doc = new jsPDF('p', 'pt', 'a4');
	// 	doc.addImage(data, 'PNG', 0, 0, 595, 0);
	// 	doc.save('dan-stoffels_cv.pdf');
	// });
	// };

	const handleClick = async (e: any) => {
		const cvElement = document.getElementById('cv') as HTMLElement;
		const clone = deepCloneWithStyles(cvElement);

		try {
			const response = await fetch('/api/generate-pdf', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(clone.outerHTML),
			});

			const blob = await response.blob();
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'dan-stoffels-cv.pdf';

			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex justify-center my-4">
			<button onClick={handleClick}>Download CV</button>
		</div>
	);
};

export default DownloadBtn;

export type DownloadBtnProps = {
	onClick: (cvElement: string) => Promise<void>;
};

function deepCloneWithStyles(originalElement: HTMLElement) {
	const clone = originalElement.cloneNode(true);

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
