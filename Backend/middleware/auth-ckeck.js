const jwt = require("jsonwebtoken");
// -----------------------------

function authCkeck(req, res, next) {
	if (req.method === "OPTIONS") {
		return next();
	}
	try {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			throw new Error("Authentication failed! (authCkeck.js)");
		}
		const decodedToken = jwt.verify(token, "seCreT-KeY-12");
		req.userData = {
			username: decodedToken.username,
			userId: decodedToken.userId,
		};
		// clg
		console.log("auth check done!");
		next();
	} catch (err) {
		res.status(401).send(err);
	}
}

module.exports = authCkeck;
