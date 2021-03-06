const express = require("express");
const mongoose = require("mongoose");
//
const Task = require("../models/task-model");
const User = require("../models/user-model");
//----------------------------------------
const router = express.Router();
//
async function readAllTasks(req, res) {
	try {
		const tasks = await Task.find({ creator: req.params.uid });
		res.send(tasks);
	} catch (err) {
		res.send("Something went wrong (readAllTasks): ", err);
	}
}
//
async function readOneTask(req, res) { 
	const taskID = req.params.tid;
	let task;
	try {
		task = await Task.findById(taskID);
	} catch (err) {
		res.send("Something went wrong (readOneTask): ", err);
	}
	res.status(200).json(task);
}
//
async function createTask(req, res) {
	const { title, description, creator } = req.body;
	const createdTask = new Task({
		title,
		description,
		creator,
	});

	let user;
	try {
		user = await User.findById(creator);
	} catch (err) {
		res.send("Something went wrong (find user): ", err);
	}

	try {
		sess = await mongoose.startSession();
		sess.startTransaction();
		await createdTask.save({ session: sess });
		user.tasks.push(createdTask);
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		res.send("Something went wrong (createTask session): ", err);
	}

	res.status(200).json(createdTask);
}
//
async function updateTask(req, res) {
	const { title, description } = req.body;
	const taskID = req.params.tid;
	let task;
	try {
		task = await Task.findById(taskID);
	} catch (err) {
		res.send("Something went wrong (find task): ", err);
	}

	task.title = title;
	task.description = description;
	try {
		await task.save();
	} catch (err) {
		res.send("Something went wrong (save task): ", err);
	}
	res.status(200).json(task);
}
//
async function deleteTask(req, res) {
	const taskID = req.params.tid;
	let task;
	try {
		task = await Task.findById(taskID).populate("creator");
	} catch (err) {
		res.send("Something went wrong (find task2): ", err);
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await task.delete({ session: sess });
		task.creator.tasks.pull(task);
		await task.creator.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		res.send("Something went wrong (deleteTask session): ", err);
	}

	res.status(200).json("task deleted!");
}
//
exports.readAllTasks = readAllTasks;
exports.readOneTask = readOneTask;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
