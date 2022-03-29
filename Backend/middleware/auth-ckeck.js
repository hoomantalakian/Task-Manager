const jwt = require("jsonwebtoken");
// -----------------------------

function authCkeck(req, res, next) {
	try {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			throw new Error("Authentication failed!");
		}
		const decodedToken = jwt.verify(token, "seCreT-KeY-12");
		req.userData = {
			username: decodedToken.username,
			userId: decodedToken.userId,
			// token: token,
		};
		next();
	} catch (err) {
		res.send("Something went wrong", err);
	}
}

module.exports = authCkeck;
