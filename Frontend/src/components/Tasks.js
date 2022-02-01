import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
//
import Task from "./Task";
//

function Tasks(props) {
	const [tasksData, setTasksData] = useState([]);
	const [toggle, setToggle] = useState(false);

	function toggleHandler(params) {
		setToggle((prev) => !prev);
	}

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/tasks")
			.then((res) => {
				setTasksData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [toggle]);

	console.log(tasksData);

	return (
		<Box sx={{ mt: 2 }}>
			{tasksData.map((task) => {
				return (
					<Task
						toggleHandler={toggleHandler}
						key={task._id}
						title={task.title}
						description={task.description}
					/>
				);
			})}
		</Box>
	);
}

export default Tasks;
