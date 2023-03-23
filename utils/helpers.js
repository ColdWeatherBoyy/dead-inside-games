module.exports = {
	// helper to format date
	format_datetime: (date) => {
		const dateObj = new Date(date);
		const dateDay = dateObj.getUTCDate().toString();
		const dateMonth = (dateObj.getMonth() + 1).toString().padStart(2, "0");
		const dateYear = dateObj.getUTCFullYear().toString().slice(2);
		const dateHours = dateObj.getHours().toString().padStart(2, "0");
		const dateMinutes = dateObj.getMinutes().toString().padStart(2, "0");
		const amOrPm = dateObj.toLocaleTimeString("en-us").split(" ")[1];

		return `${dateHours}:${dateMinutes} ${amOrPm} on ${dateMonth}/${dateDay}/${dateYear}`;
	},
};
