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

router.use(authCheck);

router.post("/signup", signUp);
router.post("/login", login);
router.get("/", readAllUsers);

module.exports = router;
