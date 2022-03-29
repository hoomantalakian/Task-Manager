const express = require("express");
//
const authCheck = require("../middleware/auth-ckeck");
//----------------------------
const {
	login,
	signUp,
	readAllUsers,
} = require("../controllers/users-controllers");
//----------------------------------------
const router = express.Router();

router.use(authCheck);

router.post("/signup", signUp);
router.post("/login", login);
router.get("/", readAllUsers);

module.exports = router;
