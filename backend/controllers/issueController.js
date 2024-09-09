import Issue from "../models/IssueModel.js";
import { isValidObjectId, handleRequestError } from "../helpers/helper.js";

// Controller functions
const getAllIssues = async (req, res) => {
	try {
		const issuesAll = await Issue.find({}).sort({ createdAt: -1 });
		res.json({ success: true, data: issuesAll });
	} catch (error) {
		handleRequestError(res, error);
	}
};

const getSingleIssue = async (req, res) => {
	const { id } = req.params;

	if (!isValidObjectId(id)) {
		return res.status(400).json({ success: false, error: "Invalid issue ID format" });
	}

	try {
		const issueSingle = await Issue.findById(id);

		if (!issueSingle) {
			return res.status(404).json({ success: false, error: "Issue not found" });
		}

		res.status(200).json({ success: true, data: issueSingle });
	} catch (error) {
		handleRequestError(res, error);
	}
};

const addNewIssue = async (req, res) => {
	try {
		const newIssue = await Issue.create(req.body);
		res.status(201).json({ success: true, data: newIssue });
	} catch (error) {
		handleRequestError(res, error, 400);
	}
};

const deleteIssue = async (req, res) => {
	const { id } = req.params;

	if (!isValidObjectId(id)) {
		return res.status(400).json({ success: false, error: "Invalid issue ID format" });
	}

	try {
		const issueToDelete = await Issue.findByIdAndDelete(id);

		if (!issueToDelete) {
			return res.status(404).json({ success: false, error: "Issue not found" });
		}

		return res.status(200).json({ success: true, data: issueToDelete });
	} catch (error) {
		handleRequestError(res, error);
	}
};

const updateIssue = async (req, res) => {
	const { id } = req.params;

	if (!isValidObjectId(id)) {
		return res.status(400).json({ success: false, error: "Invalid issue ID format" });
	}

	try {
		const updatedIssue = await Issue.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

		if (!updatedIssue) {
			return res.status(404).json({ success: false, error: "Issue not found" });
		}

		return res.status(200).json({ success: true, data: updatedIssue });
	} catch (error) {
		handleRequestError(res, error, 400);
	}
};

export { getAllIssues, getSingleIssue, addNewIssue, deleteIssue, updateIssue };
