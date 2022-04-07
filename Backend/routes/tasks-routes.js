const express = require("express");
//
const {
	createTask,
	readOneTask,
	readAllTasks,
	updateTask,
	deleteTask,
} = require("../controllers/tasks-controllers");
// const authCheck = require("../middleware/auth-ckeck");
//----------------------------------------

const router = express.Router();

// router.use(authCheck);

router.get("/", readAllTasks);
router.get("/:tid", readOneTask);
router.post("/", createTask);
router.patch("/:tid", updateTask);
router.delete("/:tid", deleteTask);

module.exports = router;
