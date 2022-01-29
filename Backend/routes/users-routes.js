const express = require("express");
//
const {
	login,
	signUp,
	readAllUsers,
} = require("../controllers/users-controllers");
//----------------------------------------
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/", readAllUsers);

module.exports = router;
