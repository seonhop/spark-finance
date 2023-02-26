export const formattedPrice = (price: number) => {
	return price
		.toLocaleString("en-US", {
			minimumFractionDigits: 6,
		})
		.replace(/\.?0+$/, "");
};
