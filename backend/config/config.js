import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); // Load environment variables from .env file

//Database connection
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;

export const connectToDB = async (app) => {
	try {
		const connect = await mongoose.connect(MONGO_URI);
		app.listen(PORT);
		console.log(`Database Connected: ${connect.connection.host}`);
		console.log("Listening on port", PORT);
	} catch (error) {
		console.error(`Error ${error.message}`);
		process.exit(1); //process code 1 means exit with failure, 0 means sucess
	}
};
