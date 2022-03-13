const express = require("express");
//
const {
	createTask,
	readOneTask,
	readAllTasks,
	updateTask,
	deleteTask,
} = require("../controllers/tasks-controllers");
//----------------------------------------
const router = express.Router();

 

router.get("/", readAllTasks);
router.get("/:tid", readOneTask);
router.post("/", createTask);
router.patch("/:tid", updateTask);
router.delete("/:tid", deleteTask);

module.exports = router;
