const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//
const usersRoutes = require("./routes/users-routes");
const tasksRoutes = require("./routes/tasks-routes");
//-------------------------------------------
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);

// database connection
mongoose 
	.connect(
		`mongodb+srv://${process.env.db_user}:${process.env.db_password}@mycluster.acedq.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`
	)
	.then(() => {
		console.log("Database is Connected");
	})
	.catch((err) => {
		console.log("Database connection Failed:", err);
	});
// port connection   
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Listening on port 5000");
});
