const express = require("express");
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
	const createdUser = new User({
		username,
		password,
		// insert some dummy data (in task) for user demo
		tasks: [],
	});

	let result;
	try {
		result = await createdUser.save();
	} catch (err) {
		res.json("Something went wrong: ", err);
	}

	res.status(200).json("Welcome!");
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

	if (!existingUser || existingUser.password != password) {
		res.status(401).send(`Username or Password is wrong! try again`);
		return;
	}

	res.status(200).send("you are logged in!");
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
