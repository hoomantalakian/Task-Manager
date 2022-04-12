const jwt = require("jsonwebtoken");
// -----------------------------

function authCkeck(req, res, next) {
	// if (req.method === "OPTIONS") {
	// 	return next();
	// }
	try {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			throw new Error("Authentication failed! (authCkeck !token)");
		}
		const decodedToken = jwt.verify(token, "process.env.JWT_private_key");
		req.userData = {
			username: decodedToken.username,
			userId: decodedToken.userId,
		};
		next();
	} catch (err) {
		res.status(401).send(err);
	}
}

module.exports = authCkeck;
