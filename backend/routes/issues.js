import express from "express";
import { getAllIssues, getSingleIssue, addNewIssue, deleteIssue, updateIssue } from "../controllers/issueController.js";

const issueRoutes = express.Router();

// Routes
issueRoutes.get("/", getAllIssues);
issueRoutes.get("/:id", getSingleIssue);
issueRoutes.post("/", addNewIssue);
issueRoutes.delete("/:id", deleteIssue);
issueRoutes.patch("/:id", updateIssue);

export default issueRoutes;
