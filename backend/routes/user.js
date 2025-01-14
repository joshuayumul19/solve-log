import express from "express";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

// Register a new user
userRouter.post("/register", async (req, res) => {
	const { email, password } = req.body;
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400).json({ message: "Email already in use" });
		return;
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	const newUser = new User({ email, password: hashedPassword });

	try {
		await newUser.save();
		res.status(201).json({
			message: "User registered successfully",
			user: newUser,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Login user
userRouter.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return res.status(401).json({ message: "Invalid credentials" });
	}

	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
	res.json({ user: { id: user._id, email: user.email }, token });
});

export default userRouter;
