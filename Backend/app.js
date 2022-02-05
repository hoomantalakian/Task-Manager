const express = require("express");
const mongoose = require("mongoose");
const corsErrorHandler = require("./utility/corsErrorHandler");
//
const usersRoutes = require("./routes/users-routes");
const tasksRoutes = require("./routes/tasks-routes");
//-------------------------------------------
const app = express(); 
app.use(express.json());
app.use(corsErrorHandler);
// Routes
app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);

// database connection
mongoose
	.connect(
		"mongodb+srv://hoomtal:mongol@mycluster.acedq.mongodb.net/task-manager?retryWrites=true&w=majority"
	)
	.then(() => {
		console.log("Database is Connected");
	}) 
	.catch((err) => {
		console.log("Database connection Failed:", err);
	});
// port connection
app.listen(5000, () => {
	console.log("Listening on port 5000");
});
