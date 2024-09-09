import express from "express";
import issueRoutes from "./routes/issues.js";
import { connectToDB } from "./config/config.js";

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
	next();
});

app.get("/", issueRoutes);

// Routes
app.use("/issues", issueRoutes);

connectToDB(app);
