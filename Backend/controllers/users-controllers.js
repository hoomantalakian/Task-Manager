const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//
const User = require("../models/user-model");
//----------------------------------------
const router = express.Router();
//
async function signUp(req, res) {
	const { username, password } = req.body;
	let creatingUser;
	try {
		creatingUser = await User.findOne({ username: username });
	} catch (err) {
		res.json("Something went wrong: ", err);
	}

	if (creatingUser) {
		res.status(409).send(
			`This Username "${creatingUser.username}" exist, Login or choose another Username!`
		);
		return;
	}
	//
	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (err) {
		res.json("Something went wrong: ", err);
	}

	const createdUser = new User({
		username,
		password: hashedPassword,
		// insert some dummy data (in task) for user demo
		tasks: [],
	});

	let result;
	try {
		result = await createdUser.save();
	} catch (err) {
		res.json("Something went wrong: ", err);
	}

	let token;
	try {
		token = jwt.sign({ userId: createdUser.id }, "seCreT-KeY-12");
	} catch (err) {
		res.json("Something went wrong: ", err);
	}

	res.status(200).json({
		username: createdUser.username,
		userId: createdUser.id,
		token: token,
	});
}
//
async function login(req, res) {
	const { username, password } = req.body;
	let existingUser;
	try {
		existingUser = await User.findOne({ username: username });
	} catch (err) {
		res.json("Something went wrong: ", err);
	}

	let isPasswordValid = await bcrypt.compare(password, existingUser.password);

	if (!existingUser || !isPasswordValid) {
		res.status(401).send(`Username or Password is wrong! try again`);
		return;
	}

	let token;
	try {
		token = jwt.sign({ userId: existingUser.id }, "seCreT-KeY-12");
	} catch (err) {
		res.json("Something went wrong: ", err);
	}

	res.status(200).send({
		username: existingUser.username,
		userId: existingUser.id,
		token: token,
	});
}
//
async function readAllUsers(req, res) {
	let users;
	try {
		users = await User.find({}, "username -_id");
	} catch (err) {
		res.json("Something went wrong: ", err);
	}

	res.status(200).json(users);
}
//
exports.signUp = signUp;
exports.login = login;
exports.readAllUsers = readAllUsers;
