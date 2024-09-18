export const toTitleCase = (string) =>
	string
		.replace(/[^a-zA-Z0-9\s]/g, " ") // Replace special characters with spaces
		.split(" ")
		.filter((word) => word.length > 0) // Remove empty words
		.map(
			(word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		)
		.join(" ");
