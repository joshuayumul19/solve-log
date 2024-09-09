import express from "express";
import issueRoutes from "./routes/issues.js";
import { connectToDB } from "./config/config.js";

const app = express();

// Middleware
app.use(express.json());

// Root route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to the API" });
});

// Routes
app.use("/issues", issueRoutes);

connectToDB(app);
