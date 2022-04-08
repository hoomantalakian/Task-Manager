const express = require("express");
//
//----------------------------
const {
	login,
	signUp,
	readAllUsers,
} = require("../controllers/users-controllers");
const authCheck = require("../middleware/auth-ckeck");
//----------------------------------------

const router = express.Router();

router.post("/signup", signUp);

// router.use(authCheck);

router.post("/login", login);
router.get("/", readAllUsers);

module.exports = router;
