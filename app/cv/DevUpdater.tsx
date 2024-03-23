'use client';

import { useEffect, useState } from 'react';

const DevUpdater = ({}) => {
	const [cvVersion, setCvVersion] = useState(null);

	useEffect(() => {
		const interval = setInterval(async () => {
			const response = await fetch('/api/cv-version');
			const version = await response.json();

			if (cvVersion === null) setCvVersion(version);
			else if (version !== cvVersion) window.location.reload();
			else setCvVersion(version);
		}, 1000);

		return () => clearInterval(interval);
	}, [cvVersion]);

	useEffect(() => {
		generatePDF();
	}, []);

	return null;
};

export default DevUpdater;

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

async function generatePDF() {
	const cvElement = document.getElementById('cv') as HTMLElement;
	const clone = deepCloneWithStyles(cvElement);
	try {
		const response = await fetch('/api/generate-pdf', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(clone.outerHTML),
		});
	} catch (error) {
		console.error(error);
	}
}
