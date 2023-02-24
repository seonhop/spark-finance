export const formattedDate = (dateString: string) => {
	const dateObj = new Date(dateString);
	const year = dateObj.getFullYear();
	const month = dateObj.getMonth() + 1;
	const date = dateObj?.getDate();
	const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
		date < 10 ? "0" + date : date
	}`;
	return formattedDate;
};
