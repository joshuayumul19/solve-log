import mongoose from "mongoose";

const Schema = mongoose.Schema;

const issueSchema = new Schema(
	{
		ticket_number: {
			type: Number,
			required: true,
			unique: true,
			index: true,
		},
		issue: {
			type: String,
			required: true,
			text: true,
			lowercase: true, // Add this line
		},
		status: {
			type: String,
			required: true,
			index: true,
		},
		solution: {
			type: String,
			required: true,
		},
		reporter: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
			default: Date.now,
			index: true,
		},
	},
	{ timestamps: true }
);

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
