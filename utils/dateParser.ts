export function getMonth(dateString: string) {
	const date = new Date(dateString);
	const shortNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	const longNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const i = date.getMonth();
	const monthNum = i + 1;
	const numeric = monthNum < 10 ? '0' + monthNum : monthNum;

	return { numeric, short: shortNames[i], long: longNames[i] };
}

export function getYear(dateString: string) {
	const date = new Date(dateString);

	return date.getFullYear();
}
