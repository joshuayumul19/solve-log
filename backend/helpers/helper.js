import mongoose from "mongoose";

export const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const handleRequestError = (res, error, statusCode = 500) => {
	let errorMessage = "Server error";
	if (error.name === "ValidationError") {
		errorMessage = error.message;
		statusCode = 400;
	} else if (error.code === 11000) {
		errorMessage = "Duplicate Ticket Number";
		statusCode = 409;
	}
	return res.status(statusCode).json({ success: false, error: errorMessage });
};
