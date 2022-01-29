const mongoose = require("mongoose");

const Task = mongoose.model(
	"Task",
	new mongoose.Schema({
		title: { type: String, required: true },
		description: { type: String, required: true },
		creator: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
	})
);

module.exports = Task;
