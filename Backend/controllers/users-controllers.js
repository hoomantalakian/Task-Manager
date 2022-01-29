const express = require("express");
//
const User = require("../models/user-model");
//----------------------------------------
const router = express.Router();
//
async function signUp(req, res) {
	const { username, password } = req.body;
	const creatingUser = await User.findOne({ username: username });
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
	const result = await createdUser.save();
	res.json(result);
}
//
async function login(req, res) {
	const { username, password } = req.body;
	const existingUser = await User.findOne({ username: username });
	if (!existingUser || existingUser.password != password) {
		res.status(401).send(`Username or Password is wrong! try again`);
		return;
	}
	res.send("you are logged in!");
}
//
async function readAllUsers(req, res) {
	const users = await User.find({}, "username -_id");
	res.json(users);
}
//
exports.signUp = signUp;
exports.login = login;
exports.readAllUsers = readAllUsers;