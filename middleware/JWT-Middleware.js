const jwt = require('jsonwebtoken');

const JWTMiddleware = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(token, process.env.API_KEY);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ message: "No esta autorizado." });
	}
}
module.exports = JWTMiddleware;
