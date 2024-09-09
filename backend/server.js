import dotenv from "dotenv";
import express from "express";
import issueRoutes from "./routes/issues.js";
import mongoose from "mongoose";

const app = express();

dotenv.config(); // Load environment variables from .env file

// Middleware
app.use(express.json());
app.use((req, res, next) => {
	next();
});

// Root route
// app.get("/", (req, res) => {
// 	res.json({ message: "Welcome to the APIs" });
// });
app.get("/", issueRoutes);

// Routes
app.use("/issues", issueRoutes);

//Database connection
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("Dabase Connected");
		app.listen(PORT, () => {
			console.log("Listening on port", PORT);
		});
	})
	.catch((err) => {
		console.log(err);
	});

// Listen for requests
