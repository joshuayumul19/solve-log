import express from "express";
import cors from "cors";
import path from "path";
import issueRoutes from "./routes/issues.js";
import { connectToDB } from "./config/config.js";

const app = express();

app.use(cors());
app.use(express.json());

const __dirname = path.resolve();

// API routes
app.use("/api/issues", issueRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	// Serve index.html for all non-API routes
	app.get("*", (req, res) => {
		if (!req.path.startsWith("/api")) {
			res.sendFile(
				path.resolve(__dirname, "frontend", "dist", "index.html")
			);
		} else {
			res.status(404).json({ error: "API route not found" });
		}
	});
}

app.use((req, res, next) => {
	console.log(`Received request: ${req.method} ${req.url}`);
	next();
});

connectToDB(app);
