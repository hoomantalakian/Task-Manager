const express = require("express");
const mongoose = require("mongoose");
//
const Task = require("../models/task-model");
const User = require("../models/user-model");
//----------------------------------------
const router = express.Router();
async function readAllTasks(req, res) {
	const tasks = await Task.find();
	res.json(tasks);
}
//
async function readOneTask(req, res) {
	const taskID = req.params.tid;
	const task = await Task.findById(taskID);
	res.json(task);
}
//
async function createTask(req, res) {
	const { title, description, creator } = req.body;
	const createdTask = new Task({
		title,
		description,
		creator,
	});

	const user = await User.findById(creator);

	sess = await mongoose.startSession();
	sess.startTransaction();
	await createdTask.save({ session: sess });
	user.tasks.push(createdTask);
	await user.save({ session: sess });
	await sess.commitTransaction();

	res.json(createdTask);
}
//
async function updateTask(req, res) {
	const { title, description } = req.body;
	const taskID = req.params.tid;
	const task = await Task.findById(taskID);

	task.title = title;
	task.description = description;

	await task.save();
	res.json(task);
}
//
async function deleteTask(req, res) {
	const taskID = req.params.tid;
	const task = await Task.findById(taskID).populate("creator");

	const sess = await mongoose.startSession();
	sess.startTransaction();
	await task.delete({ session: sess });
	task.creator.tasks.pull(task);
	await task.creator.save({ session: sess });
	await sess.commitTransaction();

	res.status(200).json("task deleted!");
}
//
exports.readAllTasks = readAllTasks;
exports.readOneTask = readOneTask;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
