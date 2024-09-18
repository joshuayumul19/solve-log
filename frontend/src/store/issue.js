import { create } from "zustand";
import axios from "axios";

export const useIssueStore = create((set) => ({
	issues: [],
	setIssues: (issues) => set({ issues }),
	createIssue: async (newIssue) => {
		try {
			const response = await axios.post("/api/issues", newIssue);

			set((state) => ({
				issues: [response.data.data, ...state.issues].sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				),
			}));

			return { success: true, message: "New issue created successfully" };
		} catch (error) {
			console.error("Error creating issue:", error);
			return { success: false, message: "Failed to create issue" };
		}
	},
	fetchIssues: async () => {
		try {
			const response = await axios.get("/api/issues");
			//updating the ui immediately without refresh
			set({
				issues: response.data.data.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				),
			});
			return { success: true, message: "Issues fetched successfully" };
		} catch (error) {
			console.error("Error fetching issues:", error);
			return { success: false, message: "Error on fetching issues" };
		}
	},
	deleteIssue: async (issueID) => {
		try {
			await axios.delete(`/api/issues/${issueID}`);
			//updating the ui immediately without refresh
			set((state) => ({
				issues: state.issues.filter((issue) => issue._id !== issueID),
			}));
			return { success: true, message: "Issue deleted successfully" };
		} catch (error) {
			console.error("Error deleting issue:", error);
			return { success: false, message: "Failed to delete issue" };
		}
	},
	updateIssue: async (issueID, updatedIssue) => {
		try {
			const response = await axios.put(
				`/api/issues/${issueID}`,
				updatedIssue
			);
			//updating the ui immediately without refresh
			set((state) => ({
				issues: state.issues.map((issue) =>
					issue._id === issueID ? response.data.data : issue
				),
			}));
			return { success: true, message: "Issue updated successfully" };
		} catch (error) {
			console.error("Error updating issue:", error);
			return { success: false, message: "Failed to update issue" };
		}
	},
}));
