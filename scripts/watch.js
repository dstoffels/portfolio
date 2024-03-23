const chokidar = require('chokidar');
const fs = require('fs');

chokidar.watch('data/cv.yaml').on('change', incCVVersion);

function incCVVersion() {
	const jsonFilePath = './scripts/cv-version.json';

	fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
		if (err) {
			console.error('Error reading JSON file: ', err);
			return;
		}

		const jsonObj = JSON.parse(data);

		jsonObj.version += 1;

		const jsonString = JSON.stringify(jsonObj, null, 2);

		fs.writeFile(jsonFilePath, jsonString, 'utf8', (err) => {
			if (err) {
				console.error('Error reading JSON file: ', err);
				return;
			}

			console.log('CV version updated');
		});
	});
}
